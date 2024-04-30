import { createContext, useContext } from "react";

const TokenContext = createContext(null);
export default TokenContext;

export const TokenState = () => {
  return useContext(TokenContext);
}