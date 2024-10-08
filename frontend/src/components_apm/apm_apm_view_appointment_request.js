import React, { useState, useEffect } from 'react';
import './appointment_management.css';
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';

function Apm_View_AppointmentRequest() {
    const { id, appointmentManagerId } = useParams(); 
    const navigate = useNavigate();
    const [appointmentrequest, setAppointmentRequests] = useState(null);
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAppointmentRequests(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    

    if (!appointmentrequest) {
        return <div>Loading...</div>;
    }

    return (
        <div className="apm-form-container">
            <hr />
            <h2 className='apm-header'>Lawyer Appointment Request Details</h2>

            <form className="apm-form">            
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
                    readOnly/>
                </div>       
            </form>

            <hr className="form-divider" />

            <form className="apm-form" onSubmit="">
    
            <div className="apm-form-group">
                <label className='apm-form-label' htmlFor="appointmentCreationDate">Appointment Creation Date</label>
                <input className='apm-form-input'
                    type="date"
                    style={{ backgroundColor: '#EEEEEE' }}
                    id="appointmentCreationDate"
                    name="appointmentCreationDate"
                    value={new Date().toISOString().split('T')[0]}
                    onChange={handleChange}
                    readOnly
                />
            </div>

            <div className="apm-form-group">
                <label className='apm-form-label' htmlFor="appointmentTitle">Appointment Title</label>
                <input className='apm-form-input'
                    type="text"
                    id="appointmentTitle"
                    name="appointmentTitle"
                    onChange={handleChange}
                />
            </div>
    
            <div className="apm-form-group">
                <label className='apm-form-label' htmlFor="appointmentDescription">Description</label>
                <textarea className='apm-form-input-textarea'
                    id="appointmentDescription"
                    name="appointmentDescription"
                    onChange={handleChange}
                ></textarea>
            </div>
    
            <div className="apm-form-group">
                <label className='apm-form-label' htmlFor="appointmentManagerId">Appointment Manager Id</label>
                <input className='apm-form-input'
                    type="text"
                    id="appointmentManagerId"
                    name="appointmentManagerId"
                    value={appointmentManagerId}
                    onChange={handleChange}
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
                    onChange={handleChange}
                    readOnly
                />
            </div>
    
            <div className="apm-button-box">                
                <button type="submit" className="apm-table-link-button">Mark As Complete</button>
            </div>    
        </form>
        </div>
    );
}

export default Apm_View_AppointmentRequest;