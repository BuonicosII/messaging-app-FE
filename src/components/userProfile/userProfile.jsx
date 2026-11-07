import { useLoaderData, Link, Form } from "react-router-dom";
import { useState } from "react";
import Header from "../headers/header";
import style from "./userProfile.module.css";

export default function Profile() {
  const user = useLoaderData();

  //field edit enabling states
  const [editUsrnm, setEditUsrnm] = useState(false);
  const [editAvtr, setEditAvtr] = useState(false);
  const [editPwd, setEditPwd] = useState(false);

  //username field edit update and submit states
  const [userName, setUserName] = useState(user.username);
  const [userNameErrMsg, setuserNameErrMsg] = useState();

  function usernameUpdate(e) {
    e.preventDefault();

    const newUsername = {
      username: document.querySelector("#username").value,
    };

    if (userNameErrMsg !== null) {
      setuserNameErrMsg(null);
    }

    setUserName(newUsername.username);
  }

  return (
    <>
      <Header user={user} />
      <main>
        <div id={style.userInfoWrapper}>
          <div id={style.userInfo}>
            <div className={style.editableField}>
              {!editUsrnm ? (
                <>
                  <h1>{user.username}</h1>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    className={style.svgPen}
                    onClick={() => {
                      setEditUsrnm(!editUsrnm);
                      setEditAvtr(false);
                      setEditPwd(false);
                    }}
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path
                      fill="currentColor"
                      d="M4.2 20.975q-.525.125-.913-.262t-.262-.913l.875-4.25l4.55 4.55zm5.875-2.1l-4.95-4.95L15.45 3.6q.575-.575 1.425-.575T18.3 3.6l2.1 2.1q.575.575.575 1.425T20.4 8.55z"
                    />
                  </svg>
                </>
              ) : (
                <>
                  <input
                    id="username"
                    name="username"
                    value={userName}
                    onChange={usernameUpdate}
                  ></input>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <g
                      fill="none"
                      stroke="#00af0c"
                      stroke-linecap="round"
                      stroke-width="1.5"
                    >
                      <path d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C12.3415 2 12.5122 2 12.6858 2.01515C13.4951 2.08581 14.2874 2.414 14.9097 2.93631C15.0431 3.04835 15.1668 3.17206 15.4142 3.41944L20.5806 8.58578C20.828 8.83317 20.9516 8.95687 21.0637 9.09034C21.586 9.71257 21.9142 10.5049 21.9848 11.3142C22 11.4878 22 11.6585 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22Z" />
                      <path d="M17 21.8731V21C17 19.1144 17 18.1716 16.4142 17.5858C15.8284 17 14.8856 17 13 17H11C9.11438 17 8.17157 17 7.58579 17.5858C7 18.1716 7 19.1144 7 21V21.8731" />
                      <path d="M7 8H13" />
                    </g>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    onClick={() => {
                      setEditUsrnm(!editUsrnm);
                      setEditAvtr(false);
                      setEditPwd(false);
                      setUserName(user.username);
                    }}
                  >
                    <path
                      fill="none"
                      stroke="#af0000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M18 6L6 18M6 6l12 12"
                    />
                  </svg>
                </>
              )}
            </div>
            <div className={style.editableField}>
              <img id={style.avatarBig} src={user.avatar} alt="" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className={style.svgPen}
                onClick={() => {
                  setEditAvtr(!editAvtr);
                  setEditUsrnm(false);
                  setEditPwd(false);
                }}
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  fill="currentColor"
                  d="M4.2 20.975q-.525.125-.913-.262t-.262-.913l.875-4.25l4.55 4.55zm5.875-2.1l-4.95-4.95L15.45 3.6q.575-.575 1.425-.575T18.3 3.6l2.1 2.1q.575.575.575 1.425T20.4 8.55z"
                />
              </svg>
            </div>
            {!editPwd ? (
              <button
                onClick={() => {
                  setEditPwd(!editPwd);
                  setEditUsrnm(false);
                  setEditAvtr(false);
                }}
              >
                Change Password
              </button>
            ) : (
              <form>
                <input type="passsword" name="oldPassword" id="oldPassword" />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" />
                <label htmlFor="passwordConfirm">Password Confirm</label>
                <input
                  type="password"
                  id="passwordConfirm"
                  name="passwordConfirm"
                />
                <button type="submit">Submit</button>
              </form>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
