import { users } from "./types"

export const getUsers = async () =>{     
   try {
    const usersString = localStorage.getItem?.('usersStorage') as string
   return  JSON.parse(usersString)|| []
   } catch (error) {
       return []
   }
}

export const saveUsers = async (users : users)=>{
    return localStorage.setItem('usersStorage', JSON.stringify(users))
}




