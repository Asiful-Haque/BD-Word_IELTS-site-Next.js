import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export async function POST(request) {
  try {
    const body = await request.json();
    const { answer, taskType } = body;

    const data = {
      model: 'deepseek/deepseek-r1-zero:free',
      messages: [
        {
          role: 'user',
          content: `You're an IELTS writing evaluator. Analyze this answer for "${taskType}" and give a detailed score out of 9, feedback on grammar, vocabulary, coherence, and structure:\n\n${answer}.
          In response you will return a json object with following keys "score" and "feedback". 
          like 
          {
            "score": 7,
            "feedback": {
              ...
            }
          }`,
        },
      ],
    };

    const headers = {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    };

    const response = await axios.post(API_URL, data, { headers });

console.log('Full AI Raw Response:', response.data);

const choices = response?.data?.choices;
if (!choices || choices.length === 0) {
  return new Response(JSON.stringify({ error: 'No choices returned from AI', rawResponse: response.data }), {
    status: 500,
    headers: { 'Content-Type': 'application/json' },
  });
}


    const aiFeedback = choices[0]?.message?.content;

    return new Response(JSON.stringify({ feedback: aiFeedback }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('AI Error:', error.response?.data || error.message);
    return new Response(JSON.stringify({ error: 'Failed to fetch AI feedback' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
