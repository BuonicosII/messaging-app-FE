export async function userLogged() {
  if (localStorage.getItem("token")) {
    const userJson = await fetch("http://localhost:3000/users/user", {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });

    const user = await userJson.json();

    return user;
  } else {
    return null;
  }
}
