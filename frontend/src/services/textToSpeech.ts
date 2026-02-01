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
 * @param aiExplanations - Optional AI explanations for ingredients
 * @returns Formatted text for speech
 */
export function generateProductSpeech(
    product: any,
    isCompatible: boolean,
    issues: string[],
    aiExplanations?: Record<string, string>
): string {
    let speech = `Product information for ${product.name}. `;

    // Compatibility status
    if (isCompatible) {
        speech += "Good news! This product is safe for your diet. ";
    } else {
        speech += `Warning! This product is not suitable for you. Issues: ${issues.join(', ')}. `;
    }

    // Canada Hotlist Chemical Alert - CRITICAL FIRST!
    if (product.hotlistCheck?.status === "fail" && product.hotlistCheck.hits && product.hotlistCheck.hits.length > 0) {
        speech += "CRITICAL ALERT: This product contains chemicals on Canada's Hotlist. ";

        const highSeverityHits = product.hotlistCheck.hits.filter((h: any) => h.severity === "high");
        const mediumSeverityHits = product.hotlistCheck.hits.filter((h: any) => h.severity === "medium");

        if (highSeverityHits.length > 0) {
            speech += `${highSeverityHits.length} banned or restricted chemical${highSeverityHits.length > 1 ? 's' : ''} detected: `;
            highSeverityHits.forEach((hit: any) => {
                speech += `${hit.chemical}. ${hit.reason}. `;
            });
        }

        if (mediumSeverityHits.length > 0) {
            speech += `${mediumSeverityHits.length} chemical${mediumSeverityHits.length > 1 ? 's' : ''} under review: `;
            mediumSeverityHits.forEach((hit: any) => {
                speech += `${hit.chemical}. ${hit.reason}. `;
            });
        }
    }

    // Safety Warnings
    if (product.warnings && product.warnings.length > 0) {
        speech += "Safety alerts: ";
        product.warnings.forEach((warning: any) => {
            speech += `${warning.title}. ${warning.description}. `;
        });
    }

    // ALL Ingredients WITH AI Explanations!
    if (product.ingredients && product.ingredients.length > 0) {
        speech += "Ingredients: ";

        // If we have AI explanations, read ingredient + explanation for each
        if (aiExplanations && Object.keys(aiExplanations).length > 0) {
            product.ingredients.forEach((ingredient: string, index: number) => {
                const explanation = Object.entries(aiExplanations).find(
                    ([key]) => key.toLowerCase() === ingredient.toLowerCase()
                )?.[1];

                if (explanation) {
                    // Read ingredient name + explanation
                    speech += `${ingredient}: ${explanation}. `;
                } else {
                    // Just read ingredient name if no explanation
                    speech += `${ingredient}. `;
                }
            });
        } else {
            // No AI explanations - just list all ingredients
            speech += `${product.ingredients.join(', ')}. `;
        }
    }

    // Dietary Compatibility - What it IS compatible with
    if (product.compatibility && Object.keys(product.compatibility).length > 0) {
        const passDiets: string[] = [];
        const failDiets: string[] = [];
        const uncertainDiets: string[] = [];

        Object.entries(product.compatibility).forEach(([key, value]: [string, any]) => {
            // Convert camelCase to readable format (e.g., "glutenFree" -> "gluten free")
            const readable = key.replace(/([A-Z])/g, ' $1').toLowerCase().trim();

            // Check the status field (new backend format)
            if (value.status === "pass") {
                passDiets.push(readable);
            } else if (value.status === "fail") {
                failDiets.push(readable);
            } else if (value.status === "uncertain") {
                uncertainDiets.push(readable);
            }
            // Skip "unknown" status - don't mention it
        });

        if (passDiets.length > 0) {
            speech += `This product is suitable for: ${passDiets.join(', ')}. `;
        }

        if (failDiets.length > 0) {
            speech += `Not suitable for: ${failDiets.join(', ')}. `;
        }

        if (uncertainDiets.length > 0) {
            speech += `Uncertain compatibility with: ${uncertainDiets.join(', ')}. `;
        }
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