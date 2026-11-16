import { useLoaderData, Link, Form } from "react-router-dom";
import { useState } from "react";
import Header from "../headers/header";
import style from "./userProfile.module.css";
import UserName from "./userName";
import UserAvatar from "./userAvatar";

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
              <UserAvatar
                user={user}
                editAvtr={editAvtr}
                setEditUsrnm={setEditUsrnm}
                setEditAvtr={setEditAvtr}
                setEditPwd={setEditPwd}
              />
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
