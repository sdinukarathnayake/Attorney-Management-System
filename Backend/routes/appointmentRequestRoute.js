const router = require("express").Router();
let appointmentRequest = require("../models/apm_appointment_request");

router.route("/add_appointment_request").post((req, res) => {

    const appointmentRequestDate = Date(req.body.appointmentRequestDate);
    const lawyerType = req.body.lawyerType;
    const lawyerId = req.body.lawyerId;
    const appointmentManagerId = req.body.appointmentManagerId; 
    const appointmentType  = req.body.appointmentType;
    const appointmentName = req.body.appointmentName;
    const appointmentDate = Date(req.body.appointmentDate);
    const appointmentTime = req.body.appointmentTime;
    const appointmentLocation  = req.body.appointmentLocation;

    // creating new object
    const newAppointmentRequest = new appointmentRequest({
        appointmentRequestDate,
        lawyerType,
        lawyerId,
        appointmentManagerId,
        appointmentType,
        appointmentName, 
        appointmentDate,
        appointmentTime,
        appointmentLocation 
    })

    // creating appointment request
    newAppointmentRequest.save().then(()=>{
        res.json("New Appointment Request Added");
        }).catch(()=>{
                console.log(err);
            })
})


// view all appointment request
router.route("/appointment_requests").get((req, res)=> {
    appointmentRequest.find().then((appointmentrequests) => {
        res.json(appointmentrequests)
    }).catch((err) => {
        console.log(err);
    })
})


module.exports = router;