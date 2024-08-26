import './components_home/common.css';
import './components_home/home.css';
import './components_login/login.css';

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Home from './components_home/Home';
import Login from './components_login/login';
import ApmDashboard from './components_apm/Apm_Dashboard';

function App() {
  return (
    <Router>
      <div>
        <Routes>

        <Route path="/" exact element={<Home/>}/>
        <Route path="/login" exact element={<Login/>}/>
        <Route path="/apm_dashboard" exact element={<ApmDashboard/>}/>

        </Routes>
      </div>
    </Router> 
  );
}

export default App;