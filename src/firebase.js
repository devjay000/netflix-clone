
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyC_mVHN44UE2kP5Btyh3_oottsMSBj3FGI",
    authDomain: "netflix-clone-991d4.firebaseapp.com",
    projectId: "netflix-clone-991d4",
    storageBucket: "netflix-clone-991d4.appspot.com",
    messagingSenderId: "1036053878921",
    appId: "1:1036053878921:web:7d86e2cb15ef761cb5ce58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app); //authentication
const db=getFirestore(app); //database

const signup=async(name,email,password)=>{
    try {
        const res=await createUserWithEmailAndPassword(auth,email,password)
        const user=res.user;
        await addDoc(collection(db,"users"),{
            uid:user.uid,
            name,
            authProvider:"local",
            email,
    })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login=async(email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout=()=>{
    signOut(auth);
}

export {auth,db,login,signup,logout};
