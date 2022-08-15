const { ConfigurationIdNotFoundUseException } = require("../../errors/configuration/configuration.id.not.found.execption.js");

const { CountryVO } = require("../../../domain/value-object/configuration-value-object/country.vo");

class ConfigurationUpdateUseCase {
	constructor({ configurationRepository }) {
		this.configurationRepository = configurationRepository;
	}

	async execute(country) {
		 country = new CountryVO(country);

		const existedconfiguration = await this.configurationRepository.update(country);
		if (!existedconfiguration) {
			throw new ConfigurationIdNotFoundUseException();
		}
		return existedconfiguration;
	}
}

module.exports=ConfigurationUpdateUseCase;