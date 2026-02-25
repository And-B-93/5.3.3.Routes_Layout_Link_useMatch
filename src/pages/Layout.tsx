import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

const Lyaout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export { Lyaout };
