import { createContext } from "react";

const UserContext = createContext({
  user: JSON.parse(localStorage.getItem("user")) || null,
});

export default UserContext;
