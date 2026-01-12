import { useLoaderData, Link } from "react-router-dom";

export default function Home() {
  const user = useLoaderData();

  if (user) {
    return <>Hi {user.username}</>;
  } else {
    return (
      <>
        <Link to="/signup">
          <button>Sign up</button>
        </Link>
        or
        <button>Login</button>
      </>
    );
  }
}
