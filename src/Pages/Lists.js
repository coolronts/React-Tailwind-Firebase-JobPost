import { React, useState, useEffect } from 'react';
import Modal from "./Modal"
import Navbar from './components/Navbar';
import ModalAdd from './ModalAdd'
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { RiEditFill, RiDeleteBin7Line } from 'react-icons/ri';

//Day.js
var dayjs = require('dayjs')
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const classes = {
  Body: 'bg-gray-200 py-16 flex flex-row  ',
  firstCol:'w-1/3',
  list: ' w-full shadow-lg bg-white mb-10 grid grid-cols-8 p-2 border-l-4 border-green-400',
  image: 'flex-shrink w-20 h-20',
  details: 'ml-6 text-lg flex flex-col mx-2 col-start-2 col-span-4',
  firstLine: 'flex items-center text-sm text-green-300 font-bold',
  featured: 'mx-0 py-0 px-1 border-0 bg-gray-600 p-1 text-white rounded-lg h-4 w-12 flex items-center justify-center',
  highlight: 'text-2xl text-left font-bold my-3 ',
  tags: ' flex flex-wrap flex-grow col-span-2',
  tag:'px-1 m-1 text-center bg-green-100 h-4 text-green-700 font-bold rounded text-xs',
  infoArea: 'flex justify-between',
  info: 'font-medium mr-3',
  btn: 'mx-2 w-10 z-10',
  buttons: 'mt-2  flex my-2  col-span-1',
  addBtn: 'mb-4 p-3 z-10 bg-green-600 shadow-lg text-white ',
  smallTags:'ml-2 mr-1 py-0 px-1 border-0 bg-green-300 p-1 text-white text-xs rounded-lg h-4 w-9 flex items-center justify-center'
 
}

const Lists = (props) => {

  const { jobs, fetchData, isDelete, Delete, isAdd, AddJob, currentUser } = useAuth()
  const [id, setId] = useState()
  var now = dayjs()

  useEffect(() => {
    if (props.match.path === "/DashBoard") {
      fetchData(props.match.path)
    } else {
      fetchData(props.match.path)
    }
  },[props.match.path])

  function handleDelete(e, docId) {
    e.preventDefault()
    setId(docId)
    Delete()
  }
  
  function handleAddJob(e){
   AddJob() 
  }
  
  return (
    <>
      <Navbar />
      <div className={classes.Body}>
        <div className={classes.firstCol}/> 
          <div class="text-center">
            {(isAdd && currentUser && props.match.path === "/DashBoard") && <ModalAdd />}
            {(currentUser && !isAdd && props.match.path === "/DashBoard") &&
              <div class="text-center">
              <button className={classes.addBtn} onClick={handleAddJob}>Add New Job Post</button>  
              </div>
            }
          
            { !isAdd && jobs.map((job) =>
              <Link to={`/JobPage/${job.docId}`}>
                <div className={classes.list}>
                  <div className="">
                  <img className={classes.image} alt="Logo" src={job.logo }/>        </div>      
                  <div className={classes.details}>
                    <div className={classes.firstLine}>{job.company}
                        {now.diff(job.time, 'week') < 1 && <div className={classes.smallTags}>New</div> } {job.featured&& <div className={classes.smallTags}>Featured</div> } 
                    </div>
                    <div className={classes.highlight}>  {job.title} </div>
                    <div className={classes.infoArea}>
                      <div className={classes.info} style={{ fontSize: "10px"}}> {dayjs(job.time).fromNow() } </div> 
                      <div className={classes.info} style={{ fontSize: "10px" }}> {job.type} </div> 
                      <div className={classes.info} style={{ fontSize: "10px"}}> {job.location} </div> 
                    </div>
                  
                  </div>
                  <div className={classes.tags}> {job.tags.map((tag) =><div className={classes.tag}> {tag} </div>)}</div>
                  {(currentUser && props.match.path === "/DashBoard") &&
                    <div className={classes.buttons}>
                      <RiEditFill class="text-green-500 text-xl" > Edit </RiEditFill> 
                      <RiDeleteBin7Line class="text-red-500 text-xl mx-2" onClick={(e)=>{handleDelete(e,job.docId)}} />          
                    </div>
                  }
                  {isDelete && <Modal id={job.docId} />}  
                </div>
            </Link>    
            )}
          </div>
          <div className={classes.firstCol}/>
        </div>    
      </> 
    )
  }

export default Lists
