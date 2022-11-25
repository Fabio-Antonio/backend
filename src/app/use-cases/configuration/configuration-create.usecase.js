
const  ConfigurationModel  = require("../../../domain/models/configuration.model.js");
const  TitleVO  = require("../../../domain/value-object/configuration-value-object/title.vo.js");
const  CountryVO = require("../../../domain/value-object/configuration-value-object/country.vo.js");
const  UrlImageVO = require("../../../domain/value-object/configuration-value-object/url_image.vo.js");
const  NameVO  = require("../../../domain/value-object/configuration-value-object/name.vo.js");
const  BannerVO = require("../../../domain/value-object/configuration-value-object/banner.vo.js");
const  ActiveVO = require("../../../domain/value-object/configuration-value-object/active.vo.js");
const  ConfigurationIdAlreadyInUseException  = require("../../errors/configuration/configuration.id.already.use.exception.js");

class ConfigurationCreateUseCase {
	constructor({ configurationRepository }) {
		this.configurationRepository = configurationRepository;
		/* this.taskRepository = taskRepository; */
	}

	async execute(body) {
		const newConfig = new ConfigurationModel(
			new TitleVO(body.title),
			new CountryVO(body.country),
			new UrlImageVO(body.url_image),
			new NameVO(body.promotion.name),
			new BannerVO(body.promotion.banner),
			new ActiveVO(body.promotion.active)
		);
        const configuration = await this.configurationRepository.create(newConfig);
        if (configuration) {
			throw new ConfigurationIdAlreadyInUseException();
		}
        return configuration;
        
	}
}
module.exports= ConfigurationCreateUseCase; 