import React from 'react';
import './Atm_attorney_management.css';
import DescriptionIcon from '@mui/icons-material/Description'; // Icon for Document
import BusinessIcon from '@mui/icons-material/Business'; // Icon for Firm
import SupportAgentIcon from '@mui/icons-material/SupportAgent'; // Icon for Support
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Icon for Profile
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Icon for Logout
import { Link } from 'react-router-dom';

function Apm_NavBar() {
  return (
    <div>
      <nav className="top-navbar">
        <ul className="nav-list">
          <div className="left-nav">
            <li className="nav-item">
              <Link to="/add-lawfrim" className="nav-link">
                <BusinessIcon />
                <span>Firm</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/Atm_LawFirm_Details_Dipsply" className="nav-link">
                <DescriptionIcon />
                <span>Frim Details</span>
              </Link>
            </li>
          </div>

          <div className="right-nav">
            <li className="nav-item">
              <Link to="/profile" className="nav-link">
                <AccountCircleIcon />
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/logout" className="nav-link">
                <ExitToAppIcon />
                <span>Logout</span>
              </Link>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
}

export default Apm_NavBar;
