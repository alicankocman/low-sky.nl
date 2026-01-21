# Chatbot Setup Guide

## Overview

The chatbot system is a **reflective leadership conversation tool**, NOT a test or assessment system. It helps users explore their leadership patterns through thoughtful dialogue.

## Key Principles

- **No scoring, levels, or measurements**
- **No psychological profiling or categorization**
- **Privacy-first**: No user data stored
- **Conversation → Reflection → Report**

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure API Key

Choose ONE of the following AI providers:

#### Option A: OpenAI (GPT-4)

1. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a `.env.local` file in the project root
3. Add your key:

```
OPENAI_API_KEY=sk-...your-key-here...
```

#### Option B: Anthropic (Claude)

1. Get your API key from [Anthropic Console](https://console.anthropic.com/)
2. Create a `.env.local` file in the project root
3. Add your key:

```
ANTHROPIC_API_KEY=sk-ant-...your-key-here...
```

### 3. Update API Route (if using OpenAI)

Edit `app/api/chat/route.ts` and uncomment the OpenAI API implementation section (around line 80).

Replace the placeholder code with:

```typescript
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
  },
  body: JSON.stringify({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages
    ],
    temperature: 0.7,
    max_tokens: shouldComplete ? 1500 : 300
  })
});

const data = await response.json();
const assistantMessage = data.choices[0].message.content;

// Extract program recommendation from report if completing
let program: 'NPL' | 'LIR' | undefined;
if (shouldComplete) {
  program = assistantMessage.includes('Leadership in Residence') ? 'LIR' : 'NPL';
}

if (shouldComplete) {
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
```

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000/reflection](http://localhost:3000/reflection)

## File Structure

```
app/
├── danisan/
│   └── page.tsx              # Chatbot landing page
├── api/
│   ├── chat/
│   │   └── route.ts          # Main chat API endpoint
│   └── analytics/
│       └── route.ts          # Anonymous usage tracking
components/
└── chat/
    └── ChatInterface.tsx     # Chat UI component
```

## How It Works

### 1. Conversation Flow

1. User starts conversation
2. AI asks 4-6 reflective questions about:
   - Decision-making patterns
   - Sense of responsibility
   - Relationship with uncertainty
   - Self-awareness
3. User can ask follow-up questions
4. User asks for conclusion or completes 6 questions
5. AI generates reflection report

### 2. System Prompt

The AI is guided by a comprehensive system prompt that:
- Prevents scoring/measuring
- Focuses on observation and reflection
- Asks open-ended questions
- Maintains a warm, thoughtful tone

### 3. Report Format

The final report includes:
- Overall leadership approach summary
- Observed strengths
- Development areas
- Suggested focus themes
- Program recommendation (NPL or LIR)

### 4. Analytics (Privacy-Safe)

Only anonymous metadata is tracked:
- Number of conversations started
- Number completed
- Number abandoned
- Program recommendations (NPL vs LIR)

**No user content or personal data is stored.**

## Testing Without API Key

The system includes placeholder responses for development/testing without an API key:
- Pre-written sample questions
- Sample reflection report
- All UI interactions work

To test:
1. Visit `/reflection`
2. Click "Diyaloğa Başla"
3. Type any message
4. Observe placeholder responses

## Production Deployment

### Environment Variables

Set in your hosting platform:
- `OPENAI_API_KEY` or `ANTHROPIC_API_KEY`

### Analytics File

The system creates `analytics.json` in the project root. Make sure:
- It's in `.gitignore` (already configured)
- Your hosting platform has write permissions

## Customization

### Modify Questions

Edit the `SYSTEM_PROMPT` in `app/api/chat/route.ts` to:
- Change question focus areas
- Adjust conversation length
- Modify report format

### Change Report Format

Update the report template in `SYSTEM_PROMPT` section 5.

### Add More Programs

Currently supports NPL and LIR. To add NL or PIL:
1. Update `SYSTEM_PROMPT` with new program info
2. Update TypeScript types for program field
3. Update analytics tracking

## Troubleshooting

### "API anahtarı yapılandırılmadı" Error

- Check `.env.local` file exists
- Verify API key format
- Restart development server after adding env vars

### Analytics Not Working

- Check file write permissions
- Verify `analytics.json` is not read-only
- Check server logs for errors

### AI Responses Not Working

- Verify API key is valid
- Check API endpoint is correct
- Review server logs for API errors
- Test with placeholder mode first

## Next Steps

After initial setup:
1. Test conversation flow thoroughly
2. Refine system prompt based on test conversations
3. Add programs page links to chatbot
4. Consider adding download/email for reports
5. Monitor analytics for usage patterns

## Support

For issues or questions, contact the development team.

---

**Built with intention** 🌿
