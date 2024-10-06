import NavBar from "./apm_page_navbar";
import Footer from "./apm_page_footer";
import './appointment_management.css';

import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {

    const { id } = useParams();
    const [appointmentrequest, setAppointmentRequests] = useState([]);
    const [appointment, setAppointments] = useState([]);
    const [appointmentManager, setAppointmentManager] = useState({});
    const [lawyerDetails, setLawyerDetails] = useState({});
    const [clientDetails, setClientDetails] = useState({});

    // Get appointment request details
    useEffect(() => {
        function getAppointmentRequests() {
            axios.get("http://localhost:8070/appointmentrequest/pending/all").then((res) => {
                console.log(res.data);
                setAppointmentRequests(res.data); 
 
                res.data.forEach(appointmentRequest => {
                    const userId = appointmentRequest.lawyerId;
                    if (!lawyerDetails[userId]) {
                        axios.get(`http://localhost:8070/legalcasemanager/${userId}`)
                            .then(response => {
                                setLawyerDetails(prevDetails => ({
                                    ...prevDetails,
                                    [userId]: response.data
                                }));
                            })
                            .catch(error => {
                                console.error("Error fetching lawyer details:", error);
                            });
                    }

                    const clientId = appointmentRequest.clientId;
                    if (!clientDetails[clientId]) {
                        axios.get(`http://localhost:8070/client/${clientId}`)
                            .then(response => {
                                setClientDetails(prevDetails => ({
                                    ...prevDetails,
                                    [clientId]: response.data
                                }));
                            })
                            .catch(error => {
                                console.error("Error fetching client details:", error);
                            });
                    }
                });
            }).catch((err) => {
                alert(err.message);
            });
        }
        getAppointmentRequests();
    }, [lawyerDetails, clientDetails]);


    // get all pending appointments (for specific appointment manager)
    useEffect(() => {
        function getAppointments(){
            axios.get(`http://localhost:8070/appointment/pending/appointment-manager/${id}`).then((res) => {
                console.log(res.data);
                setAppointments(res.data);
            }).catch((err) => {
                alert(err.message);
            })
        }
        getAppointments();
    }, [id])

    //get details related to appointment manager
    useEffect(() => {
        function getAppointmentManager(){
            axios.get(`http://localhost:8070/appointmentmanager/${id}`).then((res) => {
                console.log(res.data);
                setAppointmentManager(res.data);
            }).catch((err) => {
                alert(err.message);
            })
        }
        getAppointmentManager();
    }, [id])


    return (
        <div>
            <NavBar />
            <hr />

            <div className="apm-container">
                <h1 className="apm-header">Appointment Manager Dashboard</h1>

                <p className="apm-user-welcome">Welcome {appointmentManager.fName} {appointmentManager.lName}</p>
                <p className="apm-user-welcome">User ID : {appointmentManager.userId}</p>

                <h2>Received Appointment Requests</h2>
                <table border='1' className="apm-summary-table">
                    <thead>
                        <tr className="apm-summary-table-row">
                            <th className="apm-summary-table-header">Request Date</th>
                            <th className="apm-summary-table-header">Request Name</th>                            
                            <th className="apm-summary-table-header">Request Type</th>
                            <th className="apm-summary-table-header">Lawyer Name</th>
                            <th className="apm-summary-table-header">Lawyer Mobile</th>
                            <th className="apm-summary-table-header">Client Name</th>
                            <th className="apm-summary-table-header">Client Mobile</th>
                            <th className="apm-summary-table-header">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            appointmentrequest.map(appointmentrequest => {
                                return (
                                    <tr className="apm-summary-table-row" key={appointmentrequest._id}>
                                        <td className="apm-summary-table-data">{
                                              new Date(appointmentrequest.appointmentRequestDate).toISOString().split('T')[0]
                                        }
                                        </td>
                                        <td className="apm-summary-table-data">{appointmentrequest.appointmentRequestName}</td>
                                        <td className="apm-summary-table-data">{appointmentrequest.appointmentType}</td>
                                        <td className="apm-summary-table-data">
                                            {lawyerDetails[appointmentrequest.lawyerId]
                                                ? `${lawyerDetails[appointmentrequest.lawyerId].fName} ${lawyerDetails[appointmentrequest.lawyerId].lName}`
                                                : 'Loading...'}
                                        </td>
                                        <td className="apm-summary-table-data">
                                            {lawyerDetails[appointmentrequest.lawyerId]
                                                ? lawyerDetails[appointmentrequest.lawyerId].phoneNumber
                                                : 'Loading...'}
                                        </td>
                                        <td className="apm-summary-table-data">
                                            {clientDetails[appointmentrequest.clientId]
                                                ? `${clientDetails[appointmentrequest.clientId].fname} ${clientDetails[appointmentrequest.clientId].lname}`
                                                : 'Loading...'} 
                                        </td>
                                        <td className="apm-summary-table-data">{appointmentrequest.appointmentType}</td>
                                        <td className="apm-summary-table-action">
                                            <a className="apm-summary-table-button" href={`/appointment-manager-dashboard/view-appointment-request/${appointmentrequest._id}/${id}`}>View Request</a>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                <a className="apm-view-button" href="/appointment-manager-dashboard/view-all-appointment-requests/">View Previous Appointment Requests</a>

                <h2>Upcoming Appointments</h2>
                <table border='1' className="apm-summary-table">
                    <thead>
                        <tr className="apm-summary-table-row">
                            <th className="apm-summary-table-header">Appointment Date</th>
                            <th className="apm-summary-table-header">Appointment Name</th>
                            <th className="apm-summary-table-header">Lawyer Name</th>
                            <th className="apm-summary-table-header">Lawyer Mobile</th>
                            <th className="apm-summary-table-header">Client Name</th>
                            <th className="apm-summary-table-header">Client Mobile</th>
                            <th className="apm-summary-table-header">Type</th>
                            <th className="apm-summary-table-header">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                            appointment.map(appointment => {
                                return (
                                    <tr className="apm-summary-table-row" key={appointment._id}>
                                        <td className="apm-summary-table-data">{
                                              new Date(appointment.appointmentCreationDate).toISOString().split('T')[0]
                                        }
                                        </td>
                                        <td className="apm-summary-table-data">{appointment.appointmentTitle}</td>
                                        <td className="apm-summary-table-data">
                                            {lawyerDetails[appointment.lawyerId]
                                                ? `${lawyerDetails[appointment.lawyerId].fName} ${lawyerDetails[appointment.lawyerId].lName}`
                                                : 'Loading...'}
                                        </td>
                                        <td className="apm-summary-table-data">
                                            {lawyerDetails[appointment.lawyerId]
                                                ? lawyerDetails[appointment.lawyerId].phoneNumber
                                                : 'Loading...'}
                                        </td>
                                        <td className="apm-summary-table-data">
                                            {clientDetails[appointment.clientId]
                                                ? `${clientDetails[appointment.clientId].fname} ${clientDetails[appointment.clientId].lname}`
                                                : 'Loading...'}
                                        </td>                                        
                                        <td className="apm-summary-table-data">
                                            {clientDetails[appointment.clientId]
                                                ? clientDetails[appointment.clientId].phone
                                                : 'Loading...'}
                                        </td>

                                        <td className="apm-summary-table-data">{appointment.appointmentStatus}</td>
                                        <td className="apm-summary-table-action"><a className="apm-summary-table-button" href={`/appointment-manager-dashboard/view-appointment/${appointment._id}`}>View Request</a></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                <a className="apm-view-button" href={`/appointment-manager-dashboard/view-all-appointments/${id}`}>View Previous Appointments</a>

            </div>
            <Footer />
        </div>
    )
}

export default Dashboard;