const express = require("express");
const router = express.Router();
const Deed = require("../models/model_dem_deed");
const Client = require("../models/model_cli_clients");
const Lawyer = require("../models/model_atm_deed_manager"); 
const AppointmentRequest = require("../models/model_apm_appointment_request");
const PaymentRequest = require("../models/model_fin_Payment_form"); 
 

// Search client with NIC ------------------------------ --------------------------------
router.get("/search/nic/:nic", async (req, res) => {
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
            grantorNic,
            grantee: grantee._id,
            granteeNic,
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
        const paymentRequestCount = await PaymentRequest.countDocuments();

        // Send the counts as a JSON response
        res.status(200).json({
            deedCount,
            lawyerCount,
            clientCount,
            appointmentCount,
            paymentRequestCount
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
            .populate("assignedLawyer", "fName lName")
            .populate("grantor", "fname lname")
            .populate("grantee", "fname lname");
        
        res.json(deeds);
    } catch (error) {
        res.status(500).json({ message: "Error fetching non-registered deeds", error });
    }
});

// Update status of a deed by ID -------------------------------------------------------------------------------
router.route("/updateStatus/:id").put(async (req, res) => {
    const deedID = req.params.id;
    const { deedStatus } = req.body; 

    const updateStatus = {
        deedStatus
    };

    try {
        const updatedDeed = await Deed.findByIdAndUpdate(deedID, updateStatus, { new: true });
        if (updatedDeed) {
            res.status(200).json({ status: "Deed status updated", updatedDeed });
        } else {
            res.status(404).json({ status: "Deed not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error with updating deed status", error: err.message });
    }
});

// Search Deeds by lawyer name, client name, and other fields------------------------------------------------------
router.get("/search/:query", async (req, res) => {
    const searchQuery = req.params.query;

    try {
        // Step 1: Search for matching Lawyers
        const lawyers = await Lawyer.find({
            $or: [
                { firstName: { $regex: searchQuery, $options: 'i' } },
                { lastName: { $regex: searchQuery, $options: 'i' } }
            ]
        });

        // Step 2: Search for matching Clients
        const clients = await Client.find({
            $or: [
                { fname: { $regex: searchQuery, $options: 'i' } },
                { lname: { $regex: searchQuery, $options: 'i' } }
            ]
        });

        // Step 3: Extract the IDs of Lawyers and Clients
        const lawyerIds = lawyers.map(lawyer => lawyer._id);
        const clientIds = clients.map(client => client._id);

        // Step 4: Search for Deeds that reference these Lawyer and Client IDs
        const deeds = await Deed.find({
            $or: [
                { assignedLawyer: { $in: lawyerIds } },
                { grantor: { $in: clientIds } },
                { grantee: { $in: clientIds } },
                { title: { $regex: searchQuery, $options: 'i' } },  
                { deedType: { $regex: searchQuery, $options: 'i' } },
                { preRegisteredNo: { $regex: searchQuery, $options: 'i' } },
                { district: { $regex: searchQuery, $options: 'i' } },
                { division: { $regex: searchQuery, $options: 'i' } },
                { grantorNic: { $regex: searchQuery, $options: 'i' } },
                { granteeNic: { $regex: searchQuery, $options: 'i' } }
            ]
        })
        .populate('grantor', 'fname lname')
        .populate('grantee', 'fname lname')
        .populate('assignedLawyer', 'firstName lastName');

        // Step 5: Return the result or handle if no deeds found
        if (deeds.length === 0) {
            return res.status(404).json({ message: "No deeds found matching your query." });
        }

        res.status(200).json(deeds);

    } catch (error) {
        res.status(500).json({ message: "Error searching deeds", error: error.message });
    }
});

//Pie Chart-------------------------------------------------------------------------------------
router.get("/deeds-per-lawyer", async (req, res) => {
    try {
        const deedsPerLawyer = await Deed.aggregate([
            {
                $group: {
                    _id: "$assignedLawyer", // Group by lawyer ID
                    deedCount: { $sum: 1 } // Count number of deeds
                }
            },
            {
                $lookup: {
                    from: "lawyers", // Lookup lawyer details from the "lawyers" collection
                    localField: "_id",
                    foreignField: "_id",
                    as: "lawyerInfo"
                }
            },
            {
                $unwind: "$lawyerInfo"
            },
            {
                $project: {
                    _id: 0,
                    lawyerName: { $concat: ["$lawyerInfo.firstName", " ", "$lawyerInfo.lastName"] },
                    deedCount: 1
                }
            }
        ]);

        res.json(deedsPerLawyer);
    } catch (error) {
        console.error("Error fetching deeds per lawyer:", error);
        res.status(500).send("Server Error");
    }
});




/// Route to fetch deeds by grantorNic or granteeNic
router.get("/get_deeds_by_nic/:nic", async (req, res) => {
    const { nic } = req.params;
    try {
        const deeds = await Deed.find({
            $or: [{ grantorNic: nic }, { granteeNic: nic }]
        });
        if (deeds.length === 0) {
            return res.status(404).json({ message: "No deeds found for the provided NIC." });
        }
        res.json(deeds);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching deeds. Please try again later." });
    }
});

// Search deeds based on query parameters
router.get("/search_deeds", async (req, res) => {
    const { title, status } = req.query;

    try {
        // Create a filter object based on the provided query parameters
        let filter = {};

        if (title) {
            filter.title = new RegExp(title, 'i'); // Case-insensitive search
        }
        if (status) {
            filter.deedStatus = status; // Match exact status
        }

        // Find deeds matching the filter criteria
        const deeds = await Deed.find(filter)
            .populate("grantor", "fname lname") // Populate grantor with 'fname' and 'lname'
            .populate("grantee", "fname lname"); // Populate grantee with 'fname' and 'lname'

        if (deeds.length > 0) {
            res.status(200).json(deeds);
        } else {
            res.status(404).json({ message: "No deeds found matching the criteria" });
        }
    } catch (error) {
        console.error("Error searching deeds:", error);
        res.status(500).json({ message: "Error searching deeds", error: error.message });
    }
});

// Fetch deed count by NIC (grantorNic and granteeNic separately)
router.get("/get_deed_count_by_nic/:nic", async (req, res) => {
    const { nic } = req.params;

    try {
        // Count deeds where the user is the grantor
        const grantorCount = await Deed.countDocuments({ grantorNic: nic });

        // Count deeds where the user is the grantee
        const granteeCount = await Deed.countDocuments({ granteeNic: nic });

        res.status(200).json({
            grantorCount,
            granteeCount,
            totalCount: grantorCount + granteeCount // Total count of deeds
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: "Error with fetching deed count by NIC" });
    }
});

// Route to fetch deeds by grantor or grantee ID
router.get("/get_deeds_by_client_id/:id", async (req, res) => {
    const clientId = req.params.id;

    try {
        // Find deeds where the grantor or grantee matches the client ID
        const deeds = await Deed.find({
            $or: [{ grantor: clientId }, { grantee: clientId }]
        });

        if (deeds.length > 0) {
            return res.status(200).json(deeds);
        } else {
            return res.status(404).json({ message: "No deeds found for this client." });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error fetching deeds by client ID." });
    }
});






module.exports = router;