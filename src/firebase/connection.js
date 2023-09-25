import firebaseApp from "./firebaseInit";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp); // gives defauls storage bucket
