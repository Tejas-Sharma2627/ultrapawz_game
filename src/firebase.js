import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDetu6jg8jhllh_MF8hP6w_uH8HmHWzYmg",
  authDomain: "ultrapawz-slot-game.firebaseapp.com",
  projectId: "ultrapawz-slot-game",
  storageBucket: "ultrapawz-slot-game.appspot.com",
  messagingSenderId: "452314649671",
  appId: "1:452314649671:web:08f7720fa5162d21170d62",
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore();

export const colRef = collection(db, "referal-codes");

// getDocs(colRef)
//   .then((snapshot) => {
//     console.log(snapshot.docs);
//     let referrals = [];
//     snapshot.docs.forEach((doc) => {
//       referrals.push({ ...doc.data(), id: doc.id });
//     });
//     console.log(referrals);
//   })
//   .catch((err) => console.log(err));



export const auth = getAuth(app);

export default app;
