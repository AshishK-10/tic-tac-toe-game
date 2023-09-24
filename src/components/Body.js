import React, { useEffect, useState } from 'react'
import Grid from './Grid'
import grid from '../grid';

function Body({gridSize, choice}) {
  const [gridFunctions, setGridFunctions] = useState(null);
  const [gridreset, setGridReset] = useState(false);

  useEffect(()=>{
    const updatedGridFunctions = grid(gridSize);
    setGridFunctions(updatedGridFunctions);
  }, [gridSize, gridreset])
  return (
    <div>
      {gridFunctions && <Grid gridSize = {gridSize} choice={choice} insert = {gridFunctions.insert} checkForWin = {gridFunctions.checkForWin} isGridFull = {gridFunctions.isGridFull} resetGrid={gridreset} setGridReset = {setGridReset}/>}
    </div>
  )
}

export default Body