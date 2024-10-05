const router = require("express").Router();
let appointment = require("../models/model_apm_appointment");

// add new appointment
router.route("/add-appointment").post((req, res) => {
    const appointmentId = req.body.appointmentId;
    const appointmentRequestId = req.body.appointmentRequestId;
    const appointmentManagerId = req.body.appointmentManagerId;
    const lawyerId = req.body.lawyerId;
    const clientId = req.body.clientId;
    const appointmentCreationDate = new Date(); // Set the creation date automatically
    const appointmentTitle = req.body.appointmentTitle;
    const appointmentDescription = req.body.appointmentDescription;
    const discussedPoints = req.body.discussedPoints;
    const agreedPayment = req.body.agreedPayment;
    const requestedDocuments = req.body.requestedDocuments;
    const nextAppointmentDate = req.body.nextAppointmentDate;
    const appointmentStatus = req.body.appointmentStatus;

    // creating new object
    const newAppointment = new appointment({
        appointmentId,
        appointmentRequestId,
        appointmentManagerId,                
        lawyerId,
        clientId,
        appointmentCreationDate,
        appointmentTitle,
        appointmentDescription,
        discussedPoints,
        agreedPayment,
        requestedDocuments,
        nextAppointmentDate,
        appointmentStatus
    })

    // creating appointment request
    newAppointment.save().then(()=>{
        res.json("New Appointment Added..");
        }).catch((err)=>{
                console.log(err);
                res.status(400).json("Error: " + err);
            })
})


// Get a specific appointment request by ID
router.route("/view-appointment/:id").get((req, res) => {
    const appointmentId = req.params.id;
        
    appointment.findOne({appointmentId: appointmentId})
        .then((appointment) => {
            if (appointment) {
                res.json(appointment);
            } else {
                res.status(404).json("Appointment Not Found");
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json("Error in Retrieving Appointment");
        }); 
});


// Update appointment request
router.route("/update-appointment/:id").put(async (req, res) => {
    const appointmentId = req.params.id;

    // Object to hold updated fields
    const updatedAppointment = {
        appointmentId: req.body.appointmentId,
        appointmentRequestId: req.body.appointmentRequestId,
        appointmentManagerId: req.body.appointmentManagerId,        
        lawyerId: req.body.lawyerId,
        clientId: req.body.clientId,
        appointmentCreationDate: new Date(), // Set the creation date automatically
        appointmentTitle: req.body.appointmentTitle,
        appointmentDescription: req.body.appointmentDescription,
        discussedPoints: req.body.discussedPoints,
        agreedPayment: req.body.agreedPayment,
        requestedDocuments: req.body.requestedDocuments,
        nextAppointmentDate: req.body.nextAppointmentDate,
        appointmentStatus: req.body.appointmentStatus
    };

    try {
        const result = await appointment.findOneAndUpdate({appointmentId: appointmentId}, updatedAppointment, { new: true });

        if (result) {
            res.json("Appointment Updated Successfully");
        } else {
            res.status(404).json("Appointment Not Found");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json("Error in Updating Appointment");
    }
});


// delete appointment request
router.route("/delete-appointment/:id").delete(async(req, res)=> {
    let appointmentId = req.params.id;

    await appointment.findOneAndDelete({appointmentId: appointmentId}).then(()=> {
        res.status(200).send({status:"Appointment deleted"});
    }).catch((err)=> {
        console.log(err.messsage);
        res.status(500).send({status:"Error in delete appointment", error:err.messsage})
    })
})

module.exports = router;

/*

// view all appointment request
router.route("/view-all-appointments").get((req, res)=> {
    appointment.find().then((appointments) => {
        res.json(appointments)
    }).catch((err) => {
        console.log(err);
    })
})

//where appointmentStatus == Pending
router.route("/view-all-appointments/pending").get((req, res) => {

    appointment.find({ appointmentStatus: "Pending" })
    .then((appointment) => {
        if (appointment.length > 0) {
            res.json(appointment);
        } else {
            res.status(404).json("Appointment Request Not Found");
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json("Error in Retrieving Appointment Request");
    });
});


//where appointment  lawyer Id
router.route("/view-all-appointments/lawyer/:id").get((req, res) => {
    const lawyerId = req.params.id;

    appointment.find({ lawyerId: lawyerId })
    .then((appointment) => {
        if (appointment.length > 0) {
            res.json(appointment);
        } else {
            res.status(404).json("Appointment Request Not Found");
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json("Error in Retrieving Appointment Request");
    });
});


//where all appointments & lawyer Id
router.route("/view-all-appointments/pending/lawyer/:id").get((req, res) => {
    const lawyerId = req.params.id;

    appointment.find({ appointmentStatus: "Pending", lawyerId: lawyerId})
    .then((appointment) => {
        if (appointment.length > 0) {
            res.json(appointment);
        } else {
            res.status(404).json("Appointment Request Not Found");
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json("Error in Retrieving Appointment Request");
    });
});



//where appointmentRequestStatus == Pending & client Id
router.route("/view-appointment/pending/client/:id").get((req, res) => {
    const clientId = req.params.id;

    appointment.find({ appointmentStatus: "Pending", clientId: clientId})
    .then((appointment) => {
        if (appointment.length > 0) {
            res.json(appointment);
        } else {
            res.status(404).json("Appointment Request Not Found");
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json("Error in Retrieving Appointment Request");
    });
});


*/