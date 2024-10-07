const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CaseSchema = new Schema({
    caseNumber: {
        type: String,
        required: true
    },
    procedure: {
        type: String,
        required: true
    },
    courtType: {
        type: String,
        required: true
    },
    courtArea: {
        type: String,
        required: true
    },
    monetaryValue: {
        type: Number,
        required: true
    },
    caseCreatedDate: {
        type: String,
        required: true
    },
    initialCaseDate: {
        type: String,
        required: true
    },
    neededDocuments: {
        type: String,
        required: true
    },
    nature: {
        type: String,
        required: true
    },
    lawyerId: {
        type: String,
        required: true
    },
    clientId: {
        type: String,
        required: true
    },
    caseStatus: {
        type: String,
        required: true    
    }
});

const Case = mongoose.model("case", CaseSchema);

module.exports = Case; 