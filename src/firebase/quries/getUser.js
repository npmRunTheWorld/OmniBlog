import {  getDocs, setDoc , doc ,collection, query, where } from "firebase/firestore";
import { db } from "../connection";

export async function getUser(id){
 try{
   const userData = collection(db, "users");
   const user = query(userData, where("uid", "==", id));
   const userSnapshot = await getDocs(user);
   return userSnapshot;
 
 }catch(error){
   
   console.log(error);
   return error;
 }
 
}


export async function getDocId(id){
   try{
      const col = collection(db, "users");
      const userDoc = query(col, where("uid", "==", id));
      const userDocSnapshot = await getDocs(userDoc);
      let docId;
      userDocSnapshot.forEach((doc) => {
      
         docId = doc.id;
      })
      
      return docId;
      
   }catch(error){
      console.log(error)
      
   }
}

export async function setUser(id, newData){
 const docRef = await getDocId(id);
 const userRef = doc(db, "users", docRef);
 setDoc(userRef, newData, { merge : true });
 
}