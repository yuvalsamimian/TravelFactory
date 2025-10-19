const express = require("express");
const clubLogic = require("../business-logic-layer/club-logic");

const router = express.Router();

//Get all users
router.get("/getUsers", async (req, res) => {
  try {
    const result = await clubLogic.getAllUsers();
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ message: "Server error" });
  }
});

//Get all specific user requests
router.get("/userRequests/:userId", async (req, res) => {
  const userId = Number(req.params.userId);
  try {
    const user = await clubLogic.isUserExist(userId);
    if (user && user.length > 0) {
      const result = await clubLogic.getAllUserRequests(userId);
      return res.status(200).send(result);
    }
    return res.status(404).send({ message: "User not found" });
  } catch (err) {
    res.status(500).send({ message: "Server error" });
  }
});


//Get all requests for validators 
router.get("/allRequests", async (req, res) => {
  try {
    const result = await clubLogic.getAllRequests();
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ message: "Server error" });
  }
});


//Post and validate the vacation request
router.post("/requestVacation", async (req, res) => {
  const request = req.body;

  if (!request.start_date || !request.end_date) {
    return res.status(400).send({ message: "Start and end dates are required." });
  }

  const start = new Date(request.start_date);
  const end = new Date(request.end_date);

  if (start > end) {
    return res.status(400).send({ message: "End date cannot be before start date." });
  }

  const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  if (diffDays > 30) {
    return res.status(400).send({ message: "Vacation requests cannot exceed 30 days." });
  }

  try {
    const result = await clubLogic.postVacationRequest(request);

    if (result.affectedRows > 0) {
      return res.status(201).send({ message: "Vacation request submitted successfully." });
    } else {
      return res.status(400).send({ message: "Failed to submit vacation request." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Server error." });
  }
});

//Put the request for validators
router.put("/approveOrReject", async(req,res)=>{
    const request = req.body;
    try {
        const result = await clubLogic.approveOrReject(request);
        res.status(200).send({message: "Vacation request updated successfully"});
    } catch (err){
        res.status(500).send({message: "Server error"});
    }
})



module.exports = router;