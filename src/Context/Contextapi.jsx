import React from 'react'
import { createContext } from 'react'
import { useState } from 'react'

export const addtaskResponseContext=createContext()
export const editTaskResponseContext=createContext()
export const authContext=createContext()


function Contextapi({children}) {
const [addResponse,setAddResponse]=useState("")
const [editResponse,setEditResponse]=useState("")
const [authContextStatus,setAuthContextStatus]=useState(false)

  return (
<>

<addtaskResponseContext.Provider value={{addResponse,setAddResponse}}> 
<editTaskResponseContext.Provider value={{editResponse,setEditResponse}}>
<authContext.Provider value={{authContext,setAuthContextStatus}}>

{children}

</authContext.Provider>
</editTaskResponseContext.Provider>
</addtaskResponseContext.Provider>


</>  )
}

export default Contextapi