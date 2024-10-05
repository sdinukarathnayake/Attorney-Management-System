const router = require("express").Router();
let appointmentRequest = require("../models/model_apm_appointment_request");

router.route("/add-appointment-request").post((req, res) => {
    const appointmentRequestId = req.body.appointmentRequestId;
    const appointmentRequestName = req.body.appointmentRequestName;
    const appointmentRequestDate = new Date(req.body.appointmentRequestDate);
    const appointmentRequestStatus = req.body.appointmentRequestStatus;
    const lawyerId = req.body.lawyerId;
    const clientId = req.body.clientId;   
    const appointmentType = req.body.appointmentType;
    const appointmentDate = new Date(req.body.appointmentDate);
    const appointmentTime = req.body.appointmentTime;
    const appointmentLocation = req.body.appointmentLocation;    


    // creating new object
    const newAppointmentRequest = new appointmentRequest({
        appointmentRequestId,        
        appointmentRequestName,
        appointmentRequestDate,
        appointmentRequestStatus,
        lawyerId,
        clientId,
        appointmentType,
        appointmentDate,
        appointmentTime,
        appointmentLocation
    })

    // creating appointment request
    newAppointmentRequest.save().then(()=>{
        res.json("New Appointment Request Added");
        }).catch((err)=>{
                console.log(err);
            })
})


// Get a specific appointment request by ID
router.route("/view-appointment-request/:id").get((req, res) => {
    const appointmentRequestId = req.params.id;

    appointmentRequest.findById(appointmentRequestId)
        .then((appointmentRequest) => {
            if (appointmentRequest) {
                res.json(appointmentRequest);
            } else {
                res.status(404).json("Appointment Request Not Found");
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json("Error in Retrieving Appointment Request");
        });
});


// Update appointment request
router.route("/update-appointment-request/:id").put(async (req, res) => {
    const appointmentRequestId = req.params.id;

    // Object to hold updated fields
    const updatedAppointmentRequest = {
        appointmentRequestId : req.body.appointmentRequestId,
        appointmentRequestName: req.body.appointmentRequestName,
        appointmentRequestDate: new Date(req.body.appointmentRequestDate), // Use new Date() to create a Date object
        appointmentRequestStatus: req.body.appointmentRequestStatus,
        lawyerId: req.body.lawyerId,
        clientId: req.body.clientId,              
        appointmentType: req.body.appointmentType,
        appointmentDate: new Date(req.body.appointmentDate), 
        appointmentTime: req.body.appointmentTime,
        appointmentLocation: req.body.appointmentLocation,
    };

    try {
        const result = await appointmentRequest.findByIdAndUpdate(appointmentRequestId, updatedAppointmentRequest, { new: true });

        if (result) {
            res.json("Appointment Request Updated Successfully");
        } else {
            res.status(404).json("Appointment Request Not Found");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json("Error in Updating Appointment Request");
    }
});


// delete appointment request
router.route("/delete-appointment-request/:id").delete(async(req, res)=> {
    let appointmentRequestId = req.params.id;

    await appointmentRequest.findByIdAndDelete(appointmentRequestId).then(()=> {
        res.status(200).send({status:"Appointment Request Deleted"});
    }).catch((err)=> {
        console.log(err.messsage);
        res.status(500).send({status:"Error in Appointment Request Delete", error:err.messsage})
    })
})


//appointment manager dashboard - all pending appointment requets
router.route("/appointment-requests/pending").get((req, res) => {

    appointmentRequest.find({ appointmentRequestStatus: "Pending" })
    .then((appointmentRequests) => {
        if (appointmentRequests.length > 0) {
            res.json(appointmentRequests);
        } else {
            res.status(404).json("Appointment Request Not Found");
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json("Error in Retrieving Appointment Request");
    });
});


// Get a specific appointment request by ID
router.route("/appointment-manager/view-appointment-request/:id").get((req, res) => {
    const appointmentRequestId = req.params.id;

    appointmentRequest.findById(appointmentRequestId)
        .then((appointmentRequest) => {
            if (appointmentRequest) {
                res.json(appointmentRequest);
            } else {
                res.status(404).json("Appointment Request Not Found");
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json("Error in Retrieving Appointment Request");
        });
});



module.exports = router;


/*

// view all appointment request
router.route("/appointment-requests").get((req, res)=> {
    appointmentRequest.find().then((appointmentrequests) => {
        res.json(appointmentrequests)
    }).catch((err) => {
        console.log(err);
    })
})

//where appointmentRequestStatus == Pending
    router.route("/appointment-requests/pending").get((req, res) => {

        appointmentRequest.find({ appointmentRequestStatus: "Pending" })
        .then((appointmentRequests) => {
            if (appointmentRequests.length > 0) {
                res.json(appointmentRequests);
            } else {
                res.status(404).json("Appointment Request Not Found");
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json("Error in Retrieving Appointment Request");
        });
    });


//where appointmentRequestStatus == Pending & lawyer Id
router.route("/appointment-requests/pending/lawyer/:id").get((req, res) => {
    const lawyerId = req.params.id;

    appointmentRequest.find({ appointmentRequestStatus: "Pending", lawyerId: lawyerId})
    .then((appointmentRequests) => {
        if (appointmentRequests.length > 0) {
            res.json(appointmentRequests);
        } else {
            res.status(404).json("Appointment Request Not Found");
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json("Error in Retrieving Appointment Request");
    });
});

//all appointmentRequest & lawyer Id
router.route("/appointment-requests/lawyer/:id").get((req, res) => {
    const lawyerId = req.params.id;

    appointmentRequest.find({ lawyerId: lawyerId })
    .then((appointmentRequests) => {
        if (appointmentRequests.length > 0) {
            res.json(appointmentRequests);
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