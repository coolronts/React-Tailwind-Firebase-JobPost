import React from 'react'
import { useField } from 'formik';
const classes = {
    label: 'font-bold text-grey-darker block mb-2',
    input: 'block w-full bg-white border border-grey-light hover:border-green-300 px-2 py-2 rounded shadow',
    error: 'text-red-600 my-1 text-center text-xs  font-medium'
}

const Checkbox = ({ children, ...props }) => {
 const [field, meta] = useField({ ...props, type: 'checkbox' });
 return (
    <div>
        <label className="checkbox-input">
            <input type="checkbox" {...field} {...props} />
            {children}
        </label>
        {meta.touched && meta.error ?
            (<div className={classes.error}>{meta.error}</div>)
            : null
        }
    </div>
 )
}

export default Checkbox
