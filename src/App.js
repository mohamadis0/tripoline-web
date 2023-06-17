import logo from './logo.svg';
import './App.css';
import SignInSide from './Signin/SignInSide';
// import Signup from './Signup/Signup'
import Dashboard from './component/Dashboard';
import SingleTripForm from './component/SingleTripForm';
import { Route, Routes } from 'react-router-dom';
import Driver from './component/Driver';

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<SignInSide />}></Route>
        {/* <Route path='/Signup' element={<Signup />}></Route> */}
        <Route path='/Dashboard' element={<Dashboard />}></Route>
        <Route path='/SingleTripForm' element={<SingleTripForm />}></Route>
        <Route path='/Driver' element={<Driver />}></Route>
      </Routes>
    </div>
  );
}

export default App;
