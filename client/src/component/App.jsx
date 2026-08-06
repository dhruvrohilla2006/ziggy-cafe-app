import AppRouter from "./AppRouter";
// import AuthStore from "../stores/authStore";
// import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
export default function App() {
  // const { loading } = AuthStore();

  // useEffect(() => {
  //   if (loading) toast.loading("Loading");
  // }, [loading]);

  return (
    <>
      {" "}
      <Toaster position="top-right" />
      <AppRouter />
    </>
  );
}
