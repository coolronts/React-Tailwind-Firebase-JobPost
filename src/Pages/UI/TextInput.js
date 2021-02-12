import React from 'react'
import { Formik, Form, useField } from 'formik';

const classes = {
    
    label: 'font-bold text-grey-darker block mb-2',
    input: 'block w-full bg-white border border-grey-light hover:border-green-300 px-2 py-2 rounded shadow',
    error: 'text-red-600 my-1 text-center text-xs  font-medium'
}

const TextInput = ({ label, ...props }) => {
 const [field, meta] = useField(props)
 return (
  <>
    <label className={classes.label} htmlFor={props.id || props.name}>{label}</label>
    <input className={classes.input} {...field} {...props} />
    {meta.touched && meta.error ? (
        <div className={classes.error}>{meta.error}</div>
    ) : null}
  </>
 )
}

export default TextInput
