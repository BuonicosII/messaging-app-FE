import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./userProfile.module.css";
import PropTypes from "prop-types";

export default function UserAvatar({
  user,
  editAvtr,
  setEditUsrnm,
  setEditAvtr,
  setEditPwd,
}) {
  const [userNameErrMsg, setuserNameErrMsg] = useState();
  const navigate = useNavigate();
  async function avatarSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("files", e.target.files?.[0] || null);

    try {
      await fetch(`http://${import.meta.env.VITE_BACKEND}/users/avatar`, {
        method: "POST",
        headers: {
          //"Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: formData,
      });
      setEditUsrnm(false);
      setEditAvtr(false);
      setEditPwd(false);

      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <img
        id={style.avatarBig}
        src={
          user.avatar !== "" && user.avatar
            ? user.avatar
            : "https://cdn.openinary.dev/b/9758b483-0c6e-4833-97cb-8170374437a3/t/w_200,h_200,c_fill/products/clarity--avatar-solid.png"
        }
        alt=""
      />
      <label htmlFor="avatar">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          className={style.svgPen}
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            fill="currentColor"
            d="M4.2 20.975q-.525.125-.913-.262t-.262-.913l.875-4.25l4.55 4.55zm5.875-2.1l-4.95-4.95L15.45 3.6q.575-.575 1.425-.575T18.3 3.6l2.1 2.1q.575.575.575 1.425T20.4 8.55z"
          />
        </svg>
      </label>
      <input type="file" id="avatar" name="avatar" onChange={avatarSubmit} />
    </>
  );
}

UserAvatar.PropTypes = {
  user: PropTypes.object,
  editAvtr: PropTypes.bool,
  setEditUsrnm: PropTypes.func,
  setEditAvtr: PropTypes.func,
  setEditPwd: PropTypes.func,
};
