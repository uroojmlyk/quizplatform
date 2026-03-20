import { NextRequest, NextResponse } from 'next/server';

const GROQ_API_KEY = process.env.GROQ_API_KEY || '';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export async function POST(req: NextRequest) {
  try {
    const { topic, numberOfQuestions, difficulty } = await req.json();

    if (!topic) {
      return NextResponse.json({ success: false, error: 'Topic is required' }, { status: 400 });
    }

    if (!GROQ_API_KEY) {
      return NextResponse.json({ success: false, error: 'API key not configured' }, { status: 500 });
    }

    const count = numberOfQuestions || 5;
    const level = difficulty || 'medium';

    const prompt = `Generate ${count} multiple choice quiz questions about "${topic}" with ${level} difficulty level.

Return ONLY a valid JSON array with no extra text, markdown, or explanation. Format:
[
  {
    "text": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctOption": 0,
    "marks": 10
  }
]

Rules:
- correctOption is the index (0-3) of the correct answer in options array
- All 4 options must be distinct and plausible
- Questions must be clear and educational
- Return ONLY the JSON array, nothing else`;

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 2048,
      })
    });

    if (!response.ok) {
      const errData = await response.json();
      console.error('Groq API error:', errData);
      return NextResponse.json({ success: false, error: 'AI API request failed' }, { status: 500 });
    }

    const data = await response.json();
    const rawText = data?.choices?.[0]?.message?.content || '';

    const cleaned = rawText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    let questions;
    try {
      questions = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error('JSON parse error:', parseErr, 'Raw:', rawText);
      return NextResponse.json({ success: false, error: 'Failed to parse AI response' }, { status: 500 });
    }

    const questionsWithIds = questions.map((q: any, i: number) => ({
      id: `q_ai_${Date.now()}_${i}`,
      text: q.text || '',
      options: q.options || ['', '', '', ''],
      correctOption: q.correctOption ?? 0,
      marks: q.marks || 10,
    }));

    return NextResponse.json({ success: true, questions: questionsWithIds });

  } catch (error: any) {
    console.error('Generate questions error:', error?.message || error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}