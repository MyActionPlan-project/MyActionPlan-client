
import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ActionlistPage from './pages/ActionlistPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AddStep from './components/AddStep';
import AddActionplan from './components/AddActionplan';
import ActionplanDetails from './pages/ActionplanDetails';

function App() {
  return (
    <div className="App">
    <Navbar/>
      <Routes>
        <Route path='/' element={ <HomePage />} />
        <Route path='/actionplans' element={<ActionlistPage />}/>
        <Route path='/actionplans/:actionplanId' element={<ActionplanDetails />}/>
        <Route path='/login' element={ <LoginPage />} />
        <Route path='/signup' element={ <SignupPage />} />
        <Route path='/addactionplan' element ={ <AddActionplan />} /> 
        <Route path='/addstep' element={ <AddStep />} />
      </Routes>
    <Footer/>
    </div>
  );
}

export default App;
