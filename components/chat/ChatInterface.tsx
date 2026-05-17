'use client';

import { useState, useRef, useEffect, type ReactElement } from 'react';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatInterfaceProps {
  onReset?: () => void;
}

// Generate a simple session ID
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
}

// Simple markdown-like text formatter
function formatMessage(text: string) {
  // Split by lines
  const lines = text.split('\n');
  const elements: ReactElement[] = [];
  let listItems: string[] = [];
  let inList = false;

  const flushList = (key: number) => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${key}`} className="space-y-2 my-4 ml-4">
          {listItems.map((item, idx) => (
            <li key={idx} className="flex gap-3">
              <span className="text-sage-700 font-medium">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    
    // Handle headers
    if (trimmed.startsWith('# ')) {
      if (inList) { flushList(index); inList = false; }
      elements.push(
        <h1 key={index} className="text-h3 font-serif text-ink-950 mb-4 mt-6 first:mt-0">
          {trimmed.substring(2)}
        </h1>
      );
    } else if (trimmed.startsWith('## ')) {
      if (inList) { flushList(index); inList = false; }
      elements.push(
        <h2 key={index} className="text-h4 font-serif text-ink-950 mb-3 mt-5 first:mt-0">
          {trimmed.substring(3)}
        </h2>
      );
    } else if (trimmed.startsWith('### ')) {
      if (inList) { flushList(index); inList = false; }
      elements.push(
        <h3 key={index} className="text-body font-semibold text-ink-900 mb-2 mt-4 first:mt-0">
          {trimmed.substring(4)}
        </h3>
      );
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      // List items
      inList = true;
      listItems.push(trimmed.substring(2));
    } else if (trimmed === '') {
      // Empty line - flush list if in one
      if (inList) { flushList(index); inList = false; }
      elements.push(<div key={index} className="h-2" />);
    } else {
      // Regular paragraph
      if (inList) { flushList(index); inList = false; }
      if (trimmed) {
        // Handle bold text **text**
        const parts = trimmed.split(/(\*\*.*?\*\*)/g);
        const formatted = parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="font-semibold text-ink-900">{part.slice(2, -2)}</strong>;
          }
          return part;
        });
        
        elements.push(
          <p key={index} className="mb-3 leading-relaxed">
            {formatted}
          </p>
        );
      }
    }
  });

  // Flush any remaining list
  if (inList) { flushList(lines.length); }

  return <div className="space-y-1">{elements}</div>;
}

export function ChatInterface({ onReset }: ChatInterfaceProps) {
  const t = useTranslations('Chat');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: t('initialAssistant'),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const sessionIdRef = useRef<string>(generateSessionId());
  const hasLoggedStartRef = useRef(false);
  const shouldAutoScrollRef = useRef(true);

  const scrollToBottom = (force = false) => {
    if (!messagesContainerRef.current) return;
    
    const container = messagesContainerRef.current;
    const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 150;
    
    // Only auto-scroll if user is near bottom or force is true
    if (force || isNearBottom || shouldAutoScrollRef.current) {
      // Scroll ONLY the chat container, not the page
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth'
      });
      shouldAutoScrollRef.current = true;
    }
  };

  useEffect(() => {
    scrollToBottom(true); // Force scroll on new messages
  }, [messages.length]);

  // Log conversation start (only once)
  useEffect(() => {
    if (!hasLoggedStartRef.current) {
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'conversation_started',
          timestamp: new Date().toISOString(),
          sessionId: sessionIdRef.current
        })
      }).catch(console.error);
      hasLoggedStartRef.current = true;
    }
  }, []);

  // Log conversation abandonment on unmount
  useEffect(() => {
    const sessionId = sessionIdRef.current; // Capture current value
    return () => {
      if (!isComplete) {
        fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'conversation_abandoned',
            timestamp: new Date().toISOString(),
            sessionId: sessionId // Use captured value
          })
        }).catch(console.error);
      }
    };
  }, [isComplete]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    shouldAutoScrollRef.current = true; // Enable auto-scroll for new message

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage]
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API error:', response.status, errorText);
        throw new Error(`API error: ${response.status}`);
      }

      const responseText = await response.text();
      if (!responseText) {
        throw new Error('Empty response from server');
      }

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('JSON parse error:', parseError, 'Response:', responseText);
        throw new Error('Invalid response format');
      }

      if (data.complete) {
        setIsComplete(true);
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: data.report || 'Report generated successfully.'
        }]);

        // Log completion with program recommendation
        fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'conversation_completed',
            timestamp: new Date().toISOString(),
            sessionId: sessionIdRef.current,
            program: data.program || undefined
          })
        }).catch(console.error);
      } else {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: data.message || t('fallbackAssistant')
        }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: t('errorAssistant')
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sand-50 to-sand-100/80 pt-[57px]">
      <div
        className="flex flex-col max-w-3xl mx-auto border-x border-sand-200/80 bg-sand-50/90 shadow-[0_0_0_1px_rgba(122,139,114,0.06)]"
        style={{ height: 'calc(100vh - 57px)' }}
      >
        {/* Header */}
        <header className="bg-white border-b-2 border-sand-200 px-4 sm:px-6 py-4 flex-shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex gap-4 min-w-0">
              <div
                className="hidden sm:block w-1 shrink-0 self-stretch min-h-[3rem] bg-sage-600"
                aria-hidden
              />
              <div className="min-w-0">
                <p className="text-caption font-medium uppercase tracking-wide text-sage-700 mb-1">
                  {t('kicker')}
                </p>
                <h2 className="text-h4 sm:text-h3 text-ink-900 font-serif leading-tight">
                  {t('title')}
                </h2>
                <p className="text-caption text-ink-600 mt-1 max-w-md">
                  {t('subtitle')}
                </p>
              </div>
            </div>
            {onReset && (
              <button
                type="button"
                onClick={onReset}
                className="shrink-0 text-body-sm text-ink-500 hover:text-ink-900 transition-colors px-3 py-2 border border-sand-200 hover:border-sand-300 bg-white"
              >
                {t('backIntro')}
              </button>
            )}
          </div>
        </header>

        {/* Messages */}
        <div
          ref={messagesContainerRef}
          role="log"
          aria-live="polite"
          aria-relevant="additions"
          className="flex-1 min-h-0 overflow-y-auto px-3 sm:px-6 py-5 sm:py-6 bg-sand-50/50"
          onScroll={(e) => {
            const container = e.currentTarget;
            const isNearBottom =
              container.scrollHeight - container.scrollTop - container.clientHeight < 150;
            shouldAutoScrollRef.current = isNearBottom;
          }}
        >
          <div className="space-y-6 max-w-2xl mx-auto">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <span
                  className={`text-caption font-medium uppercase tracking-wide mb-1.5 ${
                    message.role === 'user' ? 'text-sage-800' : 'text-ink-500'
                  }`}
                >
                  {message.role === 'user' ? t('you') : t('coach')}
                </span>
                <div
                  className={`max-w-[92%] sm:max-w-[85%] px-4 sm:px-5 py-3.5 sm:py-4 border-2 ${
                    message.role === 'user'
                      ? 'bg-sage-700 border-sage-800 text-sand-50'
                      : 'bg-white border-sand-200 text-ink-900 shadow-sm'
                  }`}
                >
                  {message.role === 'assistant' ? (
                    <div className="text-body prose-sm max-w-none">
                      {formatMessage(message.content)}
                    </div>
                  ) : (
                    <p className="text-body whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-start"
              >
                <span className="text-caption font-medium uppercase tracking-wide text-ink-500 mb-1.5">
                  {t('coach')}
                </span>
                <div className="bg-white border-2 border-sand-200 shadow-sm px-5 py-4">
                  <div className="flex space-x-2 items-center">
                    <span className="sr-only">{t('typing')}</span>
                    <div
                      className="w-2 h-2 bg-sage-500 rounded-full animate-bounce"
                      style={{ animationDelay: '0ms' }}
                    />
                    <div
                      className="w-2 h-2 bg-sage-500 rounded-full animate-bounce"
                      style={{ animationDelay: '150ms' }}
                    />
                    <div
                      className="w-2 h-2 bg-sage-500 rounded-full animate-bounce"
                      style={{ animationDelay: '300ms' }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Input composer */}
        {!isComplete && (
          <div className="bg-white border-t-2 border-sand-200 px-3 sm:px-6 py-4 flex-shrink-0">
            <div className="max-w-2xl mx-auto">
              <label htmlFor="leadership-chat-input" className="sr-only">
                {t('inputLabel')}
              </label>
              <div className="flex flex-col sm:flex-row gap-3 sm:items-end border-2 border-sand-200 focus-within:border-sage-500 transition-colors bg-sand-50/30 p-3 sm:p-3">
                <textarea
                  id="leadership-chat-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t('placeholder')}
                  className="flex-1 resize-none border-0 bg-transparent px-1 py-2 text-body text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-0 min-h-[5.5rem] sm:min-h-[4.5rem]"
                  rows={3}
                  disabled={isLoading}
                />
                <div className="w-full sm:w-auto sm:self-end shrink-0">
                  <Button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    variant="primary"
                    size="default"
                  >
                    {isLoading ? t('sending') : t('send')}
                  </Button>
                </div>
              </div>
              <p className="text-caption text-ink-500 mt-2 px-0.5">
                {t('hintKeys')}
              </p>
            </div>
          </div>
        )}

        {/* Completion */}
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-sage-50 border-t-2 border-sage-200 px-4 sm:px-6 py-6 flex-shrink-0"
          >
            <div className="max-w-2xl mx-auto text-center space-y-4">
              <p className="text-body-lg text-ink-900 font-medium">
                {t('completeTitle')}
              </p>
              <p className="text-body text-ink-600">
                {t('completeBody')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2">
                <Button href="/programs" variant="primary" size="large">
                  {t('viewPrograms')}
                </Button>
                <Button href="/contact" variant="secondary" size="large">
                  {t('contactUs')}
                </Button>
                {onReset && (
                  <Button onClick={onReset} variant="ghost" size="large">
                  {t('newDialogue')}
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
