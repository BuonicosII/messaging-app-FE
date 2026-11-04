import { useLoaderData, Link } from "react-router-dom";
import { useState } from "react";
import Header from "../headers/header";
import style from "./userProfile.module.css";

export default function Profile() {
  const user = useLoaderData();
  const [editUsrnm, setEditUsrnm] = useState(false);
  const [editAvtr, setEditAvtr] = useState(false);
  const [editPwd, setEditPwd] = useState(false);

  return (
    <>
      <Header user={user} />
      <main>
        <div id={style.userInfoWrapper}>
          <div id={style.userInfo}>
            <div>
              {!editUsrnm ? (
                <h1>{user.username}</h1>
              ) : (
                <input value={user.username}></input>
              )}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
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
            </div>
            <div>
              <img id={style.avatarBig} src={user.avatar} alt="" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
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
            <button
              onClick={() => {
                setEditPwd(!editPwd);
                setEditUsrnm(false);
                setEditAvtr(false);
              }}
            >
              Change Password
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
