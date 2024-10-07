// created by : Wickramanayake W A C D

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const paymentProofSchema = new Schema({
    ProofId: {
        type: String,
        required: true,  // Unique ID for the proof
    },

    RequestId: {
        type: String,
        required: true,  // Unique ID for the Request
    },

    lawyerId: {
        type: String,
        required: true,  // Unique ID for the lawyer
    },
    ClientId: {
        type: String,
        required: true,  // Unique ID for the client
    },
    FinanceManagerId: {
        type: String,
        required: true,  // Unique ID for the finance manager 
    },

    PaymentDate: {
        type: String,  // Date when the payment was made
        required: true,
    },
    

    UploadDate: {
        type: String,  // Date when the proof was uploaded
        required: true,
    },

    ServiceType: {
        type: String,  // Type of service provided
        required: true,
    },

    PaymentType: {
        type: String,  // Method or type of payment (e.g., credit card, bank transfer)
        required: true,
    }
});

const PaymentProof = mongoose.model("PaymentProof", paymentProofSchema);

module.exports = PaymentProof;