import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Grid({gridSize, choice, insert, checkForWin, isGridFull, resetGrid, setGridReset}) {

  let initialMatrix = [];
  for(let i = 0; i < gridSize; ++i){
    initialMatrix[i] = new Array(gridSize);
    for(let j = 0; j < gridSize; ++j) initialMatrix[i][j] = -1;
  }

  const [matrix, setMatrix] = useState(initialMatrix);
  const currWinner = useRef(-1);

  useEffect(()=>{
    let initialMatrix = [];
    for(let i = 0; i < gridSize; ++i){
      initialMatrix[i] = new Array(gridSize);
      for(let j = 0; j < gridSize; ++j) initialMatrix[i][j] = -1;
    }
    setMatrix(initialMatrix);
  }, [gridSize])

  const handleClick = (row, col) => {
    if(!insert(row, col, choice.current)){
      toast.error(`illegal move!`);
      return;
    }

    let res = checkForWin(row, col, choice.current);
    const updatedMatrix = [...matrix];
    updatedMatrix[row][col] = choice.current;
    setMatrix(updatedMatrix);
    if(res.verdict){return winFunction(row, col, res.pos, choice.current)}
    res = isGridFull(row, col, choice.current);
    choice.current = Math.abs(choice.current - 1);
    if(res) {toast.warning(`grid is full, reseting the grid!`);return reset()}
  }

  const reset = ()=>{
    const newMatrix = [];
    for(let i = 0; i < gridSize; ++i){
      newMatrix[i] = new Array(gridSize);
      for(let j = 0; j < gridSize; ++j) newMatrix[i][j] = -1;
    }
    setMatrix(newMatrix);
    choice.current = 0;
    setGridReset(!resetGrid);
    currWinner.current = -1;
  }

  const winFunction = (row, col, pos, winner)=>{
    const updatedMatrix = [...matrix];
    toast.success(`player ${winner === 0 ? "first" : "second"} won!`);
    if(pos === "updown"){
      for(let i = 0; i < gridSize; ++i) updatedMatrix[i][col] = 9;
    }else if(pos === "leftright"){
      for(let i = 0; i < gridSize; ++i) updatedMatrix[row][i] = 9;
    }else if(pos === "rightdiagonal"){
      let i = 0, j = gridSize - 1;
      while(i < gridSize && j >= 0){
        updatedMatrix[i++][j--] = 9;
      }
    }else{
      for(let i = 0; i < gridSize; ++i) updatedMatrix[i][i] = 9;
    }
    currWinner.current = winner;
    setMatrix(updatedMatrix);
    setTimeout(()=>{
      reset();
    },5000)
  }

  const formatBackground = (val)=>{
    return val === 9 ? "bg-green-500" : "bg-cyan-100";
  }

  return (
    <div className='flex justify-center items-center mt-7'>
      {
        <table className = 'border-red-500 border-4'>
        <tbody>
        {
          matrix.map((row, rowIndex)=>{
            return(
              <tr key = {rowIndex}>
                {
                  row.map((column, columnIndex)=>{
                    return(<td key = {columnIndex}
                              className='border-2 border-blue-500 cursor-pointer'>
                                <div className= {`w-20 h-20 flex items-center justify-center text-3xl ${formatBackground(column)}`}>
                                  <button className=' w-20 h-20 font-light hover:bg-red-200' onClick={()=>handleClick(rowIndex, columnIndex)}>
                                    { column === -1  ? "" : column === 1 || (column === 9 && currWinner.current === 1) ? '❌' : '⭕'}
                                  </button>
                                </div>
                            </td>)})
                }
              </tr>
            )
          })
        }
        </tbody>
      </table>
      }
    </div>
  )
}

export default Grid