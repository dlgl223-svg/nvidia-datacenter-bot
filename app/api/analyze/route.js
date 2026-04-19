export async function POST(request) {
  const { question, context } = await request.json();

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      max_tokens: 300,
      messages: [
        {
          role: 'system',
          content: `You are a senior product manager at a major tech company analyzing GPU datacenter competitive positioning. Be concise, sharp, and insight-driven. Use the data provided. Max 3-4 sentences.`,
        },
        {
          role: 'user',
          content: `Here is the competitive data:\n${context}\n\nQuestion: ${question}`,
        },
      ],
    }),
  });

  const data = await response.json();
  const answer = data.choices?.[0]?.message?.content || 'No response.';
  return Response.json({ answer });
}
