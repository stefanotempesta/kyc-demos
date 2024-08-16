const express = require("express");
const router = express.Router();

const middleware = require("../middleware/auth");
const { userController } = require("../controllers/index");

router.get("/me", middleware.validateToken, userController.me);
router.post('/SumSubAccessToken', userController.getAccessToken);


module.exports = router;
