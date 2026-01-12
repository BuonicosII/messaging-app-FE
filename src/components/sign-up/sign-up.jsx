import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [errMsg, setErrMsg] = useState();

  function formUpdate(e) {
    e.preventDefault();

    const newUser = {
      ...user,
      username: document.querySelector("#username").value,
      password: document.querySelector("#password").value,
      passwordConfirm: document.querySelector("#passwordConfirm").value,
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
        `http://${import.meta.env.VITE_BACKEND}/users/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        }
      );

      const res = await json.json();
      if (Array.isArray(res)) {
        console.log(res[0].msg);
        setErrMsg(res[0]);
      } else {
        navigate("/log-in");
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
          id="username"
          name="username"
          onChange={formUpdate}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={formUpdate}
        />
        <label htmlFor="passwordConfirm">Password Confirm</label>
        <input
          type="password"
          id="passwordConfirm"
          name="passwordConfirm"
          onChange={formUpdate}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
