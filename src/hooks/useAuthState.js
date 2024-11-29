import { useSelector } from "react-redux";

export const useAuthState = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const authError = useSelector((state) => state.auth.error);
  return {
    isAuthLoading:
      authStatus === "loading" || authStatus === "idle" ? true : false,
    isAuthError: authError === null ? false : true,
  };
};

// export const useGptAuthState = () => {

// }
