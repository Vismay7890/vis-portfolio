import React, { useMemo, useRef, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, Send, X, Mic, MicOff } from 'lucide-react';
import SiriWave from 'siriwave';
import {
  CHATBOT_SEED_QUESTIONS,
} from '../data/profileData';

const initialMessages = [
  {
    role: 'assistant',
    content: 'Ask me about Vismay Jain: GenAI work, projects, skills, certifications, or resume highlights.',
  },
];

function SiriWaveIcon({ active }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous contents
    containerRef.current.innerHTML = '';

    const SiriWaveConstructor = SiriWave.default || SiriWave;

    const siriWave = new SiriWaveConstructor({
      container: containerRef.current,
      width: 64,
      height: 64,
      style: 'ios9',
      amplitude: active ? 1.8 : 0.8,
      speed: active ? 0.22 : 0.1,
      autostart: true,
      cover: true,
    });

    return () => {
      if (siriWave && typeof siriWave.dispose === 'function') {
        siriWave.dispose();
      }
    };
  }, [active]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%', pointerEvents: 'none' }} />;
}

function VoiceWave({ active }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = '';

    const SiriWaveConstructor = SiriWave.default || SiriWave;
    const siriWave = new SiriWaveConstructor({
      container: containerRef.current,
      width: 320,
      height: 48,
      style: 'ios9',
      amplitude: active ? 0.7 : 0.3,
      speed: active ? 0.16 : 0.06,
      autostart: true,
      cover: true,
      curveDefinition: [
        { color: "239, 68, 68" },   // Red
        { color: "173, 255, 47" },   // Green
      ]
    });

    return () => {
      if (siriWave && typeof siriWave.dispose === 'function') {
        siriWave.dispose();
      }
    };
  }, [active]);

  return <div ref={containerRef} style={{ width: '100%', height: '48px', pointerEvents: 'none' }} />;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Voice feature states
  const [voiceActive, setVoiceActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showFlashTooltip, setShowFlashTooltip] = useState(true);

  const inputRef = useRef(null);
  const recognitionRef = useRef(null);
  const elevenLabsAudioRef = useRef(null);
  const visibleSeeds = useMemo(() => CHATBOT_SEED_QUESTIONS.slice(0, 4), []);

  // Request mic permission
  const requestMicAndActivate = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      setShowFlashTooltip(false);
      setVoiceActive(true);
      setOpen(true);
      return true;
    } catch (err) {
      console.warn('Microphone permission denied', err);
      // Still open chatbot even if permission denied, but keep voice off
      setOpen(true);
      return false;
    }
  };

  // Toggle voice mode manually inside the chat
  const handleVoiceToggle = async () => {
    if (voiceActive) {
      setVoiceActive(false);
    } else {
      const granted = await requestMicAndActivate();
      if (!granted) {
        alert('Please allow microphone access in your browser settings to use Voice Mode.');
      }
    }
  };

  async function sendMessage(text) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const nextMessages = [...messages, { role: 'user', content: trimmed }];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/.netlify/functions/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: nextMessages.slice(-8),
          voiceActive: voiceActive, // Send voiceActive state to generate ElevenLabs voice on backend
        }),
      });

      if (!response.ok) {
        throw new Error('Chat service is not available yet.');
      }

      const data = await response.json();
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content: data.answer || 'I could not find a grounded answer in the portfolio index.',
          audio: data.audio, // store base64 audio
        },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content:
            'The portfolio brain is wired, but the server function needs deployed environment keys to answer from Pinecone.',
        },
      ]);
    } finally {
      setLoading(false);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }

  // Play ElevenLabs audio
  const playElevenLabsAudio = (base64Audio) => {
    window.speechSynthesis.cancel();
    if (elevenLabsAudioRef.current) {
      try {
        elevenLabsAudioRef.current.pause();
      } catch (e) {}
    }

    const audio = new Audio("data:audio/mpeg;base64," + base64Audio);
    elevenLabsAudioRef.current = audio;

    audio.onplay = () => {
      setIsSpeaking(true);
    };

    audio.onended = () => {
      setIsSpeaking(false);
      if (open && voiceActive && recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (e) {
          console.error(e);
        }
      }
    };

    audio.onerror = () => {
      setIsSpeaking(false);
    };

    audio.play().catch((err) => {
      console.warn("Audio play failed, fallback to SpeechSynthesis", err);
      setIsSpeaking(false);
      // Fallback
      const lastMsg = messages[messages.length - 1];
      if (lastMsg && lastMsg.role === 'assistant') {
        speakText(lastMsg.content);
      }
    });
  };

  // Speak response back (Fallback Web Speech API)
  const speakText = (text) => {
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#_`~]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);

    // Filter premium voices
    const voices = window.speechSynthesis.getVoices();
    const englishVoices = voices.filter((v) => v.lang.startsWith('en'));
    const premiumVoice =
      englishVoices.find((v) => v.name.includes('Natural') || v.name.includes('Online')) ||
      englishVoices.find((v) => v.name.includes('Google')) ||
      englishVoices.find((v) => v.name.includes('Samantha')) ||
      englishVoices.find((v) => v.name.includes('Siri')) ||
      englishVoices[0];

    if (premiumVoice) {
      utterance.voice = premiumVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      // Automatically resume listening if voice mode is still active
      if (open && voiceActive && recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (e) {
          console.error(e);
        }
      }
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  // Speak when a new assistant message is received
  useEffect(() => {
    if (messages.length === 0) return;
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role === 'assistant' && voiceActive && open) {
      if (lastMessage.audio) {
        playElevenLabsAudio(lastMessage.audio);
      } else {
        speakText(lastMessage.content);
      }
    }
  }, [messages, voiceActive, open]);

  // Speech Recognition control
  useEffect(() => {
    if (!open || !voiceActive) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {}
      }
      window.speechSynthesis.cancel();
      if (elevenLabsAudioRef.current) {
        try {
          elevenLabsAudioRef.current.pause();
        } catch (e) {}
      }
      setIsListening(false);
      setIsSpeaking(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn('Speech recognition not supported in this browser.');
      return;
    }

    const rec = new SpeechRecognition();
    rec.continuous = false;
    rec.interimResults = true;
    rec.lang = 'en-US';

    rec.onstart = () => {
      setIsListening(true);
    };

    rec.onresult = (event) => {
      const speakingNative = window.speechSynthesis.speaking;
      const speakingElevenLabs = elevenLabsAudioRef.current && !elevenLabsAudioRef.current.paused;

      if (speakingNative || speakingElevenLabs) {
        // Interrupt bot instantly if user starts speaking
        window.speechSynthesis.cancel();
        if (elevenLabsAudioRef.current) {
          try {
            elevenLabsAudioRef.current.pause();
          } catch (e) {}
        }
        setIsSpeaking(false);
        setInput('');
        return;
      }

      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      const currentText = finalTranscript || interimTranscript;
      setInput(currentText);
    };

    rec.onend = () => {
      setIsListening(false);
      const textToSend = inputRef.current?.value || '';
      if (textToSend.trim()) {
        sendMessage(textToSend);
      }
    };

    rec.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
      if (event.error === 'not-allowed') {
        setVoiceActive(false);
      }
    };

    recognitionRef.current = rec;

    // Start listening and keep mic active
    try {
      rec.start();
    } catch (e) {
      console.error(e);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {}
      }
      window.speechSynthesis.cancel();
      if (elevenLabsAudioRef.current) {
        try {
          elevenLabsAudioRef.current.pause();
        } catch (e) {}
      }
    };
  }, [open, voiceActive]);

  // Also load voices on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  return (
    <div className="chatbot-root">
      <AnimatePresence>
        {open && (
          <motion.div
            className="chatbot-panel"
            initial={{ opacity: 0, y: 28, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.94 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="chatbot-header">
              <div>
                <strong>Ask Vismay AI</strong>
                {voiceActive && (
                  <span className={`voice-indicator ${isListening ? 'listening' : isSpeaking ? 'speaking' : ''}`}>
                    {isListening ? 'Listening...' : isSpeaking ? 'Speaking...' : 'Voice Active'}
                  </span>
                )}
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close chatbot">
                <X size={18} />
              </button>
            </div>

            <div className="chatbot-messages">
              {messages.map((message, index) => (
                <motion.div
                  key={`${message.role}-${index}`}
                  className={`chatbot-message ${message.role}`}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {message.content}
                </motion.div>
              ))}
              {loading && (
                <motion.div className="chatbot-message assistant loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Loader2 size={16} /> Searching Pinecone
                </motion.div>
              )}
            </div>

            {!(messages.length > 1 || voiceActive) && (
              <div className="chatbot-seeds">
                {visibleSeeds.map((question) => (
                  <button key={question} type="button" onClick={() => sendMessage(question)}>
                    {question}
                  </button>
                ))}
              </div>
            )}

            {(isListening || isSpeaking) && (
              <div className="chatbot-voice-wave-container">
                <VoiceWave active={true} />
              </div>
            )}

            <form
              className="chatbot-input"
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage(input);
              }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={voiceActive && isListening ? "Listening actively..." : "Ask about Vismay..."}
              />
              <button
                type="button"
                className={`chatbot-voice-toggle ${voiceActive ? 'active' : ''}`}
                onClick={handleVoiceToggle}
                aria-label="Toggle Voice Mode"
                style={{
                  marginRight: '8px',
                  background: voiceActive ? 'var(--bg-accent-green)' : 'rgba(255, 255, 255, 0.08)',
                  color: voiceActive ? 'var(--text-dark)' : 'var(--text-secondary)'
                }}
              >
                {voiceActive ? <Mic size={16} /> : <MicOff size={16} />}
              </button>
              <button type="submit" disabled={loading || !input.trim()} aria-label="Send message">
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!open && showFlashTooltip && (
          <motion.div
            className="chatbot-flash-tooltip"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ delay: 1, duration: 0.3 }}
            onClick={requestMicAndActivate}
          >
            Allow audio so we can talk
            <span className="tooltip-arrow" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        className="chatbot-toggle"
        onClick={() => {
          if (!open) {
            requestMicAndActivate();
          } else {
            setOpen(false);
          }
        }}
        aria-label="Open portfolio chatbot"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
      >
        <motion.span
          animate={{ boxShadow: ['0 0 0 0 rgba(173,255,47,0.35)', '0 0 0 18px rgba(173,255,47,0)'] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
        {open ? <X size={22} /> : <SiriWaveIcon active={loading || isListening} />}
      </motion.button>
    </div>
  );
}

