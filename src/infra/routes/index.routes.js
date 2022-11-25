const { Router } = require("express");
// import { UserRouter } from "./user.routes.js";
const  ConfigurationRouter  =require ("./configuration.routes");

const router = Router();

// router.use("/", UserRouter);
router.use("/configuration", ConfigurationRouter);

 module.exports = router;
