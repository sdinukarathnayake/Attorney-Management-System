const express = require('express');
const router = express.Router();

const Case = require("../models/model_lcm_newcase");

router.route("/add_new_case").post((req, res) => {
    const { caseNumber, procedure, courtType, courtArea, caseCreatedDate,initialCaseDate, neededDocuments, nature,status,lawyerId,clientId,stepsToBeTaken,previousDate,stepsTaken,nextCourtDate } = req.body;

    //const caseNumber = Number(req.body.caseNumber);
    const monetaryValue = Number(req.body.monetaryValue);

    const newcase = new Case({
        caseNumber,
        procedure,
        courtType,
        courtArea,
        monetaryValue,
        caseCreatedDate,
        initialCaseDate,
        neededDocuments, 
        nature,
        status,
        lawyerId,
        clientId,
        stepsToBeTaken,
        previousDate,
        stepsTaken,
        nextCourtDate
    
    });

    newcase.save()
        .then(() => {
           res.json("Case Added Successfully");
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "An error occurred while saving the case" });
        });
});


router.route("/getallcase").get((req, res) => {
    Case.find()
        .then((cases) => {
            res.json(cases);
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).json({ error: "An error occurred while fetching the cases" });
        });
});

// Get the last case
router.route("/get_last_case_id").get(async (req, res) => {
    try {
        const lastcase = await Case.findOne().sort({ createdAt: -1 }); // Descending order
        if (lastcase) {
            res.status(200).json(lastcase);
        } else {
            res.status(404).json({ message: "No case found." });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Failed to fetch the last case." });
    }
});

router.route("/update/:id").put(async (req, res) => {
    let caseId = req.params.id;
    const { caseNumber, procedure, courtType, courtArea, monetaryValue, caseCreatedDate,initialCaseDate, neededDocuments, nature,status,lawyerId,clientId,stepsToBeTaken,previousDate,stepsTaken,nextCourtDate } = req.body;

    const updatedCase = {
        caseNumber,
        procedure,
        courtType,
        courtArea,
        monetaryValue,
        caseCreatedDate,
        initialCaseDate,
        neededDocuments, 
        nature,
        status,
        lawyerId,
        clientId,
        stepsToBeTaken,
        previousDate,
        stepsTaken,
        nextCourtDate
    };

    try {
        await Case.findByIdAndUpdate(caseId, updatedCase);
        res.status(200).send({ status: "Case Updated Successfully" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Case Update Unsuccessful", error: err.message });
    }
});


router.route("/delete/:id").delete(async (req, res) => {
    let caseId = req.params.id;

    try {
        await Case.findByIdAndDelete(caseId);
        res.status(200).send({ status: "Case Deleted Successfully" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Case Deletion Unsuccessful", error: err.message });
    }
});


router.route("/get/:id").get(async (req, res) => {
    let caseId = req.params.id;

    try {
        const caseData = await Case.findById(caseId);
        res.status(200).send({ case: caseData });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with fetching the case", error: err.message });
    }
});

module.exports = router; 
