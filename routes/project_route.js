const express = require("express");

const router = express.Router();
const multer  = require('multer');

const admin = require("../middleware/admin");
const auth = require("../middleware/auth");

const peopleCtr = require("../controllers/projectController");

const storage = multer.diskStorage({
    //destination for files
    destination: function (request, file, callback) {
      callback(null, './uploads');
    },
  
    //add back the extension
    filename: function (request, file, callback) {
      callback(null,  file.originalname)
    },
  });

//* upload parameters for multer
const upload = multer({
    storage: storage,
    limits: {
      fieldSize: 1024 * 1024 * 3,
    },
  });

// ____________________________GETTING_________________________________

// get CheckIn middleware
router.get("/", peopleCtr.getAllProjects);

// router.get("/userChecklist", [auth, checklistCtrl.getUserChecklist]);
// router.get("/checklistById", [auth, checklistCtrl.getChecklistById]);
// get CheckOut middleware
// router.get('/allCheckOut',timeCtrl.getCheckOut)

// // get CheckIn middleware
// router.get('/allCheckInRequests',[admin,timeCtrl.getCheckInRequest])
// // get CheckOut middleware
// router.get('/allCheckOutRequests',[admin,timeCtrl.getCheckOutRequest])

// // get time middleware
// router.get('/getCheckIn/:date',timeCtrl.getByDateCheckIn)
// // get time middleware
// router.get('/getCheckOut/:date',timeCtrl.getByDateCheckOut)

//* ________________________________CREATE_________________________________________

// Creating one Course
router.post("/newName",  [upload.array('imageUrls',6),peopleCtr.createProject]);
// router.post('/newCheckOut', [auth,timeCtrl.createCheckOut])

//? ____________________________________UPDATE____________________________________________

router.patch('/approveName',[auth,admin,peopleCtr.updateProject])
// router.patch('/updateChecks', [auth,checklistCtrl.updateChecks])
// router.patch('/updateRemoveChecklistAssignee', [auth,checklistCtrl.updateRemoveChecklistAssignee])

// router.patch('/acceptCheckOut', [auth,timeCtrl.updateAcceptanceCheckOut])

//! _____________________________________________DELETE_____________________________________

// router.delete('/deleteChecklist', [auth,checklistCtrl.deleteChecklist])

//! Deleting course
router.delete('/deleteName',[auth,admin,peopleCtr.deleteProject])

module.exports = router;
