const  ConfigurationIdNotFoundUseException = require("../../errors/configuration/configuration.id.not.found.execption.js");


class ConfigurationFindByIdUseCase {
	constructor({ configurationRepository }) {
		this.configurationRepository = configurationRepository;
	}

	async execute() {
		const existedConfiguration = await this.configurationRepository.findById();

		if (!existedConfiguration) {
			throw new ConfigurationIdNotFoundUseException();
		}
		return existedConfiguration;
	}
}
module.exports=ConfigurationFindByIdUseCase;