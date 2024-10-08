import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from './Dom_Footer';
import DomNavbar from './Dom_NavBar';
import Call from '@mui/icons-material/PendingActions';
import Request from '@mui/icons-material/ContentPasteGo';
import Submit from '@mui/icons-material/FilePresent'; 
import Approved from '@mui/icons-material/AssignmentTurnedIn';
import Rejected from '@mui/icons-material/AssignmentLate'; 
import { useNavigate } from "react-router-dom";
import { Bar, Pie } from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement} from 'chart.js';
import { useParams } from 'react-router-dom';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);


function Dom_Dashboard() {
    const navigate = useNavigate();
    const [documentCall, setDocumentCall] = useState([]);
    const [documentRequest, setdocumentRequest] = useState([]);
    const [documentSubmitted, setdocumentSubmitteda] = useState([]);

    const [searchCall, setSearchCall] = useState("");
    const [searchRequest, setSearchRequest] = useState("");
    const [searchSubmitted, setSearchSubmitted] = useState("");

    const [FilteredsRejectedApproved, setFilteredsRejectedApproved] = useState([]);
    const [FilteredsApproved, setFilteredsApproved] = useState([]);
    const [FilteredsRejected, setFilteredsRejected] = useState([]);

    const { id } = useParams();

    const document_manager_id = {id}; 

    useEffect(() => {
        function get_all_document_request() {
          axios
            .get("http://localhost:8070/document_request/get_all_document_request")
            .then((res) => {
                setFilteredsRejectedApproved(res.data.filter(rejectedapproved => rejectedapproved.docRequestStatues === "Approved" || rejectedapproved.docRequestStatues === "Rejected"));
                setFilteredsApproved(res.data.filter(rejectedapproved => rejectedapproved.docRequestStatues === "Approved"));
                setFilteredsRejected(res.data.filter(rejectedapproved => rejectedapproved.docRequestStatues === "Rejected"));

            })
            .catch((err) => {
              alert(err.message);
            });
        }
        get_all_document_request();
      }, []);
      
    

    useEffect(() => {
        async function get_all_document_call() {
            try {
                const res = await axios.get("http://localhost:8070/document_call/get_all_document_call/Pending");
                setDocumentCall(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                alert(err.message);
            }
        }
        get_all_document_call();
    }, []);

    const document_call_view_page = (id) => {
        navigate(`/Dom_request_dom/${id}/${document_manager_id}`);
    };

    useEffect(() => {
        async function get_all_document_request() {
            try {
                const res = await axios.get("http://localhost:8070/document_request/get_all_document_request/Request");
                setdocumentRequest(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                alert(err.message);
            }
        }
        get_all_document_request();
    }, []);

    const documentrequestView = (id) => {
        navigate(`/Dom_request_view/${id}`);
    };


    useEffect(() => {
      async function get_all_document_submitted() {
          try {
              const res = await axios.get("http://localhost:8070/document_request/get_all_document_request/Submitted");
              setdocumentSubmitteda(Array.isArray(res.data) ? res.data : []); // Ensure it's set as an array
          } catch (err) {
              alert(err.message);
          }
      }
      get_all_document_submitted();
  }, []);

  
  const document_request_submitted_view_page = (id) => {
      navigate(`/dom_request_submitted_view/${id}`);
  };


    // Search functionality
    const filteredDocumentCalls = documentCall.filter(doc =>
        doc.clientID && doc.clientID.toLowerCase().includes(searchCall.toLowerCase()) ||
        doc.lawerID && doc.lawerID.toLowerCase().includes(searchCall.toLowerCase()) ||
        doc.caseNumber && doc.caseNumber.toLowerCase().includes(searchCall.toLowerCase())
    );

    const filteredDocumentRequests = documentRequest.filter(doc =>
        doc.clientID && doc.clientID.toLowerCase().includes(searchRequest.toLowerCase()) ||
        doc.lawerID && doc.lawerID.toLowerCase().includes(searchRequest.toLowerCase())
    );

    const filteredDocumentSubmitted = documentSubmitted.filter(doc =>
        doc.clientID && doc.clientID.toLowerCase().includes(searchSubmitted.toLowerCase())
    );



  // Data for Pie Chart
  const pieData = {
    labels: ['Accept Document', 'Reject Document'],
    datasets: [{
        data: [FilteredsApproved.length, FilteredsRejected.length],
        backgroundColor: ['rgba(76,175,80, 0.9)', 'rgb(163,0,0, 0.6)']
    }]
};

// Data for Bar Chart
const barData = {
    labels: ['Pending', 'Request', 'Submitted'],
    datasets: [{
        label: 'Number of Documents',
        data: [documentCall.length, documentRequest.length, documentSubmitted.length],
        backgroundColor: ['rgba(255,153,34)','rgba(255,153,34)','rgba(255,153,34)'],
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
    }]
};



    return (
        <div>
            <DomNavbar />
            <h2 className="dashboard-title">Document Manager Dashboard</h2>

            <div className="dom-dashboard-count-btn">
                <div
                    className="dom-dashboard-count-box"
                    style={{ cursor: 'pointer', margin: '10px', padding: '15px', backgroundColor: '#f1f1f1', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
                    
                >
                    <Call /> Document Call <span>{documentCall.length}</span>
                </div>
                <div
                    className="dom-dashboard-count-box"
                    style={{ cursor: 'pointer', margin: '10px', padding: '15px', backgroundColor: '#f1f1f1', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
                    
                >
                    <Request /> Document Request <span>{documentRequest.length}</span>
                </div>
                <div
                    className="dom-dashboard-count-box"
                    style={{ cursor: 'pointer', margin: '10px', padding: '15px', backgroundColor: '#f1f1f1', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
                    
                >
                    <Submit /> Client Submitted Document <span>{documentSubmitted.length}</span>
                </div>
                <div
                    className="dom-dashboard-count-box"
                    style={{ cursor: 'pointer', margin: '10px', padding: '15px', backgroundColor: '#f1f1f1', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
                    
                >
                    <Approved /> Approved Document <span>{FilteredsApproved.length}</span>
                </div>
                <div
                    className="dom-dashboard-count-box"
                    style={{ cursor: 'pointer', margin: '10px', padding: '15px', backgroundColor: '#f1f1f1', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
                    
                >
                    <Rejected /> Rejected Document <span>{FilteredsRejected.length}</span>
                </div>
            </div>

            <div className="Charts">
                
                <div className="pie">
                <Pie data={pieData}  />
                </div>

                <div className="bar">
                <Bar data={barData} options={{ responsive: true }} /> 
                </div>
            </div>

            <div className="tables">
            
                <div className="search">
                <h3 className="search-title1">Received Document Calls</h3><br />
                <input
                        type="text"
                        className="search-bar"
                        placeholder="Search..."
                        value={searchCall}
                        onChange={(e) => setSearchCall(e.target.value)}
                        style={{ borderRadius: '18px', border: '2px solid #7a7a7a', width: '250px' }}
                    />
                </div>
                
                <table>
                    <thead>
                        <tr>
                            <th>Document Call ID</th>
                            <th>Lawyer ID</th>
                            <th>Client ID</th>
                            <th>Case Number</th>
                            <th>Need Document</th>
                            <th>Document Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDocumentCalls.map((documentcall) => {
                            // Format the Document Call ID
                            const formattedId = `DOC-000${String(documentcall.documentCallID)}`;
                            return (
                                <tr key={documentcall._id}>
                                    <td>{formattedId}</td>
                                    <td>{documentcall.lawerID}</td>
                                    <td>{documentcall.clientID}</td>
                                    <td>{documentcall.caseNumber}</td>
                                    <td>{documentcall.needDocument}</td>
                                    <td>{documentcall.docCallStatues}</td>
                                    <td>
                                        <button 
                                            type="button" 
                                            className="dom-call-dashboard-view" 
                                            onClick={() => document_call_view_page(documentcall._id)}>
                                            View
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <br /><br /><br />



                <div className="search">
                <h3 className="search-title2">Received Document Requests from Client</h3><br />
                <input
                        type="text"
                        className="search-bar"
                        placeholder="Search..."
                        value={searchRequest}
                        onChange={(e) => setSearchRequest(e.target.value)}
                        style={{ borderRadius: '18px', border: '2px solid #7a7a7a', width: '250px' }}
                    />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Request ID</th>
                            <th>Call ID</th>
                            <th>Lawyer ID</th>
                            <th>Client ID</th>
                            <th>Deadline</th>
                            <th>Document Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {filteredDocumentRequests.map((documentrequest) => {
                        const formattedId = `DOR-000${String(documentrequest.documentRequestID)}`;
                        return (
                            <tr key={documentrequest._id}>
                                <td>{formattedId}</td>
                                <td>{documentrequest.documentCallID}</td>
                                <td>{documentrequest.lawerID}</td>
                                <td>{documentrequest.clientID}</td>
                                <td>{documentrequest.documentDeadline}</td>
                                <td>{documentrequest.docRequestStatues}</td>
                                <td>
                                    <button type="button" className="dom-call-dashboard-view" onClick={() => documentrequestView(documentrequest._id)}> View </button>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table><br /><br /><br />


                <div className="search">
                <h3 className="search-title3">Received Document Submitted from Client</h3><br />
                <input
                        type="text"
                        className="search-bar"
                        placeholder="Search..."
                        value={searchSubmitted}
                        onChange={(e) => setSearchSubmitted(e.target.value)}
                        style={{ borderRadius: '18px', border: '2px solid #7a7a7a', width: '250px' }}
                    />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Request ID</th>
                            <th>Call ID</th>
                            <th>Lawer ID</th>
                            <th>Client ID</th>
                            <th>Deadline</th>
                            <th>Document Statues</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {filteredDocumentSubmitted.map((documentrequest) => {
                            const formattedId = `DOR-000${String(documentrequest.documentRequestID)}`;
                            return (
                                <tr key={documentrequest._id}>
                                    <td>{formattedId}</td>
                                    <td>{documentrequest.documentCallID}</td>
                                    <td>{documentrequest.lawerID}</td>
                                    <td>{documentrequest.clientID}</td>
                                    <td>{documentrequest.documentDeadline}</td>
                                    <td>{documentrequest.docRequestStatues}</td>
                                    <td>
                                    <button type="button" className="dom-call-dashboard-view" onClick={() => document_request_submitted_view_page(documentrequest._id)}> View </button>
                                </td>
                            </tr>
                            );
                        })}
                    </tbody>
                </table><br /><br /><br />


                <h3 className="search-title3">Approve or Reject Document</h3><br />
                <table>
                    <thead>
                        <tr>
                            <th>Request ID</th>
                            <th>Call ID</th>
                            <th>Lawer ID</th>
                            <th>Client ID</th>
                            <th>Deadline</th>
                            <th>Document Statues</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {FilteredsRejectedApproved.map((documentrequest) => {
                            const formattedId = `DOR-000${String(documentrequest.documentRequestID)}`;
                            return (
                                <tr key={documentrequest._id}>
                                    <td>{formattedId}</td>
                                    <td>{documentrequest.documentCallID}</td>
                                    <td>{documentrequest.lawerID}</td>
                                    <td>{documentrequest.clientID}</td>
                                    <td>{documentrequest.documentDeadline}</td>
                                    <td>{documentrequest.docRequestStatues}</td>
                                    <td>
                                    <button type="button" className="dom-call-dashboard-view" onClick={() => document_request_submitted_view_page(documentrequest._id)}> View </button>
                                </td>
                            </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
};

export default Dom_Dashboard;