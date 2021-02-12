import { React, useState, useRef, useEffect } from 'react'
import "@pathofdev/react-tag-input/build/index.css";
import ReactTagInput from "@pathofdev/react-tag-input";
import AlgoliaPlaces from 'algolia-places-react';
import { useAuth } from '../contexts/AuthContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const classes = {
 input: 'block w-full bg-white border border-grey-light hover:border-green-300 px-2 py-2 w-12 rounded shadow',
    
}
const ModalAdd = () => {
    const { addDoc, currentUser, uploadFile, urlLink, fetchData, fileRef, AddJob } = useAuth();
    const [tags, setTags] = useState([])
    const [location, setLocation] = useState('')
    const companyRef = useRef()
    const titleRef = useRef()
    const positionRef = useRef()
    const typeRef = useRef()
   const [requirementValue, setRequirementValue] = useState('')
    const salaryRef = useRef()
    const [error, setError] = useState('');
    const [overviewValue, setOverviewValue] = useState('');

    

  function addFile(e) {
     
    uploadFile(e)
 }
 function handleSubmit(e) {
  e.preventDefault()
        const title = titleRef.current.value
        const company = companyRef.current.value
        const position = positionRef.current.value
        const type = typeRef.current.value
        if (location && tags[0]) {
            const data = {
                title: title,
                company: company,
                logo: urlLink,
                position: position,
                location: location,
                overview: overviewValue,
                requirement: requirementValue,
                tags: tags,
                time: new Date().toLocaleString(),
                email: currentUser.email,
              type: type,
                fileRef: fileRef
            }
         addDoc(data);
         fetchData()
        } else {
            setError('Fill Up all the fields!')
        }
 }

  function handleCancel() {
  AddJob()
  }
  
 return (
  <>
    <form>
        <div class="shadow overflow-hidden sm:rounded-md">
       <div class="bg-white sm:p-6">
        
              <div class="col-span-6 sm:col-span-4 mb-5  ">
                <label for="title" class="block text-sm font-medium ">Job Title</label>
                <input type = "text"
                            name = "title"
                           ref = { titleRef }
                           className = { classes.input }
                            placeholder = "Job Title"
                            required />
        </div>
        <div>
              <label class="block text-sm font-medium text-gray-700">
               Company Logo
              </label>
              <div class="mt-2 flex items-center">
                <span class="inline-block h-12 w-12  overflow-hidden bg-gray-100">
                
                </span>
             
        <input type="file" onChange={addFile} class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"/>
        
              </div>
            </div>

        
            <div class="grid grid-cols-6 gap-6">
              <div class="col-span-6 sm:col-span-3">
                <label for="company" class="block text-sm font-medium text-gray-700">Company</label>
                <input type = "text"
                       name = "company"
                       ref = { companyRef }
                       className = { classes.input }
                       placeholder = "Company Name"
                       required />
              </div>

              <div class="col-span-6 sm:col-span-3">
                <label for="Position" class="block text-sm font-medium text-gray-700">Position</label>
          <input type = "text"
                 name = "position"
                 ref = { positionRef }
                 className = { classes.input }
                 placeholder = "Position"
                 required />     
         </div>

         <div class="col-span-6 sm:col-span-6">
           <label for="Location" class="block text-sm font-medium text-gray-700">Location</label>
           <AlgoliaPlaces className = { classes.input } placeholder = 'Write an address here' onChange = {(e) => setLocation(e.suggestion.value) } onClear = {() => { setLocation("") } }/> 
         </div>

              <div class="col-span-6 sm:col-span-3">
                <label for="job_type" class="block text-sm font-medium text-gray-700">Job Type</label>
                <select id="job_type" ref={typeRef} name="type" autocomplete="job_type" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option>Full Time</option>
                  <option>Part Time</option>
                  <option>Contract</option>
                </select>
         </div>
          <div class="col-span-6 sm:col-span-3">
                <label for="Salary" class="block text-sm font-medium text-gray-700">Salary</label>
          <input type = "text"
                 name = "salary"
                 ref = { salaryRef }
                 className = { classes.input }
                 placeholder = "Salary per Year"
                 required />     
         </div>

            </div>
              <div class="sm:col-span-4 my-5  ">
                <label for="title" class="block text-sm font-medium ">OverView</label>
               <ReactQuill theme="snow" value={overviewValue} onChange={setOverviewValue}/>

      </div>
      <div class="sm:col-span-4 mb-5  ">
                <label for="title" class="block text-sm font-medium ">Requirement</label>
             <ReactQuill theme="snow" value={requirementValue} onChange={setRequirementValue}/>

       </div>
       

       <div class="col-span-6 sm:col-span-6 lg:col-span-6" >
        <div class="w-80">
                <div className = { classes.inputField } >
                  <label className={classes.label} > Tags </label>
                  <ReactTagInput tags = { tags } onChange = {(newTags) => setTags(newTags) } />
       </div>
       </div>
            </div>
         
          <div class=" py-8  flex justify-between ">
            <button onClick={handleCancel} type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
               Cancel
            </button>
             <button onClick={handleSubmit} type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Save
            </button>
          </div>
     </div>
     </div>
      </form>
  </>
 )
}

export default ModalAdd
