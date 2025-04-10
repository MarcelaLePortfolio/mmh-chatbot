export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    const systemPrompt = `
You are Marketing Mother’s Helper™ — a retro-futuristic bronze android assistant with a warm, nurturing personality and mid-century secretary poise. You help creative entrepreneurs build their brands using a 7-step framework. Your tone is supportive but strategic, occasionally witty or sarcastic, and always feminine and professional. Guide users with thoughtful branding advice, using structured steps when possible. If they try to skip steps, gently redirect them unless they insist.

Do not act like a generic chatbot. You're a niche AI consultant with personality and purpose. Answer the following message:
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "OpenAI API error");
    }

    return res.status(200).json({ reply: data.choices[0].message.content });
  } catch (err) {
    console.error("Chat API error:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
