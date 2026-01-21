import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface AnalyticsEvent {
  event: 'conversation_started' | 'conversation_completed' | 'conversation_abandoned';
  timestamp: string;
  sessionId: string;
  program?: 'NPL' | 'LIR';
}

const ANALYTICS_FILE = path.join(process.cwd(), 'analytics.json');

// Simple file-based analytics (no user data stored)
function logEvent(event: AnalyticsEvent) {
  try {
    let analytics: AnalyticsEvent[] = [];
    
    // Read existing analytics if file exists
    if (fs.existsSync(ANALYTICS_FILE)) {
      const data = fs.readFileSync(ANALYTICS_FILE, 'utf-8');
      analytics = JSON.parse(data);
    }

    // Add new event
    analytics.push(event);

    // Write back to file
    fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(analytics, null, 2));
  } catch (error) {
    console.error('Analytics logging error:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const event: AnalyticsEvent = await request.json();
    logEvent(event);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      { error: 'Failed to log event' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    if (!fs.existsSync(ANALYTICS_FILE)) {
      return NextResponse.json({
        totalConversations: 0,
        completedConversations: 0,
        abandonedConversations: 0
      });
    }

    const data = fs.readFileSync(ANALYTICS_FILE, 'utf-8');
    const events: AnalyticsEvent[] = JSON.parse(data);

    const stats = {
      totalConversations: events.filter(e => e.event === 'conversation_started').length,
      completedConversations: events.filter(e => e.event === 'conversation_completed').length,
      abandonedConversations: events.filter(e => e.event === 'conversation_abandoned').length,
      nplRecommendations: events.filter(e => e.event === 'conversation_completed' && e.program === 'NPL').length,
      lirRecommendations: events.filter(e => e.event === 'conversation_completed' && e.program === 'LIR').length
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Analytics retrieval error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve analytics' },
      { status: 500 }
    );
  }
}
