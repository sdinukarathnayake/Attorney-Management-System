import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Common
import Home from './components_home/Home';

// Login
import Login from './components_login/login';
import LoginAppointmentManager from './components_login/login_appointment_manager';

// Appointment Management
import LawyerAppointmentDashboard from './components_apm/apm_law_dashboard';
import LawyerCreateAppointmentRequest from './components_apm/apm_law_create_appointment_request';
import LawyerViewAppointmentRequest from './components_apm/apm_law_view_appointment_request';
import LawyerViewAppointment from './components_apm/apm_law_view_appointment';
import LawyerViewAllAppointmentRequests from './components_apm/apm_law_view_all_appointment_requests';
import LawyerViewAllAppointments from './components_apm/apm_law_view_all_appointments';

import AppointmentManagerDashboard from './components_apm/apm_apm_dashboard';
import AppointmentManagerViewAppointmentRequest from './components_apm/apm_apm_view_appointment_request';
import AppointmentManagerViewAppointment from './components_apm/apm_apm_view_appointment';
import AppointmentManagerViewAllAppointmentRequests from './components_apm/apm_apm_view_all_appointment_requests';
import AppointmentManagerViewAllAppointments from './components_apm/apm_apm_view_all_appointments';

import ClientAppointmentDashboard from './components_apm/apm_cli_dashboard';
import ClientViewAppointment from './components_apm/apm_cli_view_appointment';
import ClientViewAllAppointments from './components_apm/apm_cli_view_all_appointments';

function App() {
  return (
    <Router>
      <div>
        <Routes>

          {/* Common */}
          <Route path="/" exact element={<Home />} />

          {/* Login */}
          <Route path="/login" exact element={<Login />} />
          <Route path="/login/appointment-manager" exact element={<LoginAppointmentManager />} />

          {/* Appointment Management */}
          <Route path="/lawyer-dashboard/appointments/:id" exact element={<LawyerAppointmentDashboard />} />
          <Route path="/lawyer-dashboard/create-appointment-request/:id" exact element={<LawyerCreateAppointmentRequest />} />
          <Route path="/lawyer-dashboard/view-appointment-request/:id" exact element={<LawyerViewAppointmentRequest />} />
          <Route path="/lawyer-dashboard/view-appointment/:id" exact element={<LawyerViewAppointment />} />
          <Route path="/lawyer-dashboard/view-all-appointment-requests/:id" exact element={<LawyerViewAllAppointmentRequests />} />
          <Route path="/lawyer-dashboard/view-all-appointments/:id" exact element={<LawyerViewAllAppointments />} />

          <Route path="/appointment-manager-dashboard/:id" exact element={<AppointmentManagerDashboard />} />
          <Route path="/appointment-manager-dashboard/view-appointment-request/:id" exact element={<AppointmentManagerViewAppointmentRequest />} />
          <Route path="/appointment-manager-dashboard/view-appointment/:id" exact element={<AppointmentManagerViewAppointment />} />
          <Route path="/appointment-manager-dashboard/view-all-appointment-requests" exact element={<AppointmentManagerViewAllAppointmentRequests />} />
          <Route path="/appointment-manager-dashboard/view-all-appointments/:id" exact element={<AppointmentManagerViewAllAppointments />} />

          <Route path="/client-portal/appointments/:id" exact element={<ClientAppointmentDashboard />} />
          <Route path="/client-portal/view-appointment/:id" exact element={<ClientViewAppointment />} />
          <Route path="/client-portal/view-all-appointments/:id" exact element={<ClientViewAllAppointments />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
