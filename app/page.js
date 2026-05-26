"use client"

import React, { useState } from "react";

const page = () => {

  // variable formed for title 
  const [title, setTitle] = useState("");

  // variable formed for description 
  const [desc, setDesc] = useState("");

  // variable formed for main task (main is a container in which the previous task and the present task is shown)
  const [maintask, setMain] = useState("")

  // making a function 
  const submitHandler = (e) => {

    //  after clicking add task it prevents the page from reloading 
    e.preventDefault()
    setMain([...maintask, { title, desc }]);

    //  clear the tilte and description for adding the other ones
    setTitle("")
    setDesc("")
    console.log(maintask);
  }

  // for deleting the task
  const deletehandler = (i) => {
    let copytask = [...maintask]
    copytask.splice(i, 1)
    setMain(copytask)
  }
  let renderTask = <h2>No Task Available</h2>

  // use for adding task
  if (maintask.length > 0) {
    renderTask = maintask.map((t, i) => {
      return (
        <li className="flex items-center justify-between mb-2">
          <div className="flex justify-between mb-5 w-2/3">
            <h5 className="text-2xl font-semibold text-black">{t.title}</h5>
            <h6 className="text-lg font-medium text-black">{t.desc}</h6>
          </div>
          <button
            onClick={() => {
              deletehandler(i)
            }}
            className="bg-red-500 text-white m-5 px-4 py-2 rounded font bold">
            delete
          </button>
        </li>

      )
    })
  }

  return (
    <>

      {/* giving the heading to the project */}
      <h1 className="bg-black text-white p-5 text-5xl font-bold text-center">Aayushi's To-do-list</h1>

      {/* making a form */}
      <form onSubmit={submitHandler}>

        {/* this form includes input and it includes type, classname */}
        <input
          type="text"
          className="text-2xl border-zinc-800 border-4 m-8 px-4 py-2" placeholder="Enter Title here"

          // value and onChange are used to tell react that the tite container contains the title of what to do today
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
          }}
        >

        </input>

        {/* second input inside the form and it includes type, classname */}
        <input
          type="text"
          className="text-2xl border-zinc-800 border-4 m-8 px-4 py-2" placeholder="Enter decription here"
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value)
          }}
        >
        </input>

        {/* In the form a button is defined which has classname */}
        <button className="bg-black text-white px-4 py-3 text-2xl font-bold rounded m-5">
          Add task
        </button>
      </form>
      <hr />
      <div className="p-8 bg-slate-200 ">
        <ul>
          {renderTask}
        </ul>
      </div>
    </>
  )
}

export default page