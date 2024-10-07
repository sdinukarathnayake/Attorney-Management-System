const express = require('express');
const router = express.Router();

const Case = require("../models/model_lcm_newcase");
/*
http://localhost:8070/case/add   <- URL to add a new case 
*/
router.route("/add_new_case").post((req, res) => {
    const { caseNumber, procedure, courtType, courtArea, monetaryValue, caseCreatedDate,initialCaseDate, neededDocuments, nature,caseStatus,lawyerId,clientId } = req.body;

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
        caseStatus,
        lawyerId,
        clientId,
    
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

/*
http://localhost:8070/case   <- URL to get all cases
*/
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

/*
http://localhost:8070/case/update/:id   <- URL to update a case by ID
*/
router.route("/update/:id").put(async (req, res) => {
    let caseId = req.params.id;
    const { caseNumber, procedure, courtType, courtArea, monetaryValue, caseCreatedDate,initialCaseDate, neededDocuments, nature,caseStatus,lawyerId,clientId } = req.body;

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
        caseStatus,
        lawyerId,
        clientId,
    };

    try {
        await Case.findByIdAndUpdate(caseId, updatedCase);
        res.status(200).send({ status: "Case Updated Successfully" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Case Update Unsuccessful", error: err.message });
    }
});

/*
http://localhost:8070/case/delete/:id   <- URL to delete a case by ID
*/
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

/*
http://localhost:8070/case/get/:id   <- URL to get a specific case by ID
*/
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
