import { useLoaderData, Link } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  const user = useLoaderData()[0];
  const userConversations = useLoaderData()[1];
  const [currentConversation, setCurrentConversation] = useState(null);

  if (user) {
    return (
      <>
        Hi {user.username}
        {userConversations.map((conversation) => {
          return (
            <div
              onClick={() => {
                setCurrentConversation(conversation.id);
              }}
            >
              {conversation.name ??
                conversation.owners.filter((owner) => owner !== user.id)[0]
                  .username}
            </div>
          );
        })}
      </>
    );
  } else {
    return (
      <>
        <Link to="/signup">
          <button>Sign up</button>
        </Link>
        or
        <Link to="/login">
          <button>Login</button>
        </Link>
      </>
    );
  }
}
