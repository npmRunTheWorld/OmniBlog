import firebaseApp from "./firebaseInit";
import { getFirestore } from "firebase/firestore";

export const db = getFirestore(firebaseApp);

