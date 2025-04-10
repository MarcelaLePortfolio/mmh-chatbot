'use client'; // Ensures this is a client-side component in Next.js 13+

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';  // Correct import for route params in App Router

export default function ChatPage() {
  const { id } = useParams();  // Get chat ID from URL params
  const [chatData, setChatData] = useState(null);

  useEffect(() => {
    // Fetch chat data based on the ID from params
    fetch(`/api/chat/${id}`)
      .then((res) => res.json())
      .then((data) => setChatData(data))
      .catch((err) => console.error('Error fetching chat:', err));
  }, [id]);

  if (!chatData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Chat {id}</h1>
      <div>{chatData.content}</div>
    </div>
  );
}
