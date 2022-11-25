
const  ApplicationConflictExecption  = require("../../app/errors/application.conflict.execption");
//const  ApplicationUnauthorizedExecption  =require("../../application/errors/application.unauthorized.execption.js");
const  DomainFormatException = require("../../domain/errors/domian.format.exception.js");
const  InfrastrutureFormatException = require("../errors/infrastruture.format.exception.js");

 const errorMiddleware = (error, _, res, next) => {
	if (
		error instanceof DomainFormatException ||
		error instanceof InfrastrutureFormatException
	){
		return res.status(400).send(error.message);
	}

	if (error instanceof ApplicationConflictExecption) {
		return res.status(409).send(error.message);
	}
	/*if (error instanceof ApplicationUnauthorizedExecption)
		return res.status(403).send(error.message);*/

	return res.status(500).send(error.message);
};
module.exports=errorMiddleware;