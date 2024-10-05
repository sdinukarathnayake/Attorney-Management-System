const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({

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
        type : Date,
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
        type : Date,
    },
    
    appointmentStatus : {
        type : String,
    }   
})

const Appointment = mongoose.model("appointment", appointmentSchema);
module.exports = Appointment;