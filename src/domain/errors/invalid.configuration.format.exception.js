const  DomainFormatException =require("./domian.format.exception.js");

class InvalidConfigurationFormatException extends DomainFormatException {
	constructor() {
		super("Task Format invalid");
	}
}

module.exports= InvalidConfigurationFormatException;