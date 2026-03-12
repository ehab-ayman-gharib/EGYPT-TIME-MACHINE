const { app, BrowserWindow, ipcMain, session } = require('electron');
const path = require('path');
const fs = require('fs');
const http = require('http');

let mainWindow = null;
let staticServerPort = null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            autoplayPolicy: 'no-user-gesture-required',
            webSecurity: false,
        },
        fullscreen: true,
        autoHideMenuBar: true,
    });

    // Bridge browser console to Node terminal
    mainWindow.webContents.on('console-message', (event, level, message, line, sourceId) => {
        const levels = ['DEBUG', 'INFO', 'WARNING', 'ERROR'];
        const levelStr = levels[level] || 'LOG';
        console.log(`[Browser-${levelStr}] ${message}`);
    });

    mainWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
        const allowedPermissions = ['media', 'mediaKeySystem', 'geolocation', 'notifications', 'fullscreen', 'clipboard-read', 'clipboard-sanitized-write'];
        const isAllowed = allowedPermissions.includes(permission);
        console.log('[Permission]', isAllowed ? 'Granted:' : 'Denied:', permission);
        callback(isAllowed);
    });

    mainWindow.webContents.session.setPermissionCheckHandler((webContents, permission) => {
        const allowedPermissions = ['media', 'mediaKeySystem', 'geolocation', 'notifications', 'fullscreen', 'clipboard-read', 'clipboard-sanitized-write'];
        return allowedPermissions.includes(permission);
    });

    const isDevEnv = !app.isPackaged;

    if (isDevEnv) {
        mainWindow.loadURL('http://localhost:3000');
        mainWindow.webContents.openDevTools();
    } else {
        // Serve dist via a local HTTP server instead of file://
        // CameraKit requires an HTTP origin (file:// breaks WASM loading & API calls)
        const distDir = path.join(__dirname, '../dist');

        const mimeTypes = {
            '.html': 'text/html',
            '.js': 'application/javascript',
            '.mjs': 'application/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml',
            '.ico': 'image/x-icon',
            '.woff': 'font/woff',
            '.woff2': 'font/woff2',
            '.ttf': 'font/ttf',
            '.wasm': 'application/wasm',
            '.mp4': 'video/mp4',
            '.webm': 'video/webm',
            '.mp3': 'audio/mpeg',
            '.wav': 'audio/wav',
            '.webp': 'image/webp',
        };

        const server = http.createServer((req, res) => {
            let filePath = path.join(distDir, req.url === '/' ? 'index.html' : req.url);
            // Remove query strings
            filePath = filePath.split('?')[0];

            const ext = path.extname(filePath).toLowerCase();
            const contentType = mimeTypes[ext] || 'application/octet-stream';

            fs.readFile(filePath, (err, data) => {
                if (err) {
                    // If file not found, serve index.html (SPA fallback)
                    fs.readFile(path.join(distDir, 'index.html'), (err2, fallbackData) => {
                        if (err2) {
                            res.writeHead(404);
                            res.end('Not Found');
                        } else {
                            res.writeHead(200, { 'Content-Type': 'text/html' });
                            res.end(fallbackData);
                        }
                    });
                } else {
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(data);
                }
            });
        });

        server.listen(0, '127.0.0.1', () => {
            staticServerPort = server.address().port;
            console.log(`[Electron] Local HTTP server running at http://127.0.0.1:${staticServerPort}`);
            mainWindow.loadURL(`http://127.0.0.1:${staticServerPort}/index.html`);
            mainWindow.webContents.openDevTools({ mode: 'detach' });
        });
    }

    mainWindow.webContents.on('did-finish-load', async () => {
        console.log('[Startup] Application loaded');
        try {
            const printers = await mainWindow.webContents.getPrintersAsync();
            console.log('[Startup] Available printers:', printers.length);
            printers.forEach((printer, index) => {
                console.log(`[Startup] Printer ${index + 1}:`, {
                    name: printer.name,
                    isDefault: printer.isDefault,
                    status: printer.status
                });
            });
        } catch (err) {
            console.error('[Startup] Failed to get printers:', err);
        }
    });
}

// Get printer configuration
function getPrinterConfig() {
    const configPath = app.isPackaged
        ? path.join(process.resourcesPath, 'printer-config.json')
        : path.join(__dirname, '../printer-config.json');

    try {
        if (fs.existsSync(configPath)) {
            const configData = fs.readFileSync(configPath, 'utf-8');
            const parsedConfig = JSON.parse(configData);

            // Resolve printer name based on platform
            // Supports { "win32": "...", "darwin": "..." } or legacy { "printerName": "..." }
            const platform = process.platform;
            let printerName = parsedConfig[platform];

            if (!printerName) {
                printerName = parsedConfig.printerName || "";
            }

            console.log(`[Printer] Config loaded for ${platform}:`, printerName);
            return { printerName };
        }
    } catch (err) {
        console.warn('[Printer] Failed to read config:', err.message);
    }

    return { printerName: "" };
}

// Helper function to find the best matching printer 
function findBestPrinter(configuredName, availablePrinters) {
    if (!configuredName) return "";

    const exactMatch = availablePrinters.find(p => p.name === configuredName);
    if (exactMatch) {
        console.log('[Printer] Found exact match:', exactMatch.name);
        return exactMatch.name;
    }

    const caseInsensitiveMatch = availablePrinters.find(
        p => p.name.toLowerCase() === configuredName.toLowerCase()
    );
    if (caseInsensitiveMatch) {
        console.log('[Printer] Found case-insensitive match:', caseInsensitiveMatch.name);
        return caseInsensitiveMatch.name;
    }

    const fuzzyMatches = availablePrinters.filter(
        p => p.name.toLowerCase().includes(configuredName.toLowerCase()) ||
            configuredName.toLowerCase().includes(p.name.toLowerCase())
    );
    if (fuzzyMatches.length > 0) {
        console.log('[Printer] Found fuzzy match:', fuzzyMatches[0].name);
        return fuzzyMatches[0].name;
    }

    // Try matching by stripping spaces, underscores, and dashes (macOS CUPS queue names often use underscores)
    const normalize = (name) => name.replace(/[\s_-]+/g, '').toLowerCase();
    const normalizedConfigured = normalize(configuredName);
    const normalizedMatch = availablePrinters.find(
        p => normalize(p.name).includes(normalizedConfigured) || normalizedConfigured.includes(normalize(p.name))
    );
    if (normalizedMatch) {
        console.log('[Printer] Found normalized match:', normalizedMatch.name);
        return normalizedMatch.name;
    }

    const photoMatch = availablePrinters.find(
        p => p.name.toLowerCase().includes('selphy') ||
            p.name.toLowerCase().includes('dnp') ||
            p.name.toLowerCase().includes('qw410')
    );
    if (photoMatch) {
        console.log('[Printer] Found likely photo printer:', photoMatch.name);
        return photoMatch.name;
    }

    return configuredName;
}

// Get list of printers
ipcMain.handle('get-printers', async () => {
    console.log('[Electron] get-printers IPC called');
    try {
        const win = BrowserWindow.getAllWindows()[0];
        if (!win) {
            console.error('[Electron] No window found for getting printers');
            return { printers: [], config: { printerName: "" } };
        }
        const printers = await win.webContents.getPrintersAsync();
        const config = getPrinterConfig();

        // Resolve exact printer name (especially useful for mapping config names to macOS CUPS queue names)
        const resolvedName = findBestPrinter(config.printerName, printers);
        if (resolvedName) {
            config.printerName = resolvedName;
        }

        const enhancedPrinters = printers.map(p => ({
            name: p.name,
            isDefault: p.isDefault,
            status: p.status
        }));

        console.log('[Electron] Available printers:', enhancedPrinters.map(p => p.name));
        return { printers: enhancedPrinters, config };
    } catch (error) {
        console.error('[Electron] Error getting printers:', error);
        return { printers: [], config: { printerName: "" } };
    }
});

// Handle Print Requests - Native Windows Print (bypassing HTML rendering)
ipcMain.handle('print-image', async (event, { imageSrc, printerName }) => {
    console.log('[Printer] Received print request');
    console.log('[Printer] Image data length:', imageSrc ? imageSrc.length : 0);
    console.log('[Printer] Target printer before resolution:', printerName);

    return new Promise(async (resolve) => {
        const os = require('os');
        const { exec } = require('child_process');
        let tempImagePath = null;
        
        let resolvedPrinterName = printerName;
        try {
            const win = BrowserWindow.getAllWindows()[0];
            if (win) {
                const availablePrinters = await win.webContents.getPrintersAsync();
                const matchedName = findBestPrinter(printerName, availablePrinters);
                if (matchedName) {
                    resolvedPrinterName = matchedName;
                    console.log('[Printer] Resolved target to physical queue:', resolvedPrinterName);
                }
            }
        } catch (e) {
            console.error('[Printer] Warning: could not dynamically resolve printer queue', e);
        }

        try {
            // 1. Save the image to a temporary file
            if (imageSrc.startsWith('data:')) {
                const match = imageSrc.match(/^data:image\/(\w+);base64,/);
                const ext = match ? match[1] : 'jpg'; // default to jpg 
                
                // In packaged Mac apps, we MUST write to the user data folder 
                // because /tmp is aggressively blocked by Gatekeeper/AppSandbox
                const userDataDir = app.getPath('userData');
                const printSpoolDir = path.join(userDataDir, 'print-spool');
                
                // Ensure spool dir exists
                if (!fs.existsSync(printSpoolDir)) {
                    fs.mkdirSync(printSpoolDir, { recursive: true });
                }
                
                tempImagePath = path.join(printSpoolDir, `photo-${Date.now()}.${ext === 'jpeg' ? 'jpg' : ext}`);

                const base64Data = imageSrc.replace(/^data:image\/\w+;base64,/, '');
                fs.writeFileSync(tempImagePath, Buffer.from(base64Data, 'base64'));
                
                console.log('[Printer] Saved image to:', tempImagePath);
            } else {
                console.error('[Printer] Image source is not a data URL');
                resolve({ success: false, failureReason: 'Invalid image format' });
                return;
            }

            let printCommand;

            if (process.platform === 'win32') {
                // Windows: Use a robust C#/.NET native print call via PowerShell
                // This guarantees 0 margins, exact scaling, and auto-rotates to fit the paper 
                // avoiding all the white border issues from mspaint
                const psScript = `
Add-Type -AssemblyName System.Drawing
$imgPath = "${tempImagePath}"
$printerName = "${resolvedPrinterName}"

$img = [System.Drawing.Image]::FromFile($imgPath)
$doc = New-Object System.Drawing.Printing.PrintDocument

if ($printerName -ne "") {
    $doc.PrinterSettings.PrinterName = $printerName
}

$doc.DefaultPageSettings.Margins = New-Object System.Drawing.Printing.Margins(0,0,0,0)
$doc.OriginAtMargins = $false

$doc.add_PrintPage({
    param($sender, $event)
    
    $paperW = $event.PageSettings.PaperSize.Width
    $paperH = $event.PageSettings.PaperSize.Height
    
    # Auto rotate image if paper orientation doesn't match image orientation
    $paperHoriz = $paperW -gt $paperH
    $imgHoriz = $img.Width -gt $img.Height
    
    if ($paperHoriz -ne $imgHoriz) {
        $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipNone)
    }

    # Draw exactly bounding the paper size with zero margins
    $rect = New-Object System.Drawing.Rectangle(0, 0, $paperW, $paperH)
    $event.Graphics.DrawImage($img, $rect)
})

$doc.Print()
$img.Dispose()
`;
                // Encode to UTF-16LE Base64 for powershell to execute invisibly without escaping path issues
                const encodedScript = Buffer.from(psScript, 'utf16le').toString('base64');
                printCommand = `powershell -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -EncodedCommand ${encodedScript}`;
            } else if (process.platform === 'darwin') {
                // macOS: Use execFile to avoid quoting/shell escaping issues with paths
                // This is much more robust for paths like "Application Support/egypt's-time-machine"
                const args = [];
                if (resolvedPrinterName) {
                    args.push('-d', resolvedPrinterName);
                }
                args.push('-o', 'fit-to-page');
                args.push('-o', 'PageSize=dnp4x6');
                args.push(tempImagePath);

                console.log('[Printer] Executing /usr/bin/lp with args:', args);

                const { execFile } = require('child_process');
                execFile('/usr/bin/lp', args, (error, stdout, stderr) => {
                    console.log('[Printer] Mac Print Command completed');
                    if (error) {
                        console.error('[Printer] Mac Print Error:', error);
                        console.error('[Printer] Mac stderr:', stderr);
                        
                        // Cleanup
                        try { if (tempImagePath && fs.existsSync(tempImagePath)) fs.unlinkSync(tempImagePath); } catch (e) { }
                        
                        resolve({ success: false, failureReason: error.message });
                    } else {
                        console.log('[Printer] Mac Print successful');
                        
                        // Cleanup after delay
                        setTimeout(() => {
                            try { if (tempImagePath && fs.existsSync(tempImagePath)) fs.unlinkSync(tempImagePath); } catch (e) { }
                        }, 10000);

                        resolve({ success: true });
                    }
                });
            } else {
                // Windows/Linux: Use standard exec for complex shell-based or PS commands
                console.log('[Printer] Executing Print command:', printCommand);

                exec(printCommand, (error, stdout, stderr) => {
                    console.log('[Printer] Native Print Command completed');

                    if (error) {
                        console.error('[Printer] Native Print Error:', error);
                        console.error('[Printer] Native stderr:', stderr);

                        // Cleanup
                        try { if (tempImagePath && fs.existsSync(tempImagePath)) fs.unlinkSync(tempImagePath); } catch (e) { }

                        resolve({ success: false, failureReason: error.message });
                    } else {
                        console.log('[Printer] Native Print successful');

                        // Cleanup after delay
                        setTimeout(() => {
                            try { if (tempImagePath && fs.existsSync(tempImagePath)) fs.unlinkSync(tempImagePath); } catch (e) { }
                        }, 10000);

                        resolve({ success: true });
                    }
                });
            }

        } catch (err) {
            console.error('[Printer] Exception in print handler:', err);

            // Cleanup
            try {
                if (tempImagePath && fs.existsSync(tempImagePath)) {
                    fs.unlinkSync(tempImagePath);
                }
            } catch (e) { }

            resolve({ success: false, failureReason: err.message });
        }
    });
});

app.whenReady().then(() => {
    // Rewrite request headers for Snap endpoints to pass CameraKit API Token validation
    const filter = { urls: ['https://*/*', 'http://*/*'] };
    const ALLOWED_ORIGIN = 'https://127.0.0.1'; // The Origin whitelisted in Snap AR Portal
    session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
        try {
            const reqUrl = details.url || '';
            const isSnapApi = /(snapar|snapchat|snapkit|sc-cdn|sc-prod)\.(com|net)/i.test(reqUrl);
            if (isSnapApi) {
                details.requestHeaders['Origin'] = ALLOWED_ORIGIN;
                details.requestHeaders['Referer'] = ALLOWED_ORIGIN + '/';
            }
        } catch {}
        callback({ requestHeaders: details.requestHeaders });
    });

    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
