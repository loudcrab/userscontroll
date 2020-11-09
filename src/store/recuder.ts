import { users, action } from "./types"
import { emptyUser } from "./users"


export const SELECT_USER = 'SELECT_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const ADD_CUSTOM_PROPERTY = 'ADD_CUSTOM_PROPERTY'
export const ADD_NEW_USER = 'ADD_NEW_USER'
export const SAVE_ALL = 'SAVE_ALL'
export const DELETE_USERS = 'DELETE_USERS'

export const reducer = (state : any, action : action): users => {  
  const idx = state?.users?.findIndex(({id}: {id:number})=> state.selectedUser?.id === id)  
    switch (action.type) {
      case SAVE_ALL:   

        return {
          ...state,
          isEdited: false,
          users: action.users,
          selectedUser: emptyUser
        }
      case ADD_NEW_USER: 
      
      const initId = state.users.length ? state.users.length + 1 : 1
      const newUser = {  ...emptyUser, id: initId, }
        return {
          ...state,
          isEdited: true,
          users: [...state.users, newUser ],
          selectedUser: newUser
        }
      case REMOVE_USER:
        if(state.selectedUser.id === -1) return state
        
        const filterUsers = state.users.filter((_ : any, _idx : number)=> idx !== _idx)
        return {
          ...state,
          isEdited: true,
          users: filterUsers,
          selectedUser: emptyUser
        }

      case UPDATE_USER:
        const tempUsers = [...state.users]
        if(action.customProps) {
          tempUsers[idx] = {
            ...tempUsers[idx],
            customProps: {
              ...tempUsers[idx]?.customProps,
              [action.key] : {
                type: action.typeOfField,
                value: action.value
              }
            }
          }
        } else{
          tempUsers[idx][action.key] = action.value;
        }
      
      return {
          ...state,
          isEdited: true,
          users: tempUsers,
          selectedUser: tempUsers[idx]
        }
        
        case SELECT_USER:

        return {
          ...state,
          selectedUser: state.users[action.id]
        }
      default:
        return state
    }
  
  }
  

