const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    appointmentRequestId: {
        type: String,
        rrequired: true,
    },
    appointmentManagerId: {
        type: String,
        required: true,
    },
    lawyerId: {
        type: String,
        required: true,
    },
    clientId: {
        type: String,
        required: true,
    },
    appointmentCreationDate: {
        type: Date,
        required: true,
    },
    appointmentTitle: {
        type: String,
        required: true,
    },
    appointmentDescription: {
        type: String,
        required: true,
    },
    appointmentStatus: {
        type: String,
    }
});

const Appointment = mongoose.model("appointment", appointmentSchema);
module.exports = Appointment;
