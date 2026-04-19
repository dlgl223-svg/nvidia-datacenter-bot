export async function POST(request) {
  const { question, context } = await request.json();

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      messages: [
        {
          role: 'user',
          content: `You are a senior product manager analyzing GPU datacenter competitive positioning. Be concise and insight-driven. Max 3-4 sentences.\n\nData:\n${context}\n\nQuestion: ${question}`,
        },
      ],
    }),
  });

export async function POST(request) {
  const { question, context } = await request.json();

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      messages: [
        {
          role: 'user',
          content: `You are a senior product manager analyzing GPU datacenter competitive positioning. Be concise and insight-driven. Max 3-4 sentences.\n\nData:\n${context}\n\nQuestion: ${question}`,
        },
      ],
    }),
  });

  const data = await response.json();
  const answer = data.content?.[0]?.text || 'No response.';
  return Response.json({ answer });
}
