const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const replyTicketSchema = new Schema({

        
    supportTicketId : {
        type : String,
        required : true,
		},

    
		replyTicketDate : {
            type : Date,
            required : true,
        },
		
		userType : {
            type : String,
        },
		
        clientId : {
        type : String,
        required : true,
		},

       supAgentId : {
        type : String,
        required : true,
		},

      
        replyTicketMsg : {
            type : String,
        },
        
        replyTicketstatus: {
            type : String,
        }
})

const ReplyTicket = mongoose.model("replyTicket", replyTicketSchema);
module.exports = ReplyTicket;