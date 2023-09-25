import React from 'react'

export default function Header({gridSize, setGridSize}) {

  const handleChange = (e)=>{
    setGridSize(e.target.value)
  }

  return (
    <div className='flex flex-col justify-center items-center text-xl space-x-2 font-bold p-2'>
      <div className='space-x-2 space-y-3 p-3'>
        <span className='text-red-500'>Tic</span>
        <span className='text-black-800'>Tac</span>
        <span className='text-yellow-500'>Toe</span>
      </div>
      <div className='space-x-3'>
        <span className='text-green-500'>Grid Size</span>
        <select value={gridSize} onChange={handleChange} className=' outline-none cursor-pointer bg-green-500 rounded-lg shadow-lg'>
        {
          Array.from(Array(6).keys()).map((key)=>{
            return key > 0 && <option value={key + 1} key={key}>{key + 1}</option>
          })
        }
        </select>
      </div>
    </div>
  )
}
