const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const appointmentRequestSchema = new Schema({

    // appointment request info
    appointmentRequestDate : {
        type : Date,
        required : true,
    },

    // sender info
    lawyerType : {
        type :String,
        required : true,
    },

    lawyerId : {
        type : String,
        required : true,
    },

    // receiver info
    appointmentManagerId : {
        type : String,
        required : true,
    },
    
    //appointment info
    appointmentType : {
        type : String,
        required : true,
    },

    appointmentName : {
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
    },
})

const AppointmentRequest = mongoose.model("appointmentrequest", appointmentRequestSchema);

module.exports = AppointmentRequest;