'use client';

import { useState } from 'react';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { Hero } from '@/components/ui/Hero';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { motion } from 'framer-motion';

export default function ReflectionPage() {
  const [hasStarted, setHasStarted] = useState(false);

  if (hasStarted) {
    return <ChatInterface onReset={() => setHasStarted(false)} />;
  }

  return (
    <>
      <Hero
        subtitle="Leadership Reflection"
        title="A conversation with yourself"
        description="This is not a test, but a space for thinking and reflection. Discover your leadership approach through open-ended questions."
        centered
      />

      <Section spacing="default">
        <div className="max-w-3xl mx-auto">
          <Card>
            <h3 className="text-h3 font-serif text-ink-950 mb-4">
              How does it work?
            </h3>
            
            <div className="space-y-4 text-body text-ink-600 mb-8">
              <p>
                I'll ask you open-ended questions about your decision-making patterns, 
                sense of responsibility, relationship with uncertainty, and self-awareness.
              </p>
              
              <p>
                After answering questions, you can add more context or ask questions of your own. 
                We'll proceed as a dialogue, similar to ChatGPT.
              </p>

              <p>
                At the end, you won't receive a score, level, or category—instead, you'll get a 
                <strong className="text-ink-800"> reflection report</strong> about your leadership approach.
              </p>

              <div className="bg-sage-50 border-2 border-sage-200 p-6 mt-6">
                <h4 className="text-h4 font-serif text-ink-950 mb-3">
                  Privacy & Ethics
                </h4>
                <div className="space-y-2">
                  <div className="flex gap-3">
                    <span className="text-sage-700 font-medium">•</span>
                    <span className="text-body-sm text-ink-700">Your responses are not stored</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-sage-700 font-medium">•</span>
                    <span className="text-body-sm text-ink-700">Conversation history is not persistent</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-sage-700 font-medium">•</span>
                    <span className="text-body-sm text-ink-700">Each session is isolated and independent</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-sage-700 font-medium">•</span>
                    <span className="text-body-sm text-ink-700">Only anonymous usage data is collected</span>
                  </div>
                </div>
              </div>

              <p className="text-body-sm text-ink-500 pt-4 border-t border-sand-200">
                The dialogue takes approximately 10-15 minutes. We recommend starting in a quiet 
                environment where you can be honest with yourself.
              </p>
            </div>

            <Button onClick={() => setHasStarted(true)} variant="primary" size="large">
              Begin Dialogue
            </Button>
          </Card>
        </div>
      </Section>

      <Section background="accent" spacing="default" centered>
        <div className="max-w-3xl">
          <h2 className="text-h2 lg:text-h1 font-serif text-ink-950 mb-4 leading-tight">
            Looking for program information?
          </h2>
          <p className="text-body-lg text-ink-600 mb-8 leading-relaxed">
            At the end of the dialogue, we'll recommend a suitable program for you. 
            But if you'd like, you can explore our programs now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/programs" variant="primary" size="large">
              View Programs
            </Button>
            <Button href="/contact" variant="secondary" size="large">
              Contact Us
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
