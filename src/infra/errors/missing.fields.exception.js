const InfrastrutureFormatException  = require("./infrastruture.format.exception.js");

class MissingFieldsFormatException extends InfrastrutureFormatException {
	constructor() {
		super("Require fields are missing");
	}
}

module.exports= MissingFieldsFormatException;