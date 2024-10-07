// created by : Wickramanayake W A C D

const router = require("express").Router();
let paymentRQ = require("../models/model_fin_Payment_form");

// add new paymentRQ
router.route("/add_paymentRQ").post((req, res) => {
    const RequestId = req.body.RequestId;
    const RequestDate = req.body.RequestDate;
    const lawyerId = req.body.lawyerId; // Changed `LawyerId` to `lawyerId`
    const ClientId = req.body.ClientId; // Added `ClientId` field
    const ServiceID = req.body.ServiceID;
    const Amount = Number(req.body.Amount);
    const PaymentMethod = req.body.PaymentMethod;

    // creating new object
    const newpaymentRQ = new paymentRQ({
        RequestId,
        RequestDate,
        lawyerId, // Changed `LawyerId` to `lawyerId`
        ClientId, // Added `ClientId` field
        ServiceID,
        Amount,
        PaymentMethod
    });

    // creating paymentRQ request
    newpaymentRQ.save().then(() => {
        res.json("New paymentRQ Added..");
    }).catch((err) => { // Fixed missing parameter `err` in `catch`
        console.log(err);
        res.status(400).json("Error: " + err);
    });
});

// view all paymentRQ request
router.route("/paymentRQ").get((req, res) => {
    paymentRQ.find().then((paymentRQ) => {
        res.json(paymentRQ);
    }).catch((err) => {
        console.log(err);
    });
});

// Get a specific paymentRQ request by ID
router.route("/paymentRQ/:id").get((req, res) => {
    const paymentRQId = req.params.id;

    paymentRQ.findById(paymentRQId)
        .then((paymentRQ) => {
            if (paymentRQ) {
                res.json(paymentRQ);
            } else {
                res.status(404).json("paymentRQ Not Found");
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json("Error in Retrieving paymentRQ");
        });
});

// Update paymentRQ request
router.route("/update_paymentRQ/:id").put(async (req, res) => {
    const paymentRQId = req.params.id;

    // Object to hold updated fields
    const updatedpaymentRQ = {
        RequestId: req.body.RequestId,
        RequestDate: req.body.RequestDate,
        lawyerId: req.body.lawyerId, // Changed `LawyerId` to `lawyerId`
        ClientId: req.body.ClientId, // Added `ClientId` field
        ServiceID: req.body.ServiceID,
        Amount: Number(req.body.Amount),
        PaymentMethod: req.body.PaymentMethod
    };

    try {
        const result = await paymentRQ.findByIdAndUpdate(paymentRQId, updatedpaymentRQ, { new: true });

        if (result) {
            res.json("paymentRQ Updated Successfully");
        } else {
            res.status(404).json("paymentRQ Not Found");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json("Error in Updating paymentRQ");
    }
});

// delete paymentRQ request
router.route("/delete_paymentRQ/:id").delete(async (req, res) => {
    let paymentRQId = req.params.id;

    await paymentRQ.findByIdAndDelete(paymentRQId).then(() => {
        res.status(200).send({ status: "paymentRQ deleted" });
    }).catch((err) => {
        console.log(err.message); // Fixed typo `messsage` to `message`
        res.status(500).send({ status: "Error in delete paymentRQ", error: err.message }); // Fixed typo `messsage` to `message`
    });
});

module.exports = router;