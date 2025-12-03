import * as Speech from "expo-speech";
import { Platform } from "react-native";

export async function speakWithMaleVoice(
  text: string,
  options: {
    language?: string;
    rate?: number;
    pitch?: number;
    onError?: () => void;
  } = {}
) {
  try {
    const voiceOptions: any = {
      language: options.language || "fr-FR",
      rate: options.rate || 0.95,
      pitch: options.pitch || 0.8, // Lower pitch for masculine voice
      onError: options.onError || (() => console.log("Speech error")),
    };

    // On iOS, specify male voice identifier
    if (Platform.OS === "ios") {
      // Available voices can vary, but these are common French male voices
      voiceOptions.voice = "fr-FR-male"; // Or use specific identifier if available
    }

    // On Android, we use pitch and rate to simulate masculine voice
    // Lower pitch (< 1.0) = deeper/masculine voice
    // Higher pitch (> 1.0) = higher/feminine voice
    if (Platform.OS === "android") {
      voiceOptions.pitch = 0.7; // Even lower pitch for Android male voice
    }

    Speech.speak(text, voiceOptions);
  } catch (error) {
    console.error("Error speaking:", error);
    if (options.onError) {
      options.onError();
    }
  }
}

// Get available voices (for debugging/selection)
export async function getAvailableVoices() {
  try {
    const voices = await Speech.getAvailableVoicesAsync();
    // Filter French voices
    const frenchVoices = voices.filter((v) => v.language.startsWith("fr"));
    return frenchVoices;
  } catch (error) {
    console.error("Error getting voices:", error);
    return [];
  }
}
