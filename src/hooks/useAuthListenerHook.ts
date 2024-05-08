import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "../../firebase";
import { Navigation } from "../types";

export const useAuthListenerHook = (navigation: Navigation) => {
  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        navigation.navigate("Main");
      }
    });
  }, []);
};
