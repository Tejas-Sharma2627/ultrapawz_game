import { doc, addDoc, getDocs, updateDoc } from "firebase/firestore";
import { colRef, db } from "../firebase";

export const getStoredCode=async(email)=> {
    let userCode;
  await getDocs(colRef)
    .then((snapshot) => {
      snapshot.docs.forEach((docdata) => {
        console.log(email," -> ",docdata.data().email)
        if (email === docdata.data().email) {
          userCode = docdata.data().code;
        }
      });
    })
    .catch((err) => console.log(err));
    return userCode;
}
