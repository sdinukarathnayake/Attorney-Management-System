import NavBar from "./apm_page_navbar";
import Footer from "./apm_page_footer";

import React, { useState, useEffect } from 'react';
import './appointment_management.css';
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';

function Apm_View_AppointmentRequest() {
    const { id, appointmentManagerId } = useParams(); 
    const navigate = useNavigate();
    const [appointmentrequest, setAppointmentRequests] = useState({});
    const [clientDetails, setClientDetails] = useState({});

    useEffect(() => {
        function getAppointmentRequests() {
            axios.get(`http://localhost:8070/appointmentrequest/${id}`)
                .then((res) => {
                    setAppointmentRequests(res.data);

                    const clientId = res.data.clientId;
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
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
        getAppointmentRequests();
    }, [clientDetails, id]);


    // appointmen create 
    const HandleSubmit = () => {
        const [appointmentData, setAppointmentData] = useState({
          appointmentRequestId: '',
          appointmentManagerId: '',
          lawyerId: '',
          clientId: '',
          appointmentCreationDate: new Date().toISOString(), 
          appointmentTitle: '',
          appointmentDescription: '',

        });
      
        const handleChange = (event) => {
          setAppointmentData({
            ...appointmentData,
            [event.target.name]: event.target.value,
          });
        };
      
        const handleSubmit = async (event) => {
          event.preventDefault(); 
      
      
            try {
                const response = await axios.post('http://localhost:8070/appointment/add-appointment', appointmentData);
                console.log(response.data); 
            } catch (error) {
                console.error(error);
                // Handle error message (optional)
            } 
        }

    if (!appointmentrequest) {
        return <div>Loading...</div>;
    }
}

    return (
        <div className="apm-form-container">
            <NavBar/>

            <hr />
            <h2 className='apm-header'>Lawyer Appointment Request Details</h2>
     
            <form className="apm-form" onSubmit={HandleSubmit}>
                <div className="apm-form-group">
                <label className="apm-form-label" htmlFor="appointmentRequestName">
                    Request Name
                </label>
                <input
                    className="apm-form-input"
                    type="text"
                    id="appointmentRequestName"
                    name="appointmentRequestName"
                    value={appointmentrequest.appointmentRequestName || ''}
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
                    value={new Date(appointmentrequest.appointmentRequestDate).toISOString().split('T')[0]}
                    required
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
                    value={appointmentrequest.lawyerId || ''}
                    readOnly
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
                    value={appointmentrequest.clientId || ''}
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
                    value={clientDetails[appointmentrequest.clientId]
                        ? `${clientDetails[appointmentrequest.clientId].fname} ${clientDetails[appointmentrequest.clientId].lname}`
                        : 'Loading...'}
                    readOnly
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
                    value={clientDetails[appointmentrequest.clientId]?.phone || ''}
                    readOnly
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
                    value={appointmentrequest.appointmentType}
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
                    value={new Date(appointmentrequest.appointmentDate).toISOString().split('T')[0]}
                    required
                />
                </div>

                <div className="apm-form-group">
                <label className="apm-form-label" htmlFor="appointmentTime">
                    Appointment Time
                </label>
                <input
                    className="apm-form-input"
                    type="text"
                    id="appointmentTime"
                    name="appointmentTime"
                    value={appointmentrequest.appointmentTime}
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
                    value={appointmentrequest.appointmentLocation || ''}
                    required
                />
                </div>         

                <div className="apm-form-group">
                <label className="apm-form-label" htmlFor="appointmentRequestStatus">
                    Request Status
                </label>
                <input
                    className="apm-form-input"
                    style={{ backgroundColor: '#EEEEEE' }}
                    type="text"
                    id="appointmentRequestStatus"
                    name="appointmentRequestStatus"
                    value={appointmentrequest.appointmentRequestStatus}
                    readOnly/>
                </div>       
            </form>


            <hr className="form-divider" />

         
            <form className="apm-form" onSubmit="handleSubmit">

            <div className="apm-form-group">
                <label className='apm-form-label' htmlFor="appointmentrequest">Appointment Request Id</label>
                <input className='apm-form-input'
                    type="text"
                    style={{ backgroundColor: '#EEEEEE' }}
                    id="appointmentrequest"
                    name="appointmentrequest"                    
                />
            </div>
    
            <div className="apm-form-group">
                <label className='apm-form-label' htmlFor="appointmentCreationDate">Appointment Creation Date</label>
                <input className='apm-form-input'
                    type="Date"
                    style={{ backgroundColor: '#EEEEEE' }}
                    id="appointmentCreationDate"
                    name="appointmentCreationDate"                   
                />
            </div>

            <div className="apm-form-group">
                <label className='apm-form-label' htmlFor="lawyerId">Lawyer Id</label>
                <input className='apm-form-input'
                    type="text"
                    style={{ backgroundColor: '#EEEEEE' }}
                    id="lawyerId"
                    name="lawyerId"                   
                />
            </div>

            <div className="apm-form-group">
                <label className='apm-form-label' htmlFor="clientId">Client Id</label>
                <input className='apm-form-input'
                    type="text"
                    style={{ backgroundColor: '#EEEEEE' }}
                    id="clientId"
                    name="clientId"                    
                />
            </div>

            <div className="apm-form-group">
                <label className='apm-form-label' htmlFor="appointmentTitle">Appointment Title</label>
                <input className='apm-form-input'
                    type="text"
                    id="appointmentTitle"
                    name="appointmentTitle"
                    
                />
            </div>
    
            <div className="apm-form-group">
                <label className='apm-form-label' htmlFor="appointmentDescription">Description</label>
                <textarea className='apm-form-input-textarea'
                    id="appointmentDescription"
                    name="appointmentDescription"
                    
                ></textarea>
            </div>
    
            <div className="apm-form-group">
                <label className='apm-form-label' htmlFor="appointmentManagerId">Appointment Manager Id</label>
                <input className='apm-form-input'
                    type="text"
                    id="appointmentManagerId"
                    name="appointmentManagerId"
                    value={appointmentManagerId}
                   
                />
            </div>    
            
            <div className="apm-form-group">
                <label className='apm-form-label' htmlFor="appointmentStatus">Appointment Status</label>
                <input className='apm-form-input'
                    type="text"
                    style={{ backgroundColor: '#EEEEEE' }}
                    id="appointmentStatus"
                    name="appointmentStatus"
                    value="Pending"
                    
                />
            </div>
    
            <div className="apm-button-box">                
            <button type="submit" className="apm-table-link-button"> Mark As Complete</button>
            </div>    
            </form>
            <Footer/>
        </div>
    )
}

export default Apm_View_AppointmentRequest;