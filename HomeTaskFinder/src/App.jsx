import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Home from './Component/Home/Home';
import Nevbar from './Component/Nevbar/Nevbar';
import PopularServices from './Component/PopulerPage/PopularServices';
import MostBookedServices from './Component/Most_booked_employee/mbs';
import Footer from './Component/Footer/Footer';
import ContactForm from './Component/Contect Us/ContactForm';
import UserLogin from './Component/Login/User/UserLogin';
import UserRagister from './Component/Login/Ragister/UserRagister/UserRagister';
import SpRegister from './Component/Login/Ragister/SpRagister/SpRegister';
import SpLogin from './Component/Login/ServicsProvider/SpLogin';

function App() {
  return (
    <Router>
      <Nevbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/services' element={<PopularServices />} />
        <Route path='/pricing' element={<MostBookedServices />} />
        <Route path='/contact' element={<ContactForm />} />
        <Route path='/user-login' element={<UserLogin />} />
        <Route path='/sp-login' element={<SpLogin/>} />
        <Route path='/user-register' element={<UserRagister />} />
        <Route path='/sp-register' element={<SpRegister />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
