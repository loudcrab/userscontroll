import React, { Dispatch, useEffect, useReducer, useState } from "react"
import { ADD_CUSTOM_PROPERTY, ADD_NEW_USER, DELETE_USERS, reducer, REMOVE_USER, SAVE_ALL, SELECT_USER, UPDATE_USER } from "./recuder"

import { createContext, useContext } from "react";
import { users, action, payload, user } from "./types";
import {getUsers, saveUsers } from './backend'
import { newPropertyModal } from "../Components/NewProperty";
export const positionOptions = ['Тимлид', 'Фронт','Бэк']
export const sexOptions = ['male', 'female','other']



export const UsersContext = createContext({users: [], dispatch:()=>{}} as any);
 
export const UsersProvider : React.FC= ({ children })=>{
  const [store, dispatch] = useReducer<React.Reducer<users, action>>(reducer, []) as [users, Dispatch<action>]

  return <UsersContext.Provider value={{store, dispatch}}>
    {children}
  </UsersContext.Provider>
}



export const useUsersContext = () => {
  const {store, dispatch} = useContext(UsersContext) 

 
  const fetchUsers = async ()=>{
   const result =  await getUsers()
   dispatch({ type: SAVE_ALL, users: result })
  }

  const save = async ()=>{
    await saveUsers(store.users)
    dispatch({ type: SAVE_ALL, users: store.users })
  }

  const update = ()=> fetchUsers()
  
  const addProperty = async ()=>{    
    const answer = await newPropertyModal()
    if(!answer) return
    dispatch({ type: UPDATE_USER, customProps: true, 
      key: answer.title, typeOfField: answer.type, value: null
    })
  }

  const remove = ()=>{    
    dispatch({ type: REMOVE_USER })
  }
  const add = ()=>{    
    dispatch({ type: ADD_NEW_USER })
  }
  const updateUser = (payload: any)=>{
    dispatch({ type: UPDATE_USER, ...payload })
  }
  const selectUser = (id: number)=>{
    dispatch({ type: SELECT_USER, id })
  }

    return {updateUser, update,fetchUsers,
    save,
    remove,
    add,
    selectUser,
    addProperty,
    ...store
  }
}

export const emptyUser = {
  id: -1,
  name: '',
  position: 'Тимлид',
  birthday: '1970-11-11',
  sex: 'male',
  fired: false,
  сolleagues: [],
}

