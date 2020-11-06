import { users, action } from "./types"


export const SAVE_ALL = 'SAVE_ALL'
export const DELETE_USERS = 'DELETE_USERS'
export const reducer = (state : users, action : action): users => {    
    switch (action.type) {
      case SAVE_ALL:   
        
        return action.users                   
     
      default:
        return state
    }
  
  }
  

