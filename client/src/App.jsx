import { useState } from 'react'
import reactLogo from './assets/react.svg'

function App() {
  return(
    <div>
      <form className=''>
        <input type="text" name='firstname'/>
        <input type="text" name='lastname'/>
        <input type="button" value="OK" />
      </form>
    </div>
  );
}

export default App
