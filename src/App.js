
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
import IsPrivate from './components/IsPrivate';
import IsAnon from './components/IsAnon';
import ActionplanDetails from './pages/ActionplanDetailsPage';
import EditActionPlan from './pages/EditActionplanPage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import StepUpdate from './pages/StepUpdate';

function App() {
  return (
    <div className="App">
    <Navbar/>
      <Routes>
        <Route path='/' element={ <HomePage />} />
        <Route path='/actionplans' element={<IsPrivate><ActionlistPage /> </IsPrivate>}/>
        <Route path='/login' element={<IsAnon> <LoginPage /> </IsAnon>} />
        <Route path='/signup' element={<IsAnon><SignupPage /></IsAnon> } />
        <Route path='/addactionplan' element ={ <IsPrivate><AddActionplan /> </IsPrivate>} /> 
        <Route path='/addstep' element={<IsPrivate> <AddStep /></IsPrivate>} />
        <Route path='/actionplans/:actionplanId' element={<IsPrivate><ActionplanDetails /></IsPrivate>}/>
        <Route path='/actionplans/edit/:actionplanId' element={<IsPrivate><EditActionPlan /></IsPrivate>} />
        <Route path='/actionplans/:actionplanId/:stepId' element={<IsPrivate><StepUpdate /></IsPrivate>}/>    
        <Route path='/profile/:userId' element={<IsPrivate> <ProfilePage /></IsPrivate>} />
        <Route path='/edit-profile/:userId' element={<IsPrivate> <EditProfilePage /></IsPrivate>} />
      </Routes>
    <Footer/>
    </div>
  );
}

export default App;
