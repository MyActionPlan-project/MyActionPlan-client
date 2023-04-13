
import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ActionlistPage from './pages/ActionlistPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <div className="App">
    <Navbar/>
      <Routes>
        <Route path='/' element={ <HomePage />} />
        <Route path='/actionplans' element={<ActionlistPage />}/>
        <Route path='/login' element={ <LoginPage />} />
        <Route path='/signup' element={ <SignupPage />} />
      </Routes>
    <Footer/>
    </div>
  );
}

export default App;
