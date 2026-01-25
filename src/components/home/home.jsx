import { useLoaderData, Link } from "react-router-dom";
import { useState } from "react";
import CurrentConversation from "../currentConversation/currentConversation";
import Header from "../headers/header";
import style from "./home.module.css";

export default function Home() {
  const user = useLoaderData()[0];
  const userConversations = useLoaderData()[1];
  const [currentConversationId, setCurrentConversationId] = useState(
    userConversations[0].id
  );

  if (user) {
    return (
      <>
        <Header user={user} />
        <main>
          <div id={style.leftpanel}>
            {userConversations.map((conversation) => {
              return (
                <div
                  className={style.conversationDiv}
                  onClick={() => {
                    setCurrentConversationId(conversation.id);
                  }}
                  key={conversation.id}
                >
                  {conversation.name ??
                    conversation.owners.filter((owner) => owner !== user.id)[0]
                      .username}
                </div>
              );
            })}
          </div>
          <CurrentConversation currentConversationId={currentConversationId} />
        </main>
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
