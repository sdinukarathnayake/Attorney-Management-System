// created by : Wickramanayake W A C D

const router = require("express").Router();
let PaymentProof = require("../models/model_fin_payment_proof");

// Add a new payment proof
router.route("/add_paymentProof").post((req, res) => {
    const ProofId = req.body.ProofId;
    const RequestId = req.body.RequestId; // Added `RequestId`
    const lawyerId = req.body.lawyerId; // Added `lawyerId`
    const ClientId = req.body.ClientId; // Changed `ClientName` to `ClientId`
    const FinanceManagerId = req.body.FinanceManagerId; // Corrected spelling for `FinanceManagerId`
    const PaymentDate = req.body.PaymentDate;
    const UploadDate = req.body.UploadDate;
    const ServiceType = req.body.ServiceType;
    const PaymentType = req.body.PaymentType;

    // Creating new payment proof object
    const newPaymentProof = new PaymentProof({
        ProofId,
        RequestId, // Added `RequestId`
        lawyerId, // Added `lawyerId`
        ClientId, // Changed `ClientName` to `ClientId`
        FinanceManagerId, // Corrected spelling for `FinanceManagerId`
        PaymentDate,
        UploadDate,
        ServiceType,
        PaymentType
    });

    // Saving payment proof to database
    newPaymentProof.save()
        .then(() => {
            res.json("New Payment Proof Added");
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json("Error: " + err);
        });
});

// View all payment proofs
router.route("/paymentProofs").get((req, res) => {
    PaymentProof.find()
        .then((paymentProofs) => {
            res.json(paymentProofs);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json("Error: " + err);
        });
});

// Get a specific payment proof by ID
router.route("/paymentProof/:id").get((req, res) => {
    const paymentProofId = req.params.id;

    PaymentProof.findById(paymentProofId)
        .then((paymentProof) => {
            if (paymentProof) {
                res.json(paymentProof);
            } else {
                res.status(404).json("Payment Proof Not Found");
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json("Error in Retrieving Payment Proof");
        });
});

// Update a specific payment proof
router.route("/update_paymentProof/:id").put(async (req, res) => {
    const paymentProofId = req.params.id;

    // Object to hold updated fields
    const updatedPaymentProof = {
        ProofId: req.body.ProofId,
        RequestId: req.body.RequestId, // Added `RequestId`
        lawyerId: req.body.lawyerId, // Added `lawyerId`
        ClientId: req.body.ClientId, // Changed `ClientName` to `ClientId`
        FinanceManagerId: req.body.FinanceManagerId, // Corrected spelling for `FinanceManagerId`
        PaymentDate: req.body.PaymentDate,
        UploadDate: req.body.UploadDate,
        ServiceType: req.body.ServiceType,
        PaymentType: req.body.PaymentType
    };

    try {
        const result = await PaymentProof.findByIdAndUpdate(paymentProofId, updatedPaymentProof, { new: true });

        if (result) {
            res.json("Payment Proof Updated Successfully");
        } else {
            res.status(404).json("Payment Proof Not Found");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json("Error in Updating Payment Proof");
    }
});

// Delete a specific payment proof
router.route("/delete_paymentProof/:id").delete(async (req, res) => {
    const paymentProofId = req.params.id;

    await PaymentProof.findByIdAndDelete(paymentProofId)
        .then(() => {
            res.status(200).send({ status: "Payment Proof Deleted" });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error in Deleting Payment Proof", error: err.message });
        });
});

module.exports = router;