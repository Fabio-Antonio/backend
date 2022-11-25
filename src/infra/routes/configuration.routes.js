const { Router } = require("express");
const container = require( "../../container.js");

const router = Router();

const configurationController = container.resolve("configurationController");
// userRegisterController.execute.bind(userRegisterController)
/* router.get("/"); */
router.post("/", configurationController.create.bind(configurationController));
router.get("/", configurationController.findById.bind(configurationController));
router.put("/", configurationController.update.bind(configurationController));
/* 
router.put("/:id");
router.delete("/:id"); */

 module.exports= router;