// Example of a valid API route in Next.js

import { NextRequest } from 'next/server';

// Mocked data fetching (replace with your actual logic)
const getChatHistory = async () => {
  // Simulating a fetch or database query
  return [{ id: '1', content: 'Hello' }, { id: '2', content: 'How are you?' }];
};

export async function GET(request: NextRequest) {
  try {
    const chatHistory = await getChatHistory(); // Replace with real data fetching
    return new Response(JSON.stringify({ chats: chatHistory }), { status: 200 });
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return new Response('Failed to fetch chat history', { status: 500 });
  }
}
