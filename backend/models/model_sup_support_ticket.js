const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const supportTicketSchema = new Schema({

		supTicketDate : {
            type : Date,
            required : true,
        },
		
		userType : {
            type : String,
            required : true,
        },
		
        clientId : {
        type : String,
        required : true,
		
		},

        supTicketType : {
            type : String,
            required : true,
        },


        supTicketEmail : {
            type : String,
        },

        supFormPhone : {
            type : String,
        },

        supTicketSubject: {
            type : String,
        },
        supTicketMsg : {
            type : String,
        },
        
        supTicketStatus: {
            type : String,
        }, 
})

const SupportTicket = mongoose.model("supportTicket", supportTicketSchema);
module.exports = SupportTicket;