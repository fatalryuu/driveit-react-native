import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebase";
import { Navigation } from "../types";

export const useAuthListenerHook = (navigation: Navigation) => {
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        navigation.navigate("Main");
      }
    });
  }, []);
};
