import { useState } from 'react'
import './App.css'

import { SignUp } from './pages/SignUp';
import { SignIn } from './pages/SignIn';
function App() {
     return(<div>
       <div><SignUp></SignUp>
      </div>
      <div><SignIn></SignIn></div>
  </div>
     
      
     )
}

export default App;
