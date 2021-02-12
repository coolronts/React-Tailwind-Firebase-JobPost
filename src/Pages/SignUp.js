import React, { useState, useRef } from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom'
import TextInput from '../Pages/UI/TextInput'
import Checkbox from '../Pages/UI/Checkbox'

const classes = {
    body: 'bg-grey-lighter h-screen font-sans',
    mainContent: 'container mx-auto h-full flex justify-center items-center',
    content: 'w-1/3',
    heading: 'font-medium mb-6 text-center text-4xl',
    card: 'border-3 border-green-300 py-6 px-8 bg-white m-1 rounded-lg shadow-lg',
    label: 'font-bold text-grey-darker block mb-2',
    input: 'block w-full bg-white border border-grey-light hover:border-green-300 px-2 py-2 rounded shadow',
    buttonArea: 'flex justify-center mt-6',
    button: 'bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded w-24',
    hasAccountArea: 'flex justify-center',
    hasAccount: 'text-xs font-bold mt-4',
    link: 'text-blue-600',
    
}
 
const SignUp = () => {
      
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signUp, currentUser } = useAuth();
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
                confirmPassword: Yup.string()
                    .max(20, 'Must match')
                    .required('Required')
                    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
                acceptedTerms: Yup.boolean()
                    .required('Required')
                    .oneOf([true], 'You must accept the terms and conditions.'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    try {
                        setError('');
                        setLoading(true);
                        signUp(values.email, values.password);
                        history.push("/");
                    } catch {
                        setError('Failed to sign up');
                        setLoading(false);
                    }
                    setSubmitting(false)
                }}
            >
                
            <div className = { classes.body }>
                <div className = { classes.mainContent }>
                <div className = { classes.content }>
                    <div className = { classes.card }>
                    <h1 className={classes.heading}> Sign Up </h1>
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
                    
                    <TextInput
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                    />   
                    
                    <Checkbox name="acceptedTerms"> I accept the terms and conditions</Checkbox>

                    <div className = { classes.buttonArea } >
                        <button disabled={loading} type="submit" className={classes.button}> Sign Up </button>
                        </div>
                        </Form>
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

export default SignUp