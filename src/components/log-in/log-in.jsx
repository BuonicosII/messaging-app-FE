import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [errMsg, setErrMsg] = useState();

  function formUpdate(e) {
    e.preventDefault();

    const newUser = {
      ...user,
      password: document.querySelector("#password").value,
      username: document.querySelector("#username").value,
    };

    if (errMsg !== null) {
      setErrMsg(null);
    }

    setUser(newUser);
  }

  async function formSubmit(e) {
    e.preventDefault();
    try {
      const json = await fetch(
        `http://${import.meta.env.VITE_BACKEND}/users/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        }
      );
      const res = await json.json();

      if (typeof res === "string") {
        console.log(res);
        setErrMsg(res);
      } else {
        localStorage.setItem("token", JSON.stringify(res.token));
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <form onSubmit={formSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={formUpdate}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={formUpdate}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
