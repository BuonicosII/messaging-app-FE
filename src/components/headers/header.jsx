import style from "./header.module.css";
import { useState } from "react";

export default function Header({ user }) {
  const [open, setOpen] = useState(false);
  return (
    <header>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 24 24"
        onClick={() => {
          setOpen(!open);
        }}
      >
        {!open ? (
          <path
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-width="1.5"
            d="M20 7H4m16 5H4m16 5H4"
          />
        ) : (
          <path
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M18 6L6 18M6 6l12 12"
          />
        )}
      </svg>
    </header>
  );
}
