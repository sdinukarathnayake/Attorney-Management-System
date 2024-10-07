const router = require("express").Router();
let document_request = require("../models/model_dcm_document_request");
//const multer = require('multer');
const path = require('path'); 


// add document
router.route("/add_document_request").post((req, res) => {
    const {lawerID,  clientID, documentManagerID, docRequestStatues, documentDeadline, instruction} = req.body;
    const documentRequestID = Number(req.body.documentRequestID);
    const documentCallID = Number(req.body.documentCallID);

    const newdocument_request = new document_request({
        documentRequestID,
        documentCallID,
        lawerID,
        clientID, 
        documentManagerID,
        docRequestStatues,
        documentDeadline,
        instruction
    });

    newdocument_request.save()
    .then(()=>{
        res.json("Success..!");
        }).catch(()=>{
                console.log("Unsuccess..!");
            });
});

//get document request
router.route("/get_all_document_request").get((req, res) => {
    document_request.find()
        .then((documentrequest) => {
            res.json(documentrequest);
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).json({ error: "An error" });
        });
});

router.route("/get_all_document_request/Request").get((req, res) => {
    document_request.find({docRequestStatues: "Request"})
        .then((documentrequest) => {
            if(documentrequest.length > 0){
                res.json(documentrequest);
            }else{
                res.json({message: "No Request document call found"});
            }
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).json({ error: "An error" }); 
        });
});

router.route("/get_all_document_request/Submitted").get((req, res) => {
    document_request.find({docRequestStatues: "Submitted"})
        .then((documentrequest) => {
            if(documentrequest.length > 0){
                res.json(documentrequest);
            }else{
                res.json({message: "No Submitted document call found"});
            }
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).json({ error: "An error" });
        });
});

router.route("/get_all_document_request/Reviewing").get((req, res) => {
    document_request.find({docRequestStatues: "Reviewing"})
        .then((documentrequest) => {
            if(documentrequest.length > 0){
                res.json(documentrequest);
            }else{
                res.json({message: "No Reviewing document call found"});
            }
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).json({ error: "An error" });
        });
});

// update  
router.route("/update/:id").put(async (req, res) => {
    let callId = req.params.id;
    const {docRequestStatues, documentDeadline, instruction} = req.body;

    const updateddocument_request = {

        docRequestStatues,
        documentDeadline,
        instruction
    };

    try {
        await document_request.findByIdAndUpdate(callId, updateddocument_request);
        res.status(200).send({ status: "Document request Updated Successfully" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Document call Update Unsuccessful", error: err.message });
    }
});

/*
// Set up multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directory where PDFs will be saved
    },
    filename: function (req, file, cb) {
        // Ensure the filename is unique
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// update clien side
router.route("/update/client/:id").put(upload.single('pdf'), async (req, res) => {
    let callId = req.params.id;
    const {docRequestStatues, comment} = req.body;
    const uploadDocument = req.file ? req.file.path : null;

    const updateddocument_request = {

        docRequestStatues,
        uploadDocument, 
        comment 
    };

    try {
        await document_request.findByIdAndUpdate(callId, updateddocument_request);
        res.status(200).send({ status: "Document request Updated Successfully" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Document request Update Unsuccessful", error: err.message });
    }
}); 
*/

// delete
router.route("/delete/:id").delete(async (req, res) => {
    let callId = req.params.id;

    try {
        await document_request.findByIdAndDelete(callId);
        res.status(200).send({ status: "Document call Deleted Successfully" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Document call Deletion Unsuccessful", error: err.message });
    }
});

// get id for request
router.route("/get/:id").get(async(req,res)=>{

    let callid = req.params.id;
    const call = await document_request.findById(callid)
    .then((documentrequest)=>{
        res.status(200).send({documentrequest});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with get User", error: err.message});
    })

});

module.exports = router;