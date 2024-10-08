import NavBar from "../components_lcm/Lcm_NavBar";
import Footer from "../components_lcm/Lcm_Footer";
import './appointment_management.css';

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

function Apm_Create_AppointmentRequest(){
    
    const { id } = useParams();
    const navigate = useNavigate();

    const [legalcaseManager, setLegalcaseManager] = useState([]);

    const [nic, setNic] = useState('');
    const [client, setClient] = useState(null); // State to store the client details

    const [appointmentRequestName, setappointmentRequestName] = useState("");
    const [appointmentRequestDate, setappointmentRequestDate] = useState("");
    const [appointmentRequestStatus, setappointmentRequestStatus] = useState("Pending");
    const [lawyerId, setlawyerId] = useState(`${id}`);
    const [clientId, setclientId] = useState("");
    const [clientName, setclientName] = useState("");
    const [clientPhone, setclientPhone] = useState("");
    const [appointmentType, setappointmentType] = useState("");
    const [appointmentDate, setappointmentDate] = useState("");
    const [appointmentTime, setappointmentTime] = useState("");
    const [appointmentLocation, setappointmentLocation] = useState("");

    function sendData(e){
        e.preventDefault();
        
        const newAppointmentRequest = {
            appointmentRequestName,
            appointmentRequestDate,
            appointmentRequestStatus,
            lawyerId,
            clientId,
            appointmentType,
            appointmentDate,
            appointmentTime,
            appointmentLocation
        }

        axios.post("http://localhost:8070/appointmentrequest/add-appointment-request", newAppointmentRequest).then(() => {
            alert("Appointment Request Added..");     
            navigate(`/lawyer-dashboard/appointments/${id}`);       
        }).catch((err) => {
            alert(err)
        })
    }
 
     // Get lawyer details
     useEffect(() => {
        function getLegalcaseManager(){
            axios.get(`http://localhost:8070/legalcasemanager/${id}`).then((res) => {
                console.log(res.data);
                setLegalcaseManager(res.data);
            }).catch((err) => {
                alert(err.message); 
            })
        }
        getLegalcaseManager();
    }, [id])


    // Search client details
    const searchClient = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`http://localhost:8070/client/search-client/nic/${nic}`);
            setClient(res.data); // Update the client state with the response data
        } catch (err) {
            console.error(err);
            alert('Error in Retrieving Client');
        }
    };

    //adding searched client to form
    const addClientToForm = () => {
        if (client) {
            setclientId(client.clientId);
            setclientName(`${client.fname} ${client.lname}`);
            setclientPhone(client.phone);
            alert("Client Details Updated");
        } else {
            alert("No client details available. Please search for a client first.");
        }
    };



    return(
        <div className="apm-form-container">
        <NavBar />

        <hr/>

        <h2 className='apm-header'>Appointment Request Creation Form</h2>

        <div className="apm-form">
            <h3>Search Client by NIC</h3>
            <form id="searchForm" onSubmit={searchClient}>
                <label className="apm-form-label" htmlFor="nic">NIC</label>
                <input
                    className="apm-form-input"
                    type="text"
                    id="nic"
                    name="nic"
                    placeholder="Enter NIC"
                    value={nic}
                    onChange={(e) => setNic(e.target.value)}
                    required
                />
                <button type="submit"  className='apm-form-button'>Search</button>                
            </form>

            {client && (
                <div id="clientDetails" className="client-details">
                    <h4>Client Details</h4>

                    <div className="apm-form-group">
                        <label className="apm-form-label" htmlFor="clientId">
                            Client ID
                        </label>
                        <input
                            className="apm-form-input"
                            type="text"
                            id="clientIdShow"
                            name="clientId"
                            value={client.clientId}
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
                        id="clientNameShow"
                        name="clientName"
                        value={`${client.fname} ${client.lname}`}
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
                            id="clientPhoneShow"
                            name="clientPhone"
                            value={client.phone}
                            required
                        />
                    </div>
                    <button type="submit"  className='apm-form-button' onClick={addClientToForm}>Add Client</button>
                </div>
            )}
        </div>

        <hr className="form-divider" />

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
                value={appointmentRequestName}
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
                type="date"
                id="appointmentRequestDate"
                name="appointmentRequestDate"
                value={appointmentRequestDate}
                onChange={(e) => setappointmentRequestDate(e.target.value)}
                required
            />

            </div>
            <div className="apm-form-group" hidden="true">
                <label className="apm-form-label" htmlFor="appointmentRequestStatus">
                    Request Status
                </label>
                <input
                    className="apm-form-input"
                    type="text"
                    id="appointmentRequestStatus"
                    name="appointmentRequestStatus"
                    value="Pending"
                    onChange={(e) => setappointmentRequestStatus(e.target.value)}
                  />           
            </div>   

            <div className="apm-form-group">
            <label className="apm-form-label" htmlFor="lawyerId">
                Lawyer ID
            </label>
            <input
                className="apm-form-input"
                style={{ backgroundColor: '#EEEEEE' }}
                type="text"
                id="lawyerId"
                name="lawyerId"
                value={legalcaseManager.userId}
                onChange={(e) => setlawyerId(e.target.value)}
                readOnly
            />
            </div>
            <div className="apm-form-group">
            <label className="apm-form-label" htmlFor="lawyerName">
                Lawyer Name
            </label>
            <input
                className="apm-form-input"
                style={{ backgroundColor: '#EEEEEE' }}
                type="text"
                id="lawyerName"
                name="lawyerName"
                value={`${legalcaseManager.fName} ${legalcaseManager.lName}`}
                readOnly
            />
            </div>
            <div className="apm-form-group">
            <label className="apm-form-label" htmlFor="lawyerPhone">
                Lawyer Phone
            </label>
            <input
                className="apm-form-input"
                style={{ backgroundColor: '#EEEEEE' }}
                type="text"
                id="lawyerPhone"
                name="lawyerPhone"
                value={legalcaseManager.phoneNumber}
                readOnly
            />
            </div>
            <div className="apm-form-group">
            <label className="apm-form-label" htmlFor="clientId">
                Client ID
            </label>
            <input
                className="apm-form-input"
                style={{ backgroundColor: '#EEEEEE' }}
                type="text"
                id="clientId"
                name="clientId"
                value={clientId}
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
                style={{ backgroundColor: '#EEEEEE' }}
                type="text"
                id="clientName"
                name="clientName"
                value={clientName}
                required
            />
            </div>
            <div className="apm-form-group">
            <label className="apm-form-label" htmlFor="clientPhone">
                Client Phone
            </label>
            <input
                className="apm-form-input"
                style={{ backgroundColor: '#EEEEEE' }}
                type="text"
                id="clientPhone"
                name="clientPhone"
                value={clientPhone}
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
                value={appointmentType}
                onChange={(e) => setappointmentType(e.target.value)}
                required
            >
                <option value="">Select Type</option>
                <option value="Consultation">Consultation</option>
                <option value="Meeting">Meeting</option>
                <option value="Other">Other</option>
            </select>
            </div>
            <div className="apm-form-group">
            <label className="apm-form-label" htmlFor="appointmentDate">
                Appointment Date
            </label>
            <input
                className="apm-form-input"
                type="date"
                id="appointmentDate"
                name="appointmentDate"
                value={appointmentDate}
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
                value={appointmentTime}
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
                value={appointmentLocation}
                onChange={(e) => setappointmentLocation(e.target.value)}
                required
            />
            </div>
            <button className='apm-form-button' type="submit">Submit</button>
        </form>
        <Footer/>
        </div>
    )
}

export default Apm_Create_AppointmentRequest;