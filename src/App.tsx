import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
 import {IRecipe} from './IRecipe';

function App() {
  const[search , setSearch] = useState('')
  const[results , setResults] = useState<IRecipe[]>([])
  
  function searchRecipe(event:any){
    event.preventDefault();
    const form = event.target
    const input = form.querySelector('.input')
    if(input.value !== ''){
      setSearch(input.value.toLowerCase()) 
    }else{
      alert('Input is Empty')
    }
    input.value = ''
  }
    const fetchData = (search:string) => {
      fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${search}&app_id=33e40a89&app_key=7961668467bfec8650235dc35b76a183`)
        .then(response =>{
          if(response.ok){
            return response.json()
          }
         throw new Error('Server Did not Work')
    })
        .then(data => {
          console.log(data)
          setResults(data.hits)
        })
        .catch((err)=> console.log(err))
    }
    
    useEffect(()=>{
      fetchData(search)
    },[search])

    
    
    return (
    <div className='main'>
      <div className="header">
        <h1>Recipe App with Typescript/React</h1>
        <form className='recipe-form' onSubmit={searchRecipe}>
          <input type="text" className='input'/>
          <button type="submit" className='btn-submit'>Search</button>
        </form>
        <div className="result-header">Recipe results for {search}</div>
      </div>
      <div className="recipe-container">
          {results && results.map(result =>{
            return( 
            <div className='recipe'>
                <div className="logo"><img src={result.recipe.image} alt=""  /></div>
                <div className='recipe-header'>{result.recipe.label}</div>
                <div className="recipee">{result.recipe.ingredientLines.map((ing:string) =>{
                  return <p>{ing}</p>
                })}</div>
              </div>
            )
          })}
      </div>
    </div>
  );
}

export default App;
