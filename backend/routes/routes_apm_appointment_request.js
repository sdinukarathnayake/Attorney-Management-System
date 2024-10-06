const router = require("express").Router();
let appointmentRequest = require("../models/model_apm_appointment_request");

router.route("/add-appointment-request").post((req, res) => {
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
router.route("/:id").get((req, res) => {
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
router.route("/update/:id").put(async (req, res) => {
    const appointmentRequestId = req.params.id;

    // Object to hold updated fields
    const updatedAppointmentRequest = {
        appointmentRequestName: req.body.appointmentRequestName,
        appointmentRequestDate: new Date(req.body.appointmentRequestDate),
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
router.route("/delete/:id").delete(async(req, res)=> {
    let appointmentRequestId = req.params.id;

    await appointmentRequest.findByIdAndDelete(appointmentRequestId).then(()=> {
        res.status(200).send({status:"Appointment Request Deleted"});
    }).catch((err)=> {
        console.log(err.messsage);
        res.status(500).send({status:"Error in Appointment Request Delete", error:err.messsage})
    })
})


// -------- dashboards ------------
//appointment manager dashboard - all pending appointments (for any appointment manager)
router.route("/pending").get((req, res) => {
    const appointmentManagerId = req.params.id;

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


//appointment manager dashboard - all pending appointments (for specific appointment manager)
router.route("/pending/appointment-manager/:id").get((req, res) => {
    const appointmentManagerId = req.params.id;

    appointmentRequest.find({ appointmentRequestStatus: "Pending", appointmentManagerId: appointmentManagerId })
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


//lawyer dashboard - all pending appointments (for specific lawyer)
router.route("/pending/lawyer/:id").get((req, res) => {
    const lawyerId = req.params.id;

    appointmentRequest.find({ appointmentRequestStatus: "Pending", lawyerId: lawyerId })
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


//client dashboard - all pending appointments (for specific client)
router.route("/pending/client/:id").get((req, res) => {
    const clientId = req.params.id;

    appointmentRequest.find({ appointmentRequestStatus: "Pending", clientId: clientId })
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


//appointment manager dashboard - all appointments (for specific appointment manager)
router.route("/appointment-manager/:id").get((req, res) => {
    const appointmentManagerId = req.params.id;

    appointmentRequest.find({ appointmentManagerId: appointmentManagerId })
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


//lawyer dashboard - all appointments (for specific lawyer)
router.route("/lawyer/:id").get((req, res) => {
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


//client dashboard - all appointments (for specific client)
router.route("/client/:id").get((req, res) => {
    const clientId = req.params.id;

    appointmentRequest.find({ clientId: clientId })
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

module.exports = router;