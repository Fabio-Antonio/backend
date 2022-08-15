const { listModules } = require("awilix");
const InfrastrutureFormatException  = require("./infrastruture.format.exception.js");
 class UnnecessaryFieldsException extends InfrastrutureFormatException {
	constructor() {
		super("There are leftover fields");
	}
}
 module.exports= UnnecessaryFieldsException;