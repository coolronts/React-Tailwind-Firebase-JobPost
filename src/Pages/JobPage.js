import { React, useEffect, useState, useRef } from 'react'
import Navbar from './components/Navbar';
import ReactQuill from 'react-quill';
import { useAuth } from '../contexts/AuthContext';
import AlgoliaPlaces from 'algolia-places-react';
import { RiSave2Fill, RiDeleteBin7Line } from 'react-icons/ri'
import {MdCancel} from 'react-icons/md'
import 'react-quill/dist/quill.snow.css';

//Day.js
var dayjs = require('dayjs')
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)


const classes = {
  body: 'bg-gray-200 w-screen flex justify-center align-middle',
  card: 'bg-white w-1/2 m-8 rounded-2xl shadow-lg flex-row',
  image: 'h-60 rounded-t-2xl relative',
  logo:'w-16 mx-6 border-white border-4 h-16 bg-gray-300 rounded-2xl absolute inset-x-0 bottom-0  ',
  heading: 'h-20  py-2',
  title: 'text-3xl font-bold px-6 py-3 text-center mb-3 outline-none',
  secondLine:'flex justify-between',
  company: 'px-6 text-sm font-bold text-green-600 inline ',
  location: 'text-sm font-bold text-green-600 inline ',
  daysAgo:'text-sm font-bold text-green-600 px-6',
  highlight: 'mx-6 rounded flex justify-between border-2 border-green-600 mt-12 ',
  box: 'border-green-600 flex-grow p-3',
  middleBox: 'border-green-600 border-r-2 flex-grow p-3',
  highlightHeading: 'text-xs font-semibold text-gray-500',
  highlightSubHeading:'font-bold text-sm',
  details:'p-6',
  detailsHeading: 'text-lg font-bold my-3 ',
  detailsSubHeading: 'text-justify text-md font-medium tracking-wide',
  unorderedList: 'list-disc list-inside',
  apply: 'flex justify-center my-6',
  button: 'bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded',
  contacts: 'text-center font-bold text-medium mb-6',
  background:'https://www.idealwork.com/wp-content/uploads/2017/11/2017_08_Smart-Office-Dubai_-MT7_web.jpg',
  officePicture: 'w-full h-48 bg-gray-300 rounded-t-2xl',
  jobId: 'absolute right-0 px-6 font-bold text-green-600',
  id: 'text-gray-600',
  newFeatured: 'flex flex-row-reverse',
  smallTags: 'bg-green-600 text-xs text-white mx-6 my-3 rounded p-1 ring-2 ring-green-200 shadow-2xl',
  saveBtn: 'bg-green-500 hover:bg-green-800 text-white font-bold rounded',
  uploadFile: 'ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500',
  iconSave: 'text-green-300',
  iconCancel: 'text-red-300',
  icons: 'flex text-center'
}

const JobPage = ({ match }) => {
  const [value, setValue] = useState('')
  const [editElement, setEditElement] = useState('')
  const textRef = useRef()
  const { update, fetchDoc, detail, uploadFile, urlLink, deleteImage} = useAuth()
  const saveEditComponent = <div className={classes.icons}>  <RiSave2Fill onClick={setEditValue} className={classes.iconSave}/> <MdCancel className={classes.iconCancel} onClick={cancelEdit}/></div>
  var fileEvent = ''
  var now = dayjs()

  useEffect(() => {
    fetchDoc(match.params.docId)
  }, [])
  
  function editOverview(inputValue,elementId) {
    setValue(inputValue)
    setEditElement(elementId)
  }

  function saveEdit() {
    if (editElement === "logo") {
      uploadFile(fileEvent)    
      deleteImage(detail.logo)
      update(urlLink, match.params.docId, editElement)
    } else if (editElement === ("overview" || "requirement" || "location")) {
        update(value, match.params.docId, editElement)
    } else {
        var currentValue = textRef.current.value
        update(currentValue, match.params.docId, editElement)
    }
    setEditElement('')
    setValue('')
  }

  function addFile(e) {
    fileEvent = e
  }

  function cancelEdit() {
    setEditElement('')
  }

  function setEditValue(elementId) {
    setEditElement(elementId)
    saveEdit()
  }

  return (
    <>
      <Navbar/>
      <div className={classes.body}>
        <div className={classes.card}>
          <div className={classes.image}>
            <div className={classes.officePicture} style={{backgroundImage: `url(${classes.background})`, backgroundSize: 'cover'}}> </div>
              <div className={classes.logo}>
                {editElement !== "logo" ?  <img alt="Logo" src={detail.logo}onDoubleClick={() => { editOverview(detail.logo, "logo") }} /> :
                  <> <input type="file" onChange={(e) => addFile(e, detail.logo)} className={ classes.uploadFile }/>
                          {saveEditComponent}
                  </>
                }
              </div>
              <div class={classes.newFeatured}>
                  {now.diff(detail.time, 'week') > 1 && <div className={classes.smallTags}>New</div> } {detail.featured&& <div className={classes.smallTags}>Featured</div> } 
              </div>
            <div className={classes.jobId}>Job Id: <span className={classes.id}>{match.params.docId}</span></div>
          </div>
    
          <div className={classes.heading}>
            {editElement !== "title" ? <div className={classes.title} onDoubleClick={() => { editOverview(detail.title, "title") }}>{detail.title}</div> :
              <><input className={classes.title} type="text" ref={textRef} defaultValue={detail.title} required/>
                {saveEditComponent}
              </>
            }
            <div className={classes.secondLine}>
              {editElement !== "company" ? <div className={classes.company} onDoubleClick={() => { editOverview(detail.company, "company") }}>{detail.company}</div> :
                <><input type="text" ref={textRef} defaultValue={detail.company} />
                  {saveEditComponent}
                </>
              }
              {editElement !== "location" ? <div className={classes.location} onDoubleClick={() => { editOverview(detail.location, "location") }}>{detail.location}</div> :
                <><AlgoliaPlaces className = { classes.input } placeholder = 'Write an address here' onChange = {(e) => setValue(e.suggestion.value) } onClear = {() => { setValue("") } }/> 
                  {saveEditComponent}
                </>
              }
              <div className={classes.daysAgo}> {dayjs(detail.time).fromNow() }</div>
            </div>
          </div>
          <div className={classes.highlight}>
            <div className={classes.middleBox}>
              <div className={classes.highlightHeading}>Experience</div>
              {editElement !== "experience" ? <div className={classes.highlightSubHeading} onDoubleClick={() => { editOverview(detail.experience, "experience") }}>{detail.experience}</div> :
                <><input type="text" ref={textRef} defaultValue={detail.experience} />
                  {saveEditComponent}</>
              }
            </div>
            <div className={classes.middleBox}>
              <div className={classes.highlightHeading}>Work Level</div>
              {editElement !== "position" ? <div className={classes.highlightSubHeading} onDoubleClick={() => { editOverview( detail.position,"position") }}>{detail.position}</div> :
                <><input type="text" ref={textRef} defaultValue={detail.position} />
                  {saveEditComponent} </>
              }
            </div>
            <div className={classes.middleBox}>
              <div className={classes.highlightHeading}>Employee Type</div>
              {editElement !== "type" ? <div className={classes.highlightSubHeading} onDoubleClick={() => { editOverview( detail.type,"type") }}>{detail.type}</div> :
                <>
                  <select ref={textRef} class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option>Full Time</option>
                    <option>Part Time</option>
                    <option>Contract</option>
                  </select>
                  {saveEditComponent}
                </>
              }
            </div>
            <div className={classes.box}>
              <div className={classes.highlightHeading}>Offer Salary</div>
              {editElement !== "salary" ? <div className={classes.highlightSubHeading} onDoubleClick={() => { editOverview( detail.salary,"salary") }}>{detail.salary}</div> :
                <><input type="text" ref={textRef} defaultValue={detail.salary} />
                  {saveEditComponent}
                </>
              }
            </div>
          </div>
          <div className={classes.details}>
            <div className={classes.detailsHeading}>Overview</div>
            {editElement !== "overview" ? <div dangerouslySetInnerHTML={{ __html: detail.overview }} onDoubleClick={() => { editOverview(detail.overview, "overview") }} />
              : <><ReactQuill theme="snow" value={value} onChange={setValue} />{saveEditComponent}</>
            }
            <div className={classes.detailsHeading}>Requirement</div>
            <div className={classes.detailsSubHeading}>
              {editElement !== "requirement" ? <div dangerouslySetInnerHTML={{ __html: detail.requirement }} onDoubleClick={() => { editOverview(detail.requirement, "requirement") }} />
                : <><ReactQuill theme="snow" value={value} onChange={setValue} />{saveEditComponent}</>
              }
            </div>
          </div>
          <div className={classes.apply}> <button type="button" className={classes.button}> Apply</button> </div>
          <div className={classes.contacts}> Contact: {detail.email} </div>
        </div>
      </div>
    </>
  )
}

export default JobPage
