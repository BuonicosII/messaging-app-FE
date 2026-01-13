export async function userLogged() {
  if (localStorage.getItem("token")) {
    const userJson = await fetch(
      `http://${import.meta.env.VITE_BACKEND}/users/user`,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );

    const user = await userJson.json();

    return user;
  } else {
    return null;
  }
}

export async function userConversations() {
  if (localStorage.getItem("token")) {
    const userConversationsJson = await fetch(
      `http://${
        import.meta.env.VITE_BACKEND
      }/conversations/get_user_conversations`,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );

    const userConversations = await userConversationsJson.json();

    return userConversations;
  } else {
    return null;
  }
}
