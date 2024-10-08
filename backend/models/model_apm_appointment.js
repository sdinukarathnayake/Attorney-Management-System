const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    appointmentRequestId: {
        type: String,
        required: [true, 'Appointment request ID is required'], // Make it required
    },
    appointmentManagerId: {
        type: String,
        required: [true, 'Appointment manager ID is required'], // Make it required
    },
    lawyerId: {
        type: String,
        required: [true, 'Lawyer ID is required'], // Make it required
    },
    clientId: {
        type: String,
        required: [true, 'Client ID is required'], // Make it required
    },
    appointmentCreationDate: {
        type: Date,
        required: [true, 'Appointment creation date is required'], // Make it required
        validate: {
            validator: function(value) {
                return value instanceof Date && !isNaN(value);
            },
            message: 'Invalid date format for appointment creation date'
        }
    },
    appointmentTitle: {
        type: String,
        required: [true, 'Appointment title is required'],
        minlength: [3, 'Appointment title must be at least 3 characters long'],
        maxlength: [100, 'Appointment title must be less than 100 characters long']
    },
    appointmentDescription: {
        type: String,
        required: [true, 'Appointment description is required'],
        minlength: [10, 'Appointment description must be at least 10 characters long'],
        maxlength: [500, 'Appointment description must be less than 500 characters long']
    },
    discussedPoints: {
        type: String,
        required: [true, 'Discussed points are required'], // Make it required
    },
    agreedPayment: {
        type: String,
        required: [true, 'Agreed payment information is required'], // Make it required
    },
    requestedDocuments: {
        type: String,
    },
    nextAppointmentDate: {
        type: Date,
        validate: {
            validator: function(value) {
                return value instanceof Date && !isNaN(value);
            },
            message: 'Invalid date format for next appointment date'
        }
    },
    appointmentStatus: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled'], // Example of enum validation
        default: 'Pending' // Default status
    }
});

const Appointment = mongoose.model("appointment", appointmentSchema);
module.exports = Appointment;
