import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage"
const crypto = require('crypto');

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {




    useEffect(() => fetchData(), [])
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const [isDelete, setIsDelete] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [urlLink, setUrlLink] = useState()
    const [detail, setDetail] = useState('')
    const storageRef = firebase.storage().ref()
    const [fileRef, setFileRef] = useState('')


    const jobsRef = firebase.firestore().collection('jobs');
    const [jobs, setJobs] = useState([])

    async function fetchData(path) {
        if (path === "/DashBoard") {
            const snapshot = await jobsRef.where('email', '==', currentUser.email).get();
            const data = []
            snapshot.forEach(doc => {
                var temp = doc.data()
                temp.docId = doc.id
                data.push(temp)
            });
            setJobs(data)
        } else {
            const snapshot = await jobsRef.get()
            const data = []
            snapshot.forEach(doc => {
                var temp = doc.data()
                temp.docId = doc.id
                data.push(temp)
            });
            setJobs(data)
        }
    }

    function AddJob() {
        setIsAdd(!isAdd)
    }

    function jobDetails(docId) {
        jobsRef.doc(docId).get().then((doc) => {
            if (doc.exists) {
                const details = doc.data();

                return details
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        })
    }

    function logIn(email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password)



    }

    function signUp(email, password) {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }

    function Delete() {
        setIsDelete(!isDelete)
    }

    function logOut() {
        setIsAdd(false)
        return firebase.auth().signOut();
    }

    function resetPassword(email) {
        return firebase.auth().sendPasswordResetEmail(email);
    }

    async function deleteDoc(docId) {
        await jobsRef.doc(docId).delete();

    }

    async function update(value, docId, field) {
        const updateRef = jobsRef.doc(docId);
        console.log(value, docId, field)
        if (field === "overview") {
            await updateRef.update({ overview: value });
        } else if (field === "requirement") {
            await updateRef.update({ requirement: value });
        } else if (field === "experience") {
            await updateRef.update({ experience: value });
        } else if (field === "position") {
            await updateRef.update({ position: value });
        } else if (field === "type") {
            await updateRef.update({ type: value });
        } else if (field === "salary") {
            await updateRef.update({ salary: value });
        } else if (field === "company") {
            await updateRef.update({ company: value });
        } else if (field === "title") {
            await updateRef.update({ title: value });
        } else if (field === "location") {
            await updateRef.update({ location: value });
        } else if (field === "logo") {
            await updateRef.update({ logo: value });
        }
        fetchDoc(docId)

    }


    async function fetchDoc(docId) {
        await jobsRef.doc(docId).get().then((doc) => {
            doc.exists ? setDetail(doc.data()) :
                console.log("No such document!");
        })
    }

    async function addDoc(data) {
        await jobsRef.doc().set(data);
        fetchData()

        setIsAdd(!isAdd)
    }

    function uploadFile(e) {

        const fileHash = crypto.createHash('sha1').update(e.target.value).digest('hex');
        const file = e.target.files[0]
        const fileReference = storageRef.child(currentUser.email + "/" + fileHash)
        fileReference.put(file).then(() => (
            fileReference.getDownloadURL()
            .then((url) => {
                setUrlLink(url)
                setFileRef(fileHash)
            })
            .catch((error) => {
                console.log(error)
            })
        ))

    }
    async function deleteImage(prevURL) {
        console.log(prevURL)
        var desertRef = storageRef.child(currentUser.email + "/" + fileRef);

        // Delete the file
        desertRef.delete().then(() => {
            console.log("Image deleted")
        }).catch((error) => {
            // Uh-oh, an error occurred!
        });

    }

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })
        return unsubscribe;
    }, [])

    const value = {
        currentUser,
        signUp,
        logIn,
        logOut,
        resetPassword,
        addDoc,
        jobDetails,
        deleteDoc,
        fetchData,
        jobs,
        isDelete,
        Delete,
        isAdd,
        AddJob,
        uploadFile,
        urlLink,
        update,
        detail,
        fetchDoc,
        deleteImage,
        fileRef
    }

    return ( <
        AuthContext.Provider value = { value } > {!loading && children } <
        /AuthContext.Provider>
    )
}