import { useEffect, useState } from "react";

export default function CurrentConversation({ currentConversationId }) {
  const [conversationMessages, setConversationMessages] = useState([]);
  const [errMsg, setErrMsg] = useState();
  const [message, setMessage] = useState();
  const [messageId, setmessageId] = useState();
  const [deleteId, setDeleteId] = useState();

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
      content: document.querySelector("#content").value,
    };

    if (errMsg !== null) {
      setErrMsg(null);
    }

    setMessage(newMessage);
  }

  async function deleteMessage() {
    try {
      await fetch(`http://${import.meta.env.VITE_BACKEND}/messages/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: JSON.stringify({ message_id: deleteId }),
      });

      setDeleteId(null);
    } catch (error) {
      console.log(error);
    }
  }

  async function formSubmit(e) {
    e.preventDefault();
    try {
      await fetch(
        messageId
          ? `http://${import.meta.env.VITE_BACKEND}/messages/update`
          : `http://${import.meta.env.VITE_BACKEND}/messages/create`,
        {
          method: messageId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
          body: JSON.stringify(
            messageId
              ? { ...message, message_id: messageId }
              : { ...message, conversation_id: currentConversationId }
          ),
        }
      );

      setMessage(null);

      if (messageId) {
        setmessageId(null);
      }
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
            {messageId === message.id ? (
              <button
                onClick={() => {
                  setmessageId(null);
                  setMessage(null);
                }}
              >
                Close
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    if (!deleteId) {
                      setmessageId(message.id);
                      setMessage({ content: message.content });
                    }
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (!messageId || !deleteId) {
                      setDeleteId(message.id);
                    }
                  }}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        );
      })}
      {deleteId && (
        <div>
          <button
            onClick={() => {
              setDeleteId(null);
            }}
          >
            Cancel
          </button>
          <button onClick={deleteMessage}>Delete</button>
        </div>
      )}
      <br></br>
      <form onSubmit={formSubmit}>
        <textarea
          name="content"
          id="content"
          onChange={formUpdate}
          value={message ? message.content : ""}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
