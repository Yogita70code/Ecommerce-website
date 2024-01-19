import React,{useReducer} from 'react';
import initialState from './State';
const reducer=(state,action)=>{
  console.log("state and action in reducer function with action.type",state,action);
  switch(action.type){
    case "Increment":{
      return state+1;
    }
    case "Decrement":{
      return state-1;
    }
    default: 
    {return state;

    }
  }
}
export default function CartItem() {
   const [state,dispatch]=useReducer(reducer,initialState);
    
  return (
    <div>CartItem
      <button onClick={()=>{dispatch({type:"Increment"})}}>+</button>
      <span>{state}</span>
      <button onClick={()=>{dispatch({type:"Decrement"})}}>-</button>
    </div>
  )
}
