import React, { useMemo, useRef, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, Send, X } from 'lucide-react';
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

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const visibleSeeds = useMemo(() => CHATBOT_SEED_QUESTIONS.slice(0, 4), []);

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

            <div className="chatbot-seeds">
              {visibleSeeds.map((question) => (
                <button key={question} type="button" onClick={() => sendMessage(question)}>
                  {question}
                </button>
              ))}
            </div>

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
                placeholder="Ask about Vismay..."
              />
              <button type="submit" disabled={loading || !input.trim()} aria-label="Send message">
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        className="chatbot-toggle"
        onClick={() => setOpen((value) => !value)}
        aria-label="Open portfolio chatbot"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
      >
        <motion.span
          animate={{ boxShadow: ['0 0 0 0 rgba(173,255,47,0.35)', '0 0 0 18px rgba(173,255,47,0)'] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
        {open ? <X size={22} /> : <SiriWaveIcon active={loading} />}
      </motion.button>
    </div>
  );
}
