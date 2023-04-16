
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
import ActionplanDetails from './pages/ActionplanDetailsPage';
import EditActionPlan from './pages/EditActionplanPage';
import ProfilePage from './pages/ProfilePage';
import StepDetails from './pages/StepDetails';
import EditProfilePage from './pages/EditProfilePage';

function App() {
  return (
    <div className="App">
    <Navbar/>
      <Routes>
        <Route path='/' element={ <HomePage />} />
        <Route path='/actionplans' element={<IsPrivate><ActionlistPage /> </IsPrivate>}/>
        <Route path='/login' element={ <LoginPage />} />
        <Route path='/signup' element={ <SignupPage />} />
        <Route path='/addactionplan' element ={ <IsPrivate><AddActionplan /> </IsPrivate>} /> 
        <Route path='/addstep' element={ <AddStep />} />
        <Route path='/actionplans/:actionplanId' element={<ActionplanDetails />}/>
        <Route path='/actionplans/edit/:actionplanId' element={<EditActionPlan />} />
        <Route path='/actionplans/:actionplanId/:stepId' element={<StepDetails />}/>
        <Route path='/profile/:Id' element={<IsPrivate> <ProfilePage /></IsPrivate>} />
        <Route path='/profile/:userId' element={<IsPrivate> <ProfilePage /></IsPrivate>} />
        <Route path='/profile/edit-profile' element={<IsPrivate> <EditProfilePage /></IsPrivate>} />
      </Routes>
    <Footer/>
    </div>
  );
}

export default App;
