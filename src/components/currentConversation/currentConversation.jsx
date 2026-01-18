import { useEffect, useState } from "react";

export default function CurrentConversation({ currentConversationId }) {
  const [conversationMessages, setConversationMessages] = useState([]);
  const [errMsg, setErrMsg] = useState();
  const [message, setMessage] = useState();

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

  function formUpdate(e) {
    e.preventDefault();

    const newMessage = {
      ...message,
      content: document.querySelector("#content").value,
      conversation_id: document.querySelector("#conversation_id").value,
    };

    if (errMsg !== null) {
      setErrMsg(null);
    }

    setMessage(newMessage);
  }

  async function formSubmit(e) {
    e.preventDefault();
    try {
      await fetch(`http://${import.meta.env.VITE_BACKEND}/messages/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: JSON.stringify(message),
      });

      setMessage(null);
    } catch (error) {
      console.log(error);
    }
  }

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
      <br></br>
      <form onSubmit={formSubmit}>
        <textarea
          name="content"
          id="content"
          onChange={formUpdate}
          value={message ? message.content : ""}
        ></textarea>
        <input
          type="hidden"
          id="conversation_id"
          value={currentConversationId}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
