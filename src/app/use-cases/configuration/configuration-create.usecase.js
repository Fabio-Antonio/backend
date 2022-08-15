
const { ConfigurationModel } = require("../../../domain/models/configuration.model.js");
const { TitleVO } = require("../../../domain/value-object/configuration-value-object/title.vo.js");
const { CountryVO }= require("../../../domain/value-object/configuration-value-object/country.vo.js");
const { UrlImageVO }= require("../../../domain/value-object/configuration-value-object/url_image.vo.js");
const { ConfigurationIdAlreadyInUseException } = require("../../errors/configuration/configuration.id.already.use.exception.js");

class ConfigurationCreateUseCase {
	constructor({ configurationRepository }) {
		this.configurationRepository = configurationRepository;
		/* this.taskRepository = taskRepository; */
	}

	async execute(title, country, url_image) {
		const newConfig = new ConfigurationModel(
			new TitleVO(title),
			new CountryVO(country),
			new UrlImageVO(url_image)
		);
        const configuration = await this.ConfigurationRepository.create(newConfig);
        if (configuration) {
			throw new ConfigurationIdAlreadyInUseException();
		}
        return configuration;
        
	}
}
module.exports= ConfigurationCreateUseCase; 