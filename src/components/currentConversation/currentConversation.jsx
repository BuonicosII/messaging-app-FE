import { useEffect, useState } from "react";

export default function CurrentConversation({ currentConversationId }) {
  const [conversationMessages, setConversationMessages] = useState([]);

  useEffect(() => {
    (async () => {
      const conversationJson = await fetch(
        `http://${
          import.meta.env.VITE_BACKEND
        }/conversations/get_conversation/${currentConversationId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      const conversation = await conversationJson.json();
      setConversationMessages(conversation.messages);
    })();
  });
  return (
    <>
      {conversationMessages.map((message) => {
        return (
          <div key={message.id}>
            {message.user.username}
            {message.content}
          </div>
        );
      })}
    </>
  );
}
