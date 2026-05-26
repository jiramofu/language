// Web Speech API for speech recognition and text-to-speech

const speechService = {
  // Initialize speech recognition
  initializeSpeechRecognition: () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error('Speech Recognition not supported');
      return null;
    }
    return new SpeechRecognition();
  },

  // Start recording user speech
  recordSpeech: (language = 'es-ES') => {
    return new Promise((resolve, reject) => {
      const recognition = speechService.initializeSpeechRecognition();
      
      if (!recognition) {
        reject('Speech Recognition not supported');
        return;
      }

      recognition.language = language;
      recognition.continuous = false;
      recognition.interimResults = false;

      let transcript = '';

      recognition.onstart = () => {
        console.log('Listening...');
      };

      recognition.onresult = (event) => {
        transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const isFinal = event.results[i].isFinal;
          transcript += event.results[i][0].transcript;
          if (isFinal) {
            break;
          }
        }
        resolve(transcript);
      };

      recognition.onerror = (event) => {
        reject(`Error: ${event.error}`);
      };

      recognition.onend = () => {
        console.log('Stopped listening');
      };

      recognition.start();
    });
  },

  // Text-to-speech: speak a word or sentence
  speak: (text, language = 'es-ES') => {
    return new Promise((resolve, reject) => {
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Map language codes to appropriate voice
      const languageMap = {
        'es-ES': 'es-ES',
        'fr-FR': 'fr-FR',
        'it-IT': 'it-IT',
        'jam-JAM': 'en-US',
      };

      utterance.lang = languageMap[language] || language;
      utterance.rate = 0.9;
      utterance.pitch = 1;

      utterance.onend = () => {
        resolve();
      };

      utterance.onerror = (event) => {
        reject(`Speech error: ${event.error}`);
      };

      window.speechSynthesis.speak(utterance);
    });
  },

  // Compare user pronunciation with target (basic similarity check)
  evaluatePronunciation: (userSpeech, targetWord) => {
    const userWords = userSpeech.toLowerCase().trim().split(/\s+/);
    const targetWords = targetWord.toLowerCase().trim().split(/\s+/);

    let matches = 0;
    for (let i = 0; i < Math.min(userWords.length, targetWords.length); i++) {
      if (userWords[i].includes(targetWords[i]) || targetWords[i].includes(userWords[i])) {
        matches++;
      }
    }

    const accuracy = (matches / Math.max(userWords.length, targetWords.length)) * 100;
    return {
      accuracy: Math.round(accuracy),
      isGood: accuracy >= 70,
    };
  },

  // Stop speech synthesis
  stopSpeaking: () => {
    window.speechSynthesis.cancel();
  },

  // Check if Web Speech API is available
  isAvailable: () => {
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  },
};

export default speechService;
