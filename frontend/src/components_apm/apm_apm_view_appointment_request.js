import NavBar from "./apm_page_navbar";
import Footer from "./apm_page_footer";
import './appointment_management.css';

import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function Apm_Create_Appointment(){
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [appointmentrequest, setAppointmentRequest] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8070/appointmentrequest/appointment-request/${id}`, appointmentrequest)
            .then((response) => {
                setAppointmentRequest(response.data);
            })
            .catch((err) => {
                console.error(err);
                alert("Error in fetching appointment request data");
            });
    }, [id]);
    
    const [appointmentRequestName, setappointmentRequestName] = useState("");
    const [appointmentRequestDate, setappointmentRequestDate] = useState("");
    const [appointmentRequestStatus, setappointmentRequestStatus] = useState("");
    const [lawyerId, setlawyerId] = useState("");
    const [lawyerName, setlawyerName] = useState("");
    const [lawyerPhone, setlawyerPhone] = useState("");
    const [clientId, setclientId] = useState("C789");
    const [clientName, setclientName] = useState("");
    const [clientPhone, setclientPhone] = useState("");
    const [appointmentCreationDate, setappointmentCreationDate] = useState("");
    const [appointmentTitle, setappointmentTitle] = useState("");
    const [appointmentDescription, setappointmentDescription] = useState("");
    const [appointmentType, setappointmentType] = useState("");
    const [appointmentDate, setappointmentDate] = useState("");
    const [appointmentTime, setappointmentTime] = useState("");
    const [appointmentLocation, setappointmentLocation] = useState("");
    

 
    function sendData(e) {
        e.preventDefault();

        const newAppointment = {
            appointmentRequestName,
            appointmentRequestDate,
            appointmentRequestStatus,
            lawyerId,
            lawyerName,
            lawyerPhone,
            clientId,
            clientName,
            clientPhone,
            appointmentCreationDate,
            appointmentTitle,
            appointmentDescription,
            appointmentType,
            appointmentDate,
            appointmentTime,
            appointmentLocation,
            
        };

        axios.post("http://localhost:8070/appointment/add-appointment", newAppointment)
        .then(() => {
            alert("Appointment Added Successfully");
            navigate("/appointment-manager-dashboard");  
        })
        .catch((err) => {
            alert(err);
        });
    
    }

    if (!appointmentrequest) {
        return <div>Loading...</div>;
    }

    return(
        <div className="apm-form-container">
            <NavBar />

            <hr/>

            <h2 className='apm-header'>Appointment Manager Appointment Request View</h2>

            <form className="apm-form" onSubmit={sendData}>
         
                <div className="apm-form-group">
                <label className="apm-form-label" htmlFor="appointmentRequestName">
                    Request Name
                </label>
                <input
                    className="apm-form-input"
                    type="text"
                    id="appointmentRequestName"
                    name="appointmentRequestName"
                    value={appointmentrequest.appointmentRequestName}
                    onChange={(e) => setappointmentRequestName(e.target.value)}
                    required
                />
                </div>
                <div className="apm-form-group">
                <label className="apm-form-label" htmlFor="appointmentRequestDate">
                    Request Date
                </label>
                <input
                    className="apm-form-input"
                    type="text"
                    id="appointmentRequestDate"
                    name="appointmentRequestDate"
                    value={appointmentrequest.appointmentRequestDate}
                    onChange={(e) => setappointmentRequestDate(e.target.value)}
                    required
                />
                </div>
                <div className="apm-form-group">
                <label className="apm-form-label" htmlFor="appointmentRequestStatus">
                    Request Status
                </label>
                <select
                    className="apm-form-input-select"
                    id="appointmentRequestStatus"
                    name="appointmentRequestStatus"
                    onChange={(e) => setappointmentRequestStatus(e.target.value)}
                    required
                >
                    <option value={appointmentrequest.appointmentRequestStatus}>{appointmentrequest.appointmentRequestStatus}</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                </select>
                </div>   

                <div className="apm-form-group">
                <label className="apm-form-label" htmlFor="lawyerId">
                    Lawyer ID
                </label>
                <input
                    className="apm-form-input"
                    type="text"
                    id="lawyerId"
                    name="lawyerId"
                    value={appointmentrequest.lawyerId}
                    onChange={(e) => setlawyerId(e.target.value)}
                    required
                />
                </div>
                <div className="apm-form-group">
                <label className="apm-form-label" htmlFor="lawyerName">
                    Lawyer Name
                </label>
                <input
                    className="apm-form-input"
                    type="text"
                    id="lawyerName"
                    name="lawyerName"
                    value={appointmentrequest.lawyerName}
                    onChange={(e) => setlawyerName(e.target.value)}
                    required
                />
                </div>
                <div className="apm-form-group">
                <label className="apm-form-label" htmlFor="lawyerPhone">
                    Lawyer Phone
                </label>
                <input
                    className="apm-form-input"
                    type="text"
                    id="lawyerPhone"
                    name="lawyerPhone"
                    value={appointmentrequest.lawyerPhone}
                    onChange={(e) => setlawyerPhone(e.target.value)}
                    required
                />
                </div>
                <div className="apm-form-group">
                <label className="apm-form-label" htmlFor="clientId">
                    Client ID
                </label>
                <input
                    className="apm-form-input"
                    type="text"
                    id="clientId"
                    name="clientId"
                    value={appointmentrequest.clientId}
                    onChange={(e) => setclientId(e.target.value)}
                    required
                />
                </div>
                <div className="apm-form-group">
                <label className="apm-form-label" htmlFor="clientName">
                    Client Name
                </label>
                <input
                    className="apm-form-input"
                    type="text"
                    id="clientName"
                    name="clientName"
                    value={appointmentrequest.clientName}
                    onChange={(e) => setclientName(e.target.value)}
                    required
                />
                </div>
                <div className="apm-form-group">
                <label className="apm-form-label" htmlFor="clientPhone">
                    Client Phone
                </label>
                <input
                    className="apm-form-input"
                    type="text"
                    id="clientPhone"
                    name="clientPhone"
                    value={appointmentrequest.clientPhone}
                    onChange={(e) => setclientPhone(e.target.value)}
                    required
                />
                </div>
                <div className="apm-form-group">
                <label className="apm-form-label" htmlFor="appointmentType">
                    Appointment Type
                </label>
                <select
                    className="apm-form-input-select"
                    id="appointmentType"
                    name="appointmentType"
                    onChange={(e) => setappointmentType(e.target.value)}
                    required
                >
                    <option value={appointmentrequest.appointmentType}>{appointmentrequest.appointmentType}</option>
                    <option value="consultation">Consultation</option>
                    <option value="meeting">Meeting</option>
                    <option value="other">Other</option>
                </select>
                </div>
                <div className="apm-form-group">
                <label className="apm-form-label" htmlFor="appointmentDate">
                    Appointment Date
                </label>
                <input
                    className="apm-form-input"
                    type="text"
                    id="appointmentDate"
                    name="appointmentDate"
                    value={appointmentrequest.appointmentDate}
                    onChange={(e) => setappointmentDate(e.target.value)}
                    required
                />
                </div>
                <div className="apm-form-group">
                <label className="apm-form-label" htmlFor="appointmentTime">
                    Appointment Time
                </label>
                <input
                    className="apm-form-input"
                    type="time"
                    id="appointmentTime"
                    name="appointmentTime"
                    value={appointmentrequest.appointmentTime}
                    onChange={(e) => setappointmentTime(e.target.value)}
                    required
                />
                </div>
                <div className="apm-form-group">
                <label className="apm-form-label" htmlFor="appointmentLocation">
                    Appointment Location
                </label>
                <input
                    className="apm-form-input"
                    type="text"
                    id="appointmentLocation"
                    name="appointmentLocation"
                    value={appointmentrequest.appointmentLocation}
                    onChange={(e) => setappointmentLocation(e.target.value)}
                    required
                />
                </div>

                <hr className="form-divider"/>

                <div className="apm-form-group">
                    <p className="form-divider-text">Enter required information to create appointment</p>
                </div>


                <div className="apm-form-group">
                <label className="apm-form-label" htmlFor="appointmentCreationDate">
                    Appointment Creation Date
                </label>
                <input
                    className="apm-form-input"
                    type="date"
                    id="appointmentCreationDate"
                    name="appointmentCreationDate"
                    value={appointmentCreationDate}
                    onChange={(e) => setappointmentCreationDate(e.target.value)}
                    required
                />
                </div>

                <div className="apm-form-group">
                <label className="apm-form-label" htmlFor="appointmentTitle">
                    Appointment Title
                </label>
                <input
                    className="apm-form-input"
                    type="text"
                    id="appointmentTitle"
                    name="appointmentTitle"
                    value={appointmentTitle}
                    onChange={(e) => setappointmentTitle(e.target.value)}
                    required
                />
                </div>

                <div className="apm-form-group">
                <label className="apm-form-label" htmlFor="appointmentDescription">
                    Appointment Description
                </label>
                <textarea
                    className="apm-form-input-textarea"
                    id="appointmentDescription"
                    name="appointmentDescription"
                    value={appointmentDescription}
                    onChange={(e) => setappointmentDescription(e.target.value)}
                    required>
                </textarea>
                </div>    

                <button className='apm-form-button' type="submit">Submit</button>
            </form>

            <Footer/>
        </div>        
    )
}

export default Apm_Create_Appointment;