import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
    </>
  )
}

function RecipeList(){

  const recipes = Array();

  fetch('https://localhost:7058/api/Recipe')
    .then(
      (response) => {return response.json();}
    )
    .then{
      
    }
  return {

  }
}