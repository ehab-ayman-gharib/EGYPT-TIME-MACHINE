import * as tf from '@tensorflow/tfjs';

// Ensure TensorFlow is globally available for face-api.js
if (typeof window !== 'undefined') {
    (window as any).tf = tf;
}

let initialized = false;

export const initializeTensorFlow = async (): Promise<void> => {
    if (initialized) return;

    try {
        // Try WebGL backend first (GPU accelerated)
        await tf.setBackend('webgl');
        await tf.ready();
        console.log('✅ TensorFlow.js initialized with WebGL backend');
        initialized = true;
    } catch (e) {
        console.warn('⚠️ WebGL backend failed, falling back to CPU', e);
        try {
            await tf.setBackend('cpu');
            await tf.ready();
            console.log('✅ TensorFlow.js initialized with CPU backend');
            initialized = true;
        } catch (cpuErr) {
            console.error('❌ TensorFlow.js initialization failed completely', cpuErr);
            throw cpuErr;
        }
    }
};

export { tf };
