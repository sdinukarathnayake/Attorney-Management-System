const router = require("express").Router();
let Client = require("../models/model_cli_client");

router.route("/add-client").post((req,res)=> {

    const userId = req.body.userId;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const nic = Number(req.body.nic);
    const address = req.body.address;
    const district = req.body.district;
    const province = req.body.province;
    const phone = Number(req.body.phone);
    const email = req.body.email;
    const password = req.body.password;
    const createdDate = req.body.createdDate;
    const userStatus = req.body.userStatus;

    const newClient = new Client({
        userId,
        fname,
        lname,
        nic,
        address,
        district,
        province,
        phone,
        email,
        password,
        createdDate,
        userStatus
    })

    newClient.save().then(()=> {
        res.json("Client Added")
    }).catch((err)=>{
        console.log(err);
    })

});

router.route("/view-all-clients").get((req,res)=> {

    Client.find().then((clients)=>{
        res.json(clients)
    }).catch((err)=>{
        console.log(err)
    })

});


router.route("/update-client/:id").put(async (req, res) => {
    let userIdCeck = req.params.id;

    // Destructure the fields from req.body
    const { userId, fname, lname, nic, address, district, province, phone, email, password, createdDate, userStatus } = req.body;

    const updateClient = {
        userId,
        fname,
        lname,
        nic,
        address,
        district,
        province,
        phone,
        email,
        password,
        createdDate,
        userStatus
    };

    try {
        await Client.findByIdAndUpdate(userIdCeck, updateClient);
        res.status(200).send({ status: "user updated" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "error with updating data", error: err.message });
    }
});


router.route("/delete-client/:id").delete(async (req, res)=> {
    let userId = req.params.id;

    await Client.findByIdAndDelete(userId)
    .then(()=> {
        res.status(200).send({status : "user deleted"});
    }).catch((err)=> {
        console.log(err.message);
        res.status(500).send({status: "error with delete user", error: err.message});
    })
});


router.route("/:id").get(async (req, res) => {
    const clientId = req.params.id;

    Client.findOne({clientId : clientId})
        .then((Client) => {
            if (Client) {
                res.json(Client);
            } else {
                res.status(404).json("Client Not Found");
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json("Error in Retrieving Client");
        });
});


// Route to search client by NIC
router.route("/search-client/nic/:nic").get(async (req, res) => {
    const nic = req.params.nic;

    try {
        const client = await Client.findOne({ nic: nic });
        if (client) {
            res.json(client);
        } else {
            res.status(404).json("Client Not Found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).json("Error in Retrieving Client");
    }
});



router.route("/login-client").post(async (req, res) => {
    const { email, password } = req.body;

    try {
        const client = await Client.findOne({ email, password });

        if (!client) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        res.status(200).json({ user: client });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

router.get('/getClient/:id', async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) return res.status(404).json({ message: "Client not found" });
        res.json({ user: client });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}); 

module.exports = router;