import { useRef, useState } from 'react';
import './App.css';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import Body from './components/Body';

function App() {
  const[gridSize, setGridSize] = useState(3)
  const choice = useRef(0);

  return (
    <div className='justify-center min-h-screen min-w-min items-center'>
      <div  className = 'mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-900'>
        <Header gridSize = {gridSize} setGridSize={setGridSize}/>
        <ToastContainer/>
        <Body gridSize={gridSize} choice={choice}/>
      </div>
    </div>
  );
}

export default App;
