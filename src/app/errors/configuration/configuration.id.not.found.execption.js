const { ModuleFilenameHelpers } = require("webpack");
const  ApplicationConflictExecption  = require("../application.conflict.execption.js");

class ConfigurationIdNotFoundUseException extends ApplicationConflictExecption {
	constructor() {
		super("the task with Id not found");
	}
}
module.exports= ConfigurationIdNotFoundUseException;