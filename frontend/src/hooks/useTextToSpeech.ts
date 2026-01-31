import { useState, useRef, useCallback } from 'react';
import { textToSpeech } from '../services/textToSpeech';

export function useTextToSpeech() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    /**
     * Speak the given text
     */
    const speak = useCallback(async (text: string) => {
        try {
            setIsLoading(true);
            setError(null);

            // Stop any currently playing audio
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }

            // Get audio from ElevenLabs
            const audioBlob = await textToSpeech(text);
            const audioUrl = URL.createObjectURL(audioBlob);

            // Create and play audio
            const audio = new Audio(audioUrl);
            audioRef.current = audio;

            audio.onplay = () => setIsPlaying(true);
            audio.onended = () => {
                setIsPlaying(false);
                URL.revokeObjectURL(audioUrl); // Clean up
            };
            audio.onerror = () => {
                setIsPlaying(false);
                setError('Failed to play audio');
                URL.revokeObjectURL(audioUrl);
            };

            await audio.play();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
            setIsPlaying(false);
        } finally {
            setIsLoading(false);
        }
    }, []);

    /**
     * Stop the currently playing audio
     */
    const stop = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
            setIsPlaying(false);
        }
    }, []);

    return {
        speak,
        stop,
        isPlaying,
        isLoading,
        error,
    };
}