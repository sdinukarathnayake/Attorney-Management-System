const express = require("express");
const router = express.Router();
const Deed = require("../models/model_dem_deed"); 
const Client = require("../models/model_cli_client");
const Lawyer = require("../models/model_atm_deed_manager");
//const PaymentRequest = require("../models/model_fin_payment_request"); //change according to charitha's file name for payment model


// Search client with NIC --------------------------------------------------------------
router.get("/search/:nic", async (req, res) => {
    try {
        const client = await Client.findOne({ nic: req.params.nic });
        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }
        res.status(200).json({ message: "Client found", client });
    } catch (error) {
        res.status(500).json({ message: "Error searching client", error: error.message });
    }
});

// Add new deed --------------------------------------------------------------
router.post("/add", async (req, res) => {
    const { assignedLawyer, deedType, preRegisteredNo, title, district, division, considerationValue, grantorNic, granteeNic } = req.body;

    try {
        // Search for the grantor and grantee by NIC
        const grantor = await Client.findOne({ nic: grantorNic });
        const grantee = await Client.findOne({ nic: granteeNic });

        // Check if grantor and/or grantee exist
        if (!grantor && !grantee) {
            return res.status(400).json({ message: "Both Grantor and Grantee not found" });
        } else if (!grantor) {
            return res.status(400).json({ message: "Grantor not found" });
        } else if (!grantee) {
            return res.status(400).json({ message: "Grantee not found" });
        }

        // Count deeds by assigned lawyer
        const deedCount = await  Deed.countDocuments()

        // Calculate deed number
        const deedNo = deedCount + 1;

        // Calculate fees
        const { lawyerFee, taxFee, totalFee } = calculateFees(deedType, considerationValue);

        const newDeed = new Deed({
            assignedLawyer,
            deedType,
            preRegisteredNo,
            title,
            district,
            division,
            considerationValue: parseFloat(considerationValue).toFixed(2),
            grantor: grantor._id,
            grantee: grantee._id,
            deedNo,
            lawyerFee,
            taxFee,
            totalFee
        });

        await newDeed.save();
        res.status(201).json({ message: "Deed added successfully", deed: newDeed });
    } catch (error) {
        res.status(500).json({ message: "Error adding deed", error: error.message });
    }
});

// Calculate Fees--------------------------------------------------------------
function calculateFees(deedType, value) {
    const lawyerFee = value * 0.02; // 2% lawyer fee
    let taxFee = 0;

    if (deedType === "gift") {
        taxFee = value <= 50000 ? value * 0.03 : (50000 * 0.03) + ((value - 50000) * 0.02);
    } else {
        taxFee = value <= 100000 ? value * 0.03 : (100000 * 0.03) + ((value - 100000) * 0.04);
    }

    const totalFee = lawyerFee + taxFee;     
    return {
        lawyerFee: parseFloat(lawyerFee.toFixed(2)),
        taxFee: parseFloat(taxFee.toFixed(2)),
        totalFee: parseFloat(totalFee.toFixed(2))
    };
}

// Read (Fetch all deeds) --------------------------------------------------------------
router.route("/").get(async (req, res) => {
    try {
        const deeds = await Deed.find()
            .populate('grantor', 'fname lname') // Populate grantor with 'fname' and 'lname'
            .populate('grantee', 'fname lname'); // Populate grantee with 'fname' and 'lname'
        res.status(200).json(deeds);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error with fetching deeds", error: err.message });
    }
});

// Update (Update a deed by ID)--------------------------------------------------------------
router.route("/update/:id").put(async (req, res) => {
    const deedID = req.params.id;
    const {
        assignedLawyer, deedType, preRegisteredNo, title, district, division,
        considerationValue, grantorName, grantorNIC, granteeName, granteeNIC
    } = req.body;

    const { lawyerFee, taxFee, totalFee } = calculateFees(deedType, considerationValue);
    const updateDeed = {
        assignedLawyer, deedType, preRegisteredNo, title, district, division,
        considerationValue: parseFloat(considerationValue).toFixed(2), grantorName, grantorNIC, 
        granteeName, granteeNIC,lawyerFee, taxFee, totalFee
    };



    try {
        const updatedDeed = await Deed.findByIdAndUpdate(deedID, updateDeed, { new: true });
        if (updatedDeed) {
            res.status(200).json({ status: "Deed updated", updatedDeed });
        } else {
            res.status(404).json({ status: "Deed not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error with updating deed", error: err.message });
    }
});

// Delete (Delete a deed by ID)--------------------------------------------------------------
router.route("/delete/:id").delete(async (req, res) => {
    const deedID = req.params.id;

    try {
        const deletedDeed = await Deed.findByIdAndDelete(deedID);
        if (deletedDeed) {
            res.status(200).json({ status: "Deed deleted" });
        } else {
            res.status(404).json({ status: "Deed not found" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "Error with deleting deed", error: err.message });
    }
});

// Fetch deed data by ID ---------------------------------------------------------------------------------------------
router.route("/get/:id").get(async (req, res) => {
    const deedID = req.params.id;

    try {
        const deed = await Deed.findById(deedID)
            .populate('grantor', 'fname lname phone nic address') // Populate grantor with necessary fields
            .populate('grantee', 'fname lname phone nic address'); // Populate grantee with necessary fields
        if (deed) {
            res.status(200).json({ status: "Deed fetched", deed });
        } else {
            res.status(404).json({ status: "Deed not found" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "Error with fetching deed", error: err.message });
    }
});

// Fetch all lawyers ---------------------------------------------------------------------------------------------
router.route("/all_Lawyers").get(async (req, res) => {
    try {
        const lawyers = await Lawyer.find();
        if (lawyers.length === 0) {
            return res.status(404).json({ message: "No lawyers found" });
        }
        res.status(200).json(lawyers);
    } catch (err) {
        console.error("Error fetching lawyers:", err);
        res.status(500).json({ message: "Error fetching lawyers", error: err.message });
    }
});


// Get counts for deeds, lawyers, clients, appointment requests, and payment requests
router.get("/counts", async (req, res) => {
    try {
        // Count deeds
        const deedCount = await Deed.countDocuments();

        // Count lawyers
        const lawyerCount = await Lawyer.countDocuments();

        // Count deed clients
        const clientCount = await Client.countDocuments();

        //Count appointment requests
        const appointmentCount = await AppointmentRequest.countDocuments();

        // Count payment requests
        //const paymentRequestCount = await PaymentRequest.countDocuments();

        // Send the counts as a JSON response
        res.status(200).json({
            deedCount,
            lawyerCount,
            clientCount,
            appointmentCount,
            //paymentRequestCount
        });
    } catch (error) {
        console.error("Error fetching counts:", error.message);
        res.status(500).json({ message: "Error fetching counts", error: error.message });
    }
});



// Get all deeds with status not equal to 'Registered'
router.get("/nonRegisteredDeeds", async (req, res) => {
    try {
        const deeds = await Deed.find({ deedStatus: { $ne: "Registered" } })
            .populate("assignedLawyer", "firstName lastName")
            .populate("grantor", "fname lname")
            .populate("grantee", "fname lname");
        
        res.json(deeds);
    } catch (error) {
        res.status(500).json({ message: "Error fetching non-registered deeds", error });
    }
});

// Update deed status
router.put("/updateStatus/:id", async (req, res) => {
    const { id } = req.params;
    const { deedStatus } = req.body;

    try {
        const deed = await Deed.findById(id);
        if (!deed) {
            return res.status(404).json({ message: "Deed not found" });
        }

        deed.deedStatus = deedStatus;
        await deed.save();

        res.json({ message: "Deed status updated", deed });
    } catch (error) {
        res.status(500).json({ message: "Error updating deed status", error });
    }
});

module.exports = router;