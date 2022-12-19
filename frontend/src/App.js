import './App.css';
import {Routes,Route} from 'react-router-dom'
import Login from './pages/Login';
import SuperSecret from './pages/SuperSecret'
import Signup from './pages/Signup';
import NavBar from './components/NavBar';
function App() {
  return (
    <div className="App">
    <h3>Hello from main page</h3>
      <NavBar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/secret' element={<SuperSecret />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
