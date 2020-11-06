export interface user {   
  id: number
  name: string
  position: position
  birthday: string
  sex: sex
  fired: boolean
  сolleagues: Array<number> | null
  [key:string] : any
  }
  
  export type users =  Array<user>
  
  
  export type position = 'Тимлид'| 'Фронт' |'Бэк'|'Дэвопс'|'Продукт'|'Аналитик'
  export type sex = 'male' | 'female' | 'other'
  
  export interface action {
    type: string,
    [key: string]: any
}

export interface payload {
    state : users
    action : action
}