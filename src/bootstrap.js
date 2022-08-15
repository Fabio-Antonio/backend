const express = require("express");
const cors =require ("cors");
require('dotenv').config();
const  IndexRoutes  = require("./infra/routes/index.routes.js");
const  errorMiddleware  = require("./infra/middlewares/error.middleware.js");
const {dbConnection}=require('./config/database-config');


const PORT = process.env.PORT || 3000;

 const bootstrap = async () => {
	const app = express();
    app.use(cors());
    app.use(express.json());
    dbConnection();
    app.use(express.static('public')); 
	app.use("/api",IndexRoutes);
	app.use(errorMiddleware);
	app.listen(PORT, () => {
		console.log("app listening on port ", PORT);
	});
};

module.exports={
	bootstrap
}