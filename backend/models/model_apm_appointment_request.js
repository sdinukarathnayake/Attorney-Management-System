const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentRequestSchema = new Schema({
    appointmentRequestName: {
        type: String,
        required: [true, 'Appointment request name is required'],
        minlength: [3, 'Appointment request name must be at least 3 characters long'],
        maxlength: [100, 'Appointment request name must be less than 100 characters long']
    },
    appointmentRequestDate: {
        type: Date,
        required: [true, 'Appointment request date is required'],
        validate: {
            validator: function(value) {
                return value instanceof Date && !isNaN(value);
            },
            message: 'Invalid date format for appointment request date'
        }
    },
    appointmentRequestStatus: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled'], // Example of enum validation
        default: 'Pending' // Default status
    },
    lawyerId: {
        type: String,
        required: [true, 'Lawyer ID is required'],
    },
    clientId: {
        type: String,
        required: [true, 'Client ID is required'],
    },
    appointmentType: {
        type: String,
        required: [true, 'Appointment type is required'],
        enum: ['Consultation', 'Follow-up', 'Other'] // Example of enum validation
    },
    appointmentDate: {
        type: Date,
        required: [true, 'Appointment date is required'],
        validate: {
            validator: function(value) {
                return value instanceof Date && !isNaN(value);
            },
            message: 'Invalid date format for appointment date'
        }
    },
    appointmentTime: {
        type: String,
        required: [true, 'Appointment time is required'],
        match: [/^\d{1,2}:\d{2} (AM|PM)$/, 'Appointment time must be in the format HH:MM AM/PM'] // Regex for time format
    },
    appointmentLocation: {
        type: String,
        required: [true, 'Appointment location is required'],
        minlength: [5, 'Appointment location must be at least 5 characters long'],
        maxlength: [200, 'Appointment location must be less than 200 characters long']
    }
});

const AppointmentRequest = mongoose.model("appointmentrequest", appointmentRequestSchema);
module.exports = AppointmentRequest;
