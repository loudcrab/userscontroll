export interface User {   
  id: number
  name: string
  position: Position
  birthday: string
  sex: Sex
  fired: boolean
  сolleagues: Array<number> | null
  [key:string] : any
  }
  
  export type Users =  Array<User>
  
  
  export type Position = 'Тимлид'| 'Фронт' |'Бэк'|'Дэвопс'|'Продукт'|'Аналитик'
  export type Sex = 'male' | 'female' | 'other'
  
  export interface Action {
    type: string,
    [key: string]: any
}

export interface Payload {
    state : Users
    action : Action
}


export type Type = 'string' | 'boolean' | 'number' | 'date';
export interface ICustomProps {
	[key: string]: {
		value: string;
		type: Type;
	};
}

export interface Input_type {
	onChange: Function;
	value: string;
}
