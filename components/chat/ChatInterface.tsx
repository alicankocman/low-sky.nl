'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatInterfaceProps {
  onReset?: () => void;
}

// Generate a simple session ID
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Simple markdown-like text formatter
function formatMessage(text: string) {
  // Split by lines
  const lines = text.split('\n');
  const elements: JSX.Element[] = [];
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
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello. I'd like to talk with you about your leadership journey. My first question: Think of an important decision you made recently. What did you pay attention to when making that decision?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
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
          content: data.message || 'I understand. Could you tell me more?'
        }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, an error occurred. Please try again.'
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
    <div className="min-h-screen bg-sand-50 pt-[57px]">
      <div className="flex flex-col max-w-5xl mx-auto" style={{ height: 'calc(100vh - 57px)' }}>
        {/* Header */}
        <div className="bg-white border-b-2 border-sand-200 px-4 sm:px-6 lg:px-8 py-5 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-h4 lg:text-h3 text-ink-900 font-serif">
                Leadership Dialogue
              </h2>
              <p className="text-caption text-ink-600 mt-1">
                Share your thoughts freely
              </p>
            </div>
            {onReset && (
              <button
                onClick={onReset}
                className="text-body-sm text-ink-500 hover:text-ink-900 transition-colors px-4 py-2 border border-sand-200 hover:border-sand-300"
              >
                ← Back
              </button>
            )}
          </div>
        </div>

        {/* Messages */}
        <div 
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
          onScroll={(e) => {
            // Detect if user manually scrolled up
            const container = e.currentTarget;
            const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 150;
            shouldAutoScrollRef.current = isNearBottom;
          }}
        >
          <div className="space-y-5 sm:space-y-6 max-w-4xl mx-auto">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[90%] sm:max-w-[80%] lg:max-w-[75%] px-5 sm:px-6 py-4 sm:py-5 ${
                    message.role === 'user'
                      ? 'bg-sage-600 text-white'
                      : 'bg-white border-2 border-sand-200 text-ink-900 shadow-sm'
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
                className="flex justify-start"
              >
                <div className="bg-white border-2 border-sand-200 shadow-sm px-6 py-5">
                  <div className="flex space-x-2 items-center">
                    <div className="w-2 h-2 bg-sage-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-sage-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-sage-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        {!isComplete && (
          <div className="bg-white border-t-2 border-sand-200 px-4 sm:px-6 lg:px-8 py-5 flex-shrink-0">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Write your thoughts..."
                  className="flex-1 resize-none border-2 border-sand-200 bg-white px-4 py-3 text-body text-ink-900 focus:border-sage-500 focus:outline-none transition-colors"
                  rows={3}
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  variant="primary"
                  size="large"
                >
                  {isLoading ? 'Sending...' : 'Send'}
                </Button>
              </div>
              <p className="text-caption text-ink-500 mt-2">
                Press Enter to send, Shift+Enter for new line
              </p>
            </div>
          </div>
        )}

        {/* Completion */}
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-sage-50 border-t-2 border-sage-200 px-4 sm:px-6 lg:px-8 py-6 flex-shrink-0"
          >
            <div className="max-w-4xl mx-auto text-center space-y-4">
              <p className="text-body-lg text-ink-900 font-medium">
                ✓ Dialogue Complete
              </p>
              <p className="text-body text-ink-600">
                Your reflection report is above. Would you like to learn more about our programs 
                or get in touch with us?
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2">
                <Button href="/programs" variant="primary" size="large">
                  View Programs
                </Button>
                <Button href="/contact" variant="secondary" size="large">
                  Contact Us
                </Button>
                {onReset && (
                  <Button onClick={onReset} variant="ghost" size="large">
                    Start New Dialogue
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
