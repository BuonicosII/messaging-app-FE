import { useLoaderData } from "react-router-dom";

export default function Home() {
  const data = useLoaderData();

  return <>Hi, my name is {data.name}</>;
}
