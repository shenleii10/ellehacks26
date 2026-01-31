import axios from 'axios';

const ELEVENLABS_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY;
const VOICE_ID = 'EXAVITQu4vr4xnSDxMaL'; // Rachel - a clear, friendly voice

/**
 * Converts text to speech using ElevenLabs API
 * @param text - The text to convert to speech
 * @returns Promise<Blob> - Audio data as a blob
 */
export async function textToSpeech(text: string): Promise<Blob> {
    if (!ELEVENLABS_API_KEY) {
        throw new Error('ElevenLabs API key is not configured');
    }

    try {
        const response = await axios.post(
            `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
            {
                text: text,
                model_id: 'eleven_monolingual_v1',
                voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.75,
                },
            },
            {
                headers: {
                    'Accept': 'audio/mpeg',
                    'xi-api-key': ELEVENLABS_API_KEY,
                    'Content-Type': 'application/json',
                },
                responseType: 'blob', // Important: get audio as blob
            }
        );

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(`Text-to-speech error: ${error.response?.data?.detail?.message || error.message}`);
        }
        throw error;
    }
}

/**
 * Helper function to generate speech for product information
 * @param product - Product data
 * @param isCompatible - Whether product is compatible with user diet
 * @param issues - Any dietary issues
 * @returns Formatted text for speech
 */
export function generateProductSpeech(
    product: any,
    isCompatible: boolean,
    issues: string[]
): string {
    let speech = `Product information for ${product.name} by ${product.brand}. `;

    // Compatibility status
    if (isCompatible) {
        speech += "Good news! This product is safe for your diet. ";
    } else {
        speech += `Warning! This product is not suitable for you. Issues: ${issues.join(', ')}. `;
    }

    // Nutrition score
    speech += `Nutrition score: ${product.nutritionScore}. `;

    // Warnings
    if (product.warnings && product.warnings.length > 0) {
        speech += "Safety alerts: ";
        product.warnings.forEach((warning: any) => {
            speech += `${warning.title}. ${warning.description}. `;
        });
    }

    // Main ingredients
    if (product.ingredients && product.ingredients.length > 0) {
        const mainIngredients = product.ingredients.slice(0, 5);
        speech += `Main ingredients: ${mainIngredients.join(', ')}. `;
    }

    return speech;
}

/**
 * Check if voice diction is enabled in settings
 * @returns boolean - true if voice diction is enabled
 */
export function isVoiceDictionEnabled(): boolean {
    const settings = localStorage.getItem('voiceSettings');
    if (!settings) return false;

    try {
        const parsedSettings = JSON.parse(settings);
        return parsedSettings.enabled === true;
    } catch {
        return false;
    }
}

/**
 * Save voice diction setting
 * @param enabled - whether to enable voice diction
 */
export function setVoiceDictionEnabled(enabled: boolean): void {
    const settings = { enabled };
    localStorage.setItem('voiceSettings', JSON.stringify(settings));
}