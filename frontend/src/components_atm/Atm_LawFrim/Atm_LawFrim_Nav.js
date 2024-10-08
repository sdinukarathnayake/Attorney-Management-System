import React from 'react';
import './Atm_LawFrim_Nav.css';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BusinessIcon from '@mui/icons-material/Business';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';

function Atm_LawFrim_Nav() {
  return (
    <div>
      <nav className="top-navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="mainHome" className="nav-link">
              <HomeIcon />
              <span>Home</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Atm_LawyerRegistration" className="nav-link">
              <PersonAddIcon />
              <span>Add Attorney</span>
            </Link>
          </li>
          <li className="nav-item active">
            <Link to="/Atm_LawFirm_Details_Dipsply" className="nav-link">
              <BusinessIcon />
              <span>Law Firm Details</span>
            </Link>
          </li>
          
          
        </ul>
      </nav>
    </div>
  );
}

export default Atm_LawFrim_Nav;
