const  ApplicationConflictExecption  = require("../application.conflict.execption.js");
class ConfigurationIdAlreadyInUseException extends ApplicationConflictExecption {
	constructor() {
		super("the task with Id is already used");
	}
}
module.exports= ConfigurationIdAlreadyInUseException