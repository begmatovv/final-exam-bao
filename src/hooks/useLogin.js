import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "./useRegister";

export function useLogin() {
  const dispatch = useDispatch();
  const signin = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        dispatch(login({ email: data.email, password: data.password }));
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return { signin };
}
