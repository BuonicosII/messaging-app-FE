import { useLoaderData, Link, Form } from "react-router-dom";
import { useState } from "react";
import Header from "../headers/header";
import style from "./userProfile.module.css";
import UserName from "./userName";

export default function Profile() {
  const user = useLoaderData();

  //field edit enabling states
  const [editUsrnm, setEditUsrnm] = useState(false);
  const [editAvtr, setEditAvtr] = useState(false);
  const [editPwd, setEditPwd] = useState(false);

  return (
    <>
      <Header user={user} />
      <main>
        <div id={style.userInfoWrapper}>
          <div id={style.userInfo}>
            <div className={style.editableField}>
              <UserName
                user={user}
                editUsrnm={editUsrnm}
                setEditUsrnm={setEditUsrnm}
                setEditAvtr={setEditAvtr}
                setEditPwd={setEditPwd}
              />
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
