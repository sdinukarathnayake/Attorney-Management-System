const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentRequestSchema = new Schema({

    appointmentRequestId : {
        type : String,
        required : true,
    },
    
    appointmentRequestName : {
        type : String,
        required : true,
    },

    appointmentRequestDate : {
        type : Date,
        required : true,
    },

    appointmentRequestStatus : {
        type : String,
    },

    lawyerId : {
        type : String,
        required : true,
    },

    clientId : {
        type :String,
        required : true,
    },

    appointmentType : {
        type : String,
        required : true,
    },
   
    appointmentDate : {
        type : Date,
        required : true,
    },

    appointmentTime : {
        type : String,
        required : true,
    },

    appointmentLocation : {
        type : String,
        required : true,
    } 
})

const AppointmentRequest = mongoose.model("appointmentrequest", appointmentRequestSchema);
module.exports = AppointmentRequest;