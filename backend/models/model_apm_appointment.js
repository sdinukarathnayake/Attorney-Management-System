const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({

    appointmentId : {
        type : String,    
    },

    appointmentRequestId : {
        type : String,    
    },

    appointmentManagerId : {
        type : String,
    },

    lawyerId : {
        type : String,
    },

    clientId : {
        type :String,
    },

    appointmentCreationDate: {
        type : String,
    },

    appointmentTitle : {
        type : String,
    },

    appointmentDescription : {
        type : String,
    },

    discussedPoints: {
        type : String,
    },

    agreedPayment : {
        type : String,
    },

    requestedDocuments : {
        type : String,
    },
    
    nextAppointmentDate : {
        type : String,
    },
    
    appointmentStatus : {
        type : String,
    }   
})

const Appointment = mongoose.model("appointment", appointmentSchema);
module.exports = Appointment;