import { NextRequest, NextResponse } from 'next/server';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Simplified system prompt for APIFreeLLM
const SYSTEM_PROMPT = `You are a thoughtful leadership coach having a reflective conversation. Ask open-ended questions about decision-making, responsibility, values, and self-awareness. Be warm and conversational. Keep responses to 1-2 sentences.`;

export async function POST(request: NextRequest) {
  let messages: Message[] = [];
  
  try {
    const body = await request.json();
    messages = body.messages || [];

    if (!Array.isArray(messages) || messages.length === 0) {
      throw new Error('Invalid messages array');
    }

    // Check if user is asking for conclusion
    const lastUserMessage = messages[messages.length - 1]?.content?.toLowerCase() || '';
    const isAskingForConclusion = 
      lastUserMessage.includes('conclusion') ||
      lastUserMessage.includes('recommend') ||
      lastUserMessage.includes('program') ||
      lastUserMessage.includes('report') ||
      lastUserMessage.includes('summary');

    // Count conversation depth (number of assistant messages)
    const conversationDepth = messages.filter((m: Message) => m.role === 'assistant').length;

    // Decide if we should complete the conversation
    const shouldComplete = isAskingForConclusion || conversationDepth >= 6;

    // Check if API key is configured
    const groqApiKey = process.env.GROQ_API_KEY;
    if (!groqApiKey) {
      // Fallback to placeholder
      if (shouldComplete) {
        const report = generatePlaceholderReport(messages);
        return NextResponse.json({
          complete: true,
          report: report.content,
          program: report.program
        });
      }

      return NextResponse.json({
        message: generatePlaceholderQuestion(conversationDepth),
        complete: false
      });
    }

    // Build simple, natural conversation history
    const recentMessages = messages.slice(-4); // Only last 4 messages for context
    const conversationHistory = recentMessages.map((m: Message) => 
      `${m.role === 'user' ? 'User' : 'Coach'}: ${m.content}`
    ).join('\n');

    // Create simplified prompt
    let prompt: string;
    
    if (shouldComplete) {
      prompt = `${SYSTEM_PROMPT}

Conversation so far:
${conversationHistory}

Now write a thoughtful Leadership Reflection Report with these sections:
1. Overall Approach (2-3 paragraphs about their leadership style)
2. Strengths (3 bullet points)
3. Development Areas (2 bullet points)
4. Focus Themes (3 bullet points)
5. Program Recommendation (Recommend either NPL for emerging leaders or LIR for experienced leaders, 1 paragraph)

Write naturally and warmly. No scores or judgments.`;
    } else {
      // Generate next question naturally
      const lastUserMsg = messages[messages.length - 1]?.content || '';
      prompt = `You're a leadership coach in a reflective conversation. The user just said: "${lastUserMsg}"

Ask a thoughtful follow-up question about their leadership approach, values, or decision-making. Keep it to 1-2 sentences, warm and conversational.`;
    }

    // Call Groq API
    let assistantMessage: string;
    
    try {
      // Build messages array for Groq (OpenAI-compatible format)
      const systemMessage = {
        role: 'system',
        content: SYSTEM_PROMPT
      };

      const userMessage = {
        role: 'user',
        content: prompt
      };

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${groqApiKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile', // Fast and capable model
          messages: [systemMessage, userMessage],
          temperature: 0.7,
          max_tokens: shouldComplete ? 2000 : 300,
          stream: false
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Groq API error:', response.status, errorText);
        throw new Error(`Groq API request failed: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data || !data.choices || !data.choices[0] || !data.choices[0].message) {
        console.error('Invalid Groq API response structure:', data);
        throw new Error('Invalid Groq API response structure');
      }

      assistantMessage = data.choices[0].message.content || '';
      
      if (!assistantMessage) {
        throw new Error('Empty response from Groq API');
      }

    } catch (apiError) {
      // Fallback to placeholder on any API error
      console.warn('Groq API call failed, using placeholder:', apiError);
      assistantMessage = shouldComplete 
        ? generatePlaceholderReport(messages).content
        : generatePlaceholderQuestion(conversationDepth);
      
      // If completing, return early with placeholder
      if (shouldComplete) {
        const report = generatePlaceholderReport(messages);
        return NextResponse.json({
          complete: true,
          report: report.content,
          program: report.program
        });
      }
    }

    // Extract program recommendation if completing
    let program: 'NPL' | 'LIR' | undefined;
    if (shouldComplete) {
      program = assistantMessage.includes('Leadership in Residence') ? 'LIR' : 'NPL';
      
      return NextResponse.json({
        complete: true,
        report: assistantMessage,
        program
      });
    }

    return NextResponse.json({
      message: assistantMessage,
      complete: false
    });

  } catch (error) {
    console.error('Chat API error:', error);
    
    // Fallback to placeholder on error
    const conversationDepth = messages.filter((m: Message) => m.role === 'assistant').length;
    
    return NextResponse.json({
      message: generatePlaceholderQuestion(conversationDepth),
      complete: false
    }, { status: 200 }); // Always return 200 with fallback
  }
}

// Placeholder functions for development without API key
function generatePlaceholderQuestion(depth: number): string {
  const questions = [
    'Think of an experience where you led a team or project. What did you prioritize most during that process?',
    'How do you feel when facing uncertainty? Can you give an example?',
    'How do you feel when delegating responsibility to others?',
    'When did you most recently feel like a "leader"?',
    'What approach to communication comes most naturally to you?',
    'Have you ever faced a situation where you had to compromise your values? How did you decide?'
  ];
  
  return questions[Math.min(depth, questions.length - 1)];
}

function generatePlaceholderReport(messages: Message[]): { content: string; program: 'NPL' | 'LIR' } {
  // Simple heuristic: if user mentions experience, recommend LIR, otherwise NPL
  const hasExperience = messages.some(m => 
    m.role === 'user' && 
    (m.content.toLowerCase().includes('year') || 
     m.content.toLowerCase().includes('team') ||
     m.content.toLowerCase().includes('experience'))
  );
  
  const program: 'NPL' | 'LIR' = hasExperience ? 'LIR' : 'NPL';
  const programName = program === 'NPL' ? 'New Personal Leadership (NPL)' : 'Leadership in Residence (LIR)';
  const programDesc = program === 'NPL' 
    ? 'This program is designed for those who want to explore the foundations of their leadership journey, clarify their values, and develop their personal leadership approach. I recommend this program to deepen your self-awareness and build a solid foundation for your leadership practice.'
    : 'This program is designed for leaders with experience who want to deepen their practice. I recommend it for rediscovering your current experience, refining your leadership approach, and gaining new perspectives.';

  const content = `# Leadership Reflection Report

## 1. OVERALL APPROACH

Throughout our conversation, I observed that you approach leadership from a thoughtful, human-centered perspective. You tend to consider both logical and emotional factors when making decisions. You don't shy away from taking responsibility, but you also value creating space for others.

Your relationship with uncertainty is open to growth. Sometimes you may feel fear of losing control, but you're aware of this. This awareness is the first step toward growth.

## 2. STRENGTHS

- **Self-Awareness**: You have a strong capacity to observe your own thoughts and feelings
- **Relational Sensitivity**: You pay attention to people's needs and emotions
- **Value-Centered**: You recognize the role of your values in your decisions

## 3. DEVELOPMENT AREAS

- **Dancing with Uncertainty**: Practicing acceptance of lack of control and seeing it as opportunity
- **Boundary Setting**: Balancing responsibility-taking with protecting your own boundaries

## 4. RECOMMENDED FOCUS THEMES

- Personal values and leadership identity
- Uncertainty and flexibility
- Communication and relationship-building skills

## 5. PROGRAM RECOMMENDATION

**${programName}** may be suitable for you. ${programDesc}

---

This report is not a measurement, but a reflection. Your own observations are always your most valuable guide.`;

  return { content, program };
}
