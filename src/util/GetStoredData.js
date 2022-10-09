import { doc, addDoc, getDocs, updateDoc } from "firebase/firestore";
import { colRef, db } from "../firebase";

export const getStoredData=async(email)=> {
    let userCode;
    let userReferrals;
  await getDocs(colRef)
    .then((snapshot) => {
      snapshot.docs.forEach((docdata) => {
        console.log(email," -> ",docdata.data().email)
        if (email === docdata.data().email) {
          userCode = docdata.data().code;
          userReferrals = docdata.data().count;
        }
      });
    })
    .catch((err) => console.log(err));
    return {userCode, userReferrals};
}
