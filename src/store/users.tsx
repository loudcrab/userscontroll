import React, { Dispatch, useEffect, useReducer, useState } from "react"
import { DELETE_USERS, reducer, SAVE_ALL } from "./recuder"

import { createContext, useContext } from "react";
import { users, action, payload, user } from "./types";
import {getUsers, saveUsers } from './backend'
export const positionOptions = ['Тимлид', 'Фронт','Бэк']
export const sexOptions = ['male', 'female','other']



export const UsersContext = createContext({users: [], dispatch:()=>{}} as any);
 
export const UsersProvider : React.FC= ({ children })=>{
  const [users, dispatch] = useReducer<React.Reducer<users, action>>(reducer, []) as [users, Dispatch<action>]

  return <UsersContext.Provider value={{users: users, dispatch}}>
    {children}
  </UsersContext.Provider>
}



export const useUsersContext = () => {
  const {users: _users, dispatch} = useContext(UsersContext) 
  const [ usersState, setUsersState ] = useState(_users);
  const [selectedUser , setSelectedUser ] = useState(emptyUser)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async ()=>{
   const result =  await getUsers()
   dispatch({ type: SAVE_ALL, users: result })
   setUsersState(result)
  }

  useEffect(()=>{
    setUsersState(_users)
  }, [_users])
  
  const save = async ()=>{
    await saveUsers(usersState)
    dispatch({ type: SAVE_ALL, users: usersState })
  }

  const update = ()=> fetchUsers()
  
  const remove = ()=>{
    if(selectedUser.id === -1) return
    const idx = usersState.findIndex(({id}: {id:number})=>selectedUser?.id === id)
    const filterUsers = usersState.filter((_ : any, _idx : number)=> idx !== _idx)
    setUsersState(filterUsers)
    setSelectedUser(emptyUser)
  }
  const add = ()=>{
    const initId = usersState.length ? usersState.length + 1 :1
    const newUser = {  ...emptyUser, id: initId, }
    setUsersState([...usersState, newUser ])
    setSelectedUser(newUser)
  }
  console.log('selected', selectedUser)
  return {usersState, setUsersState, selectedUser , setSelectedUser, update,
    save,
    remove,
    add
  }
}

const emptyUser = {
  id: -1,
  name: '',
  position: 'Тимлид',
  birthday: '1970-11-11',
  sex: 'male',
  fired: false,
  сolleagues: [],
}

