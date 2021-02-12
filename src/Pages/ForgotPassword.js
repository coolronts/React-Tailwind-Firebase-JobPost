import React, { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import "firebase/auth";
import { Link } from "react-router-dom";


const classes = {
    body: 'bg-grey-lighter h-screen font-sans',
    mainContent: 'container mx-auto h-full flex justify-center items-center',
    content: 'w-1/3',
    heading: 'font-medium mb-6 text-center text-4xl',
    card: 'border-3 border-green-300 py-6 px-8 bg-white m-1 rounded-lg shadow-lg',
    label: 'font-bold text-grey-darker block mb-2',
    input: 'block w-full bg-white border border-grey-light hover:border-green-300 px-2 py-2 rounded shadow',
    buttonArea:'flex justify-center mt-2',
    button: 'bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded ',
    hasAccountArea: 'flex justify-center',
    hasAccount: 'text-xs font-bold mt-4',
    link: 'text-blue-600',
    error: 'bg-red-400 text-white text-center rounded-md py-1 font-medium',
    logInArea: 'flex justify-center mt-2',
    logIn:'text-md font-bold text-blue-600 underline tracking-wider'
}

const ForgotPassword = () => {
    const emailRef = useRef();
    const [error, setError] = useState('');
    const [message,setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { resetPassword } = useAuth();
    
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setMessage("")
            setError("");
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage('Check your email for further instructions')
        }
        catch {
            setError('Failed to Reset Password');
            setLoading(false);
        }        
    }

    return (
        <>
            <div className={classes.body}>
                <div className={classes.mainContent}>
                    <div className={classes.content}>
                        
                        <div className={classes.card}>
                            <h1 className={classes.heading}> Reset Password </h1>
                            {error && <div className={classes.error}>{error}</div>} 
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className={classes.label}>Email </label>
                                    <input type="email" name="email" ref={emailRef} autofocus id="userEmail"  className={classes.input} placeholder="Your Email" required/>
                                </div>

                               <div className={classes.buttonArea}>
                                    <button disabled={loading} type="submit" className={classes.button}>Reset Password</button>
                                </div>
                            </form>
                            <div className={classes.logInArea}>
                                <Link className={classes.logIn} to="/LogIn">Log In</Link>
                            </div>
                        </div>
                        <div className={classes.hasAccountArea}>
                            <p className={classes.hasAccount}>Don't Have an Account? <Link className={classes.link} to="/SignUp">Sign Up</Link> </p>
                        </div> 
                    </div>
                </div>
            </div>
        </>
        )
}

export default ForgotPassword