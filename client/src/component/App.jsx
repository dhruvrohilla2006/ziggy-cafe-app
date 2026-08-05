import AppRouter from "./AppRouter";
import AuthStore from "../stores/authStore";
import { useEffect } from "react";
export default function App() {
  const { check, authenticated } = AuthStore();

 

  return <AppRouter />;
}
