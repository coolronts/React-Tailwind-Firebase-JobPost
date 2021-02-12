import React, { useState, useRef } from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom'
import TextInput from './UI/TextInput'

const classes = {
    body: 'bg-grey-lighter h-screen font-sans',
    mainContent: 'container mx-auto h-full flex justify-center items-center',
    content: 'w-1/3',
    heading: 'font-medium mb-6 text-center text-4xl',
    card: 'border-3 border-green-300 py-6 px-8 bg-white m-1 rounded-lg shadow-lg',
    buttonArea: 'flex justify-center mt-6',
    button: 'bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded w-24',
    hasAccountArea: 'flex justify-center',
    hasAccount: 'text-xs font-bold mt-4',
    link: 'text-blue-600',
    forgotPasswordArea: 'text-center',
    forgotPassword:'text-sm font-bold text-blue-500'
    
}

const LogIn = () => {
      
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { logIn} = useAuth();
    const history = useHistory()
    return (
        <>
            <Formik
                initialValues={{
                email: '',
                password: '',
                acceptedTerms:false,
                }}
                validationSchema={Yup.object({
                email: Yup.string()
                    .email('Invalid email address')
                    .required('Required'),
                password: Yup.string()
                    .min(6, 'Must be 6 characters or more')
                    .required('Required'),
                })}
                onSubmit={(values, { setSubmitting }) =>  {
                    setError('');
                    setLoading(true);
                    logIn(values.email, values.password)
                        .then((userCredential) => {
                            setSubmitting(false)
                            setLoading(false)
                            history.push('/')
                        })
                        .catch((error) => {
                            setError(error.message)
                            setLoading(false)
                            setSubmitting(false)
                        });
                    }
                }
            >
            <div className = { classes.body }>
                <div className = { classes.mainContent }>
                <div className = { classes.content }>
                    <div className = { classes.card }>
                    <h1 className={classes.heading}> LogIn </h1>
                    <label> {error && < div className = { classes.error } > { error } </div>} </label >
                    <Form>
                    <TextInput
                        label="Email"
                        name="email"
                        type="text"
                        placeholder="Email"
                    />   
                    
                    <TextInput
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Password"
                    />                                    
                    
                    <div className = { classes.buttonArea } >
                        <button disabled={loading}  type="submit" className={classes.button}> LogIn </button>
                    </div>
                </Form>
                <div className = { classes.forgotPasswordArea } >
                    <Link className = { classes.forgotPassword } to = "/ForgotPassword" > Forgot Password. Click Here </Link> </div>
                    </div >
                    <div className={classes.hasAccountArea} >
                        <div className={classes.hasAccount} > Already Have an Account ? <Link className={classes.link} to = "/LogIn"> Log In </Link> </div>
                    </div>
                </div >
                </div>
            </div>
        </Formik>
    </>
    )
}

export default LogIn