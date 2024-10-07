import NavBar from "./uam_page_navbar";
import Footer from "./uam_page_footer";
import './user_affairs_management.css';

import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {

  const { id } = useParams();
  const [supportTickets, setSupportTickets] = useState([]); 
  
  const [replyTickets, setReplyTickets] = useState([]); 
  const [supportAgent, setSupportAgent] = useState({}); 
  const [clientDetails, setClientDetails] = useState({});

  // Get support ticket details
  useEffect(() => {
    function getSupportTickets() {
      axios.get("http://localhost:8070/supportticket/pending/all").then((res) => { 
        console.log(res.data);
        setSupportTickets(res.data); 

        res.data.forEach(supportTicket => {
          const clientId = supportTicket.clientId;

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
    getSupportTickets();
  }, [clientDetails]);


  // get all pending replies (for specific support agent)
  useEffect(() => {
    function getReplyTickets(){
      axios.get(`http://localhost:8070/replyticket/pending/support-agent/${id}`).then((res) => {
        console.log(res.data);
        setReplyTickets(res.data);

        res.data.forEach(replyTickets => {
        const userId = replyTickets.supAgentId;
                    if (!supportAgent[userId]) {
                        axios.get(`http://localhost:8070/supportagent/${userId}`)
                            .then(response => {
                              setSupportAgent(prevDetails => ({
                                    ...prevDetails,
                                    [userId]: response.data
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
                      getReplyTickets();
    }, [supportAgent, id]);


  //get details related to support agent 
  useEffect(() => { 
    function getSupportAgent(){
      axios.get(`http://localhost:8070/supportagent/${id}`).then((res) => {
        console.log(res.data);
        setSupportAgent(res.data);
      }).catch((err) => {
        alert(err.message);
      })
    }
    getSupportAgent();
  }, [id])
 
  return (
    <div>
        <NavBar />
        <hr />

        <div className="uam-container">
        <h1 className="uam-header">Support Agent Dashboard</h1>

        <p className="uam-user-welcome">Welcome {supportAgent.fName} {supportAgent.lName}</p>
        <p className="uam-user-welcome">User ID : {supportAgent.userId}</p>

        <h2>Received Support Tickets</h2>
        <table border='1' className="uam-summary-table">
        <thead>
            <tr className="uam-summary-table-row">
                <th className="uam-summary-table-header">Ticket Date</th>
                <th className="uam-summary-table-header">Ticket Type</th> 
                <th className="uam-summary-table-header">Subject</th>
                <th className="uam-summary-table-header">Status</th>
                <th className="uam-summary-table-header">Action</th>
            </tr>
        </thead>
        <tbody>
            {
            supportTickets.map(supportTicket => {
                return (
                <tr className="uam-summary-table-row" key={supportTicket._id}>
                    <td className="uam-summary-table-data">{
                    new Date(supportTicket.supTicketDate).toISOString().split('T')[0]
                    }
                    </td>
                    <td className="uam-summary-table-data">{supportTicket.supTicketType}</td>
                    <td className="uam-summary-table-data">{supportTicket.supTicketSubject}</td>
                    <td className="uam-summary-table-data">{supportTicket.supTicketStatus}</td>
                    <td className="uam-summary-table-action">
                        <a className="uam-summary-table-button" href={`/support-agent-dashboard/view-support-ticket/${supportTicket._id}/${id}`}>View Request</a>
                    </td>
                </tr>
                )
            })
            }
        </tbody>
        </table>

        <a className="uam-view-button" href="/support-agent-dashboard/view-all-support-tickets/">View Previous Support Tickets</a>

            <h2>Upcoming Reply Tickets</h2>
            <table border='1' className="uam-summary-table">
            <thead>
                <tr className="uam-summary-table-row">
                    <th className="uam-summary-table-header">Reply Date</th>
                    <th className="uam-summary-table-header">Ticket Type</th> 
                    <th className="uam-summary-table-header">Subject</th>
                    <th className="uam-summary-table-header">Agent Name</th>
                    <th className="uam-summary-table-header">Agent Mobile</th>
                    <th className="uam-summary-table-header">Status</th>
                    <th className="uam-summary-table-header">Action</th>
                </tr>
            </thead>
            <tbody>
                {
                replyTickets.map(replyTicket => {
                    return (
                    <tr className="uam-summary-table-row" key={replyTicket._id}>
                        <td className="uam-summary-table-data">{
                          new Date(replyTicket.replyTicketDate).toISOString().split('T')[0]
                        }</td>
                        <td className="uam-summary-table-data">
                        {supportTickets[replyTicket.clientId]
                            ? supportTickets[replyTicket.clientId].supTicketType
                            : 'Loading...'}
                        </td>
                        <td className="uam-summary-table-data">
                        {supportTickets[replyTicket.clientId]
                            ? supportTickets[replyTicket.clientId].supTicketSubject
                            : 'Loading...'}
                        </td>
                        <td className="uam-summary-table-data">
                        {supportAgent[replyTicket.supAgentId]
                            ? `${supportAgent[replyTicket.supAgentId].fName} ${supportAgent[replyTicket.supAgentId].lName}`
                            : 'Loading...'}
                        </td>
                        <td className="uam-summary-table-data">
                        {supportAgent[replyTicket.supAgentId]
                            ? supportAgent[replyTicket.supAgentId].phoneNumber
                            : 'Loading...'}
                        </td>
                        <td className="uam-summary-table-data">{replyTicket.replyTicketstatus}</td>
                        <td className="uam-summary-table-action"><a className="uam-summary-table-button" href={`/appointment-manager-dashboard/view-reply-ticket/${replyTicket._id}/${id}`}>View Reply</a></td>
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