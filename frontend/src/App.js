import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Common
import Home from './components_home/Home';

// Login
import Login from './components_login/login';
import LoginAppointmentManager from './components_login/login_appointment_manager';
import LoginSupportAgent from './components_login/login_support_agent';
import LoginLegalCaseManager from './components_login/login_legal_case_manager';
import LoginDocumentManager from './components_login/login_document_manager';
import LoginFinanceManager from './components_login/login_finance_manager';
import LoginDeedManager from './components_login/login_deed_manager';
import LoginAttorneyManager from './components_login/login_attorney_manager';

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


// Support Ticket Management
import ClientSupportTicketDashboard from './components_uam/uam_cli_dashboard';
import ClientCreateSupportTicket from './components_uam/uam_cli_create_support_ticket';
import ClientViewSupportTicket from './components_uam/uam_cli_view_support_ticket';
import ClientViewTicketReply from './components_uam/uam_cli_view_reply_ticket';
import ClientViewAllSupportTickets from './components_uam/uam_cli_view_all_support_tickets';
import ClientViewAllTicketReplies from './components_uam/uam_cli_view_all_replies';

import SupportAgentDashboard from './components_uam/uam_sup_dashboard';
import SupportAgentViewSupportTicket from './components_uam/uam_sup_view_support_ticket';
import SupportAgentViewTicketReply from './components_uam/uam_sup_view_reply_ticket';
import SupportAgentViewAllSupportTickets from './components_uam/uam_sup_view_all_support_tickets';
import SupportAgentViewAllTicketReplies from './components_uam/uam_sup_view_all_reply_tickets';



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
          <Route path="/login/support-agent" exact element={<LoginSupportAgent />} />
          <Route path="/login/legal-case-manager" exact element={<LoginLegalCaseManager />} />
          <Route path="/login/document-manager" exact element={<LoginDocumentManager />} />
          <Route path="/login/finance-manager" exact element={<LoginFinanceManager />} />
          <Route path="/login/deed-manager" exact element={<LoginDeedManager />} />
          <Route path="/login/attorney-manager" exact element={<LoginAttorneyManager />} />


          {/* Appointment Management */}
          <Route path="/lawyer-dashboard/appointments/:id" exact element={<LawyerAppointmentDashboard />} />
          <Route path="/lawyer-dashboard/create-appointment-request/:id" exact element={<LawyerCreateAppointmentRequest />} />
          <Route path="/lawyer-dashboard/view-appointment-request/:id" exact element={<LawyerViewAppointmentRequest />} />
          <Route path="/lawyer-dashboard/view-appointment/:id" exact element={<LawyerViewAppointment />} />
          <Route path="/lawyer-dashboard/view-all-appointment-requests/:id" exact element={<LawyerViewAllAppointmentRequests />} />
          <Route path="/lawyer-dashboard/view-all-appointments/:id" exact element={<LawyerViewAllAppointments />} />

          <Route path="/appointment-manager-dashboard/:id/" exact element={<AppointmentManagerDashboard />} />
          <Route path="/appointment-manager-dashboard/view-appointment-request/:id/:appointmentManagerId" exact element={<AppointmentManagerViewAppointmentRequest />} />
          <Route path="/appointment-manager-dashboard/view-appointment/:id" exact element={<AppointmentManagerViewAppointment />} />
          <Route path="/appointment-manager-dashboard/view-all-appointment-requests" exact element={<AppointmentManagerViewAllAppointmentRequests />} />
          <Route path="/appointment-manager-dashboard/view-all-appointments/:id" exact element={<AppointmentManagerViewAllAppointments />} />

          <Route path="/client-portal/appointments/:id" exact element={<ClientAppointmentDashboard />} />
          <Route path="/client-portal/view-appointment/:id" exact element={<ClientViewAppointment />} />
          <Route path="/client-portal/view-all-appointments/:id" exact element={<ClientViewAllAppointments />} />


          {/* User Affairs Management */}
          <Route path="/client-portal/support/:id" exact element={<ClientSupportTicketDashboard />} />
          <Route path="/client-portal/create-support-ticket/:id" exact element={<ClientCreateSupportTicket />} />
          <Route path="/client-portal/view-support-ticket/:id" exact element={<ClientViewSupportTicket />} />
          <Route path="/client-portal/view-ticket-reply/:id" exact element={<ClientViewTicketReply />} />
          <Route path="/client-portal/view-all-support-tickets/:id" exact element={<ClientViewAllSupportTickets />} />
          <Route path="/client-portal/view-all-ticket-replies/:id" exact element={<ClientViewAllTicketReplies />} />

          <Route path="/support-agent-dashboard/:id" exact element={<SupportAgentDashboard />} />
          <Route path="/support-agent-dashboard/view-support-ticket/:id" exact element={<SupportAgentViewSupportTicket />} />
          <Route path="/support-agent-dashboard/view-ticket-reply/:id" exact element={<SupportAgentViewTicketReply />} />
          <Route path="/support-agent-dashboard/view-all-support-tickets" exact element={<SupportAgentViewAllSupportTickets />} />
          <Route path="/support-agent-dashboard/view-all-ticket-replies/:id" exact element={<SupportAgentViewAllTicketReplies />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
