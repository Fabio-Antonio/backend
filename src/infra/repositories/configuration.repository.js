const { compareSync } = require("bcryptjs");
const  ConfigurationModel =require("../../domain/models/configuration.model.js");
const  TitleVO =require("../../domain/value-object/configuration-value-object/title.vo");
const  CountryVO = require("../../domain/value-object/configuration-value-object/country.vo.js");
const  UrlImageVO  =require("../../domain/value-object/configuration-value-object/url_image.vo.js");
const  Configuration = require("../schema/configuration.schema.js");
const NameVO = require("../../domain/value-object/configuration-value-object/name.vo.js");
const ActiveVO = require("../../domain/value-object/configuration-value-object/active.vo.js");
const BannerVO = require("../../domain/value-object/configuration-value-object/banner.vo.js");

/**
 * Task Mongodb repository implementation
 */

class ConfigurationRepository {
	/**
	 * It takes a task object from the database and converts it into a task object that can be used by the
	 * domain
	 * @param toPersistanceConfiguration - is the object that comes from the database
	 * @returns A new instance of TaskModel with the values of the toPersistanceTask object.
	 */
	toDomain(toPersistanceConfiguration) {

		const {title, country,url_image,promotion } = toPersistanceConfiguration;

		const configuration = new ConfigurationModel(
			new TitleVO(title),
			new CountryVO(country),
			new UrlImageVO(url_image),
			new NameVO(promotion.name),
			new BannerVO(promotion.banner),
			new ActiveVO(promotion.active)
		);

		return {
				title: configuration.title.value,
				country: configuration.country.value,
				url_image: configuration.url_image.value,
				promotion:{
					name: configuration.name.value,
					banner: configuration.banner.value,
					active: configuration.active.value
				}
			}
				
    }

	/**
	 * This function takes a domainTask object and returns a new object with the same properties but with
	 * the values of the properties.
	 * @param domainConfiguration - The domain object that we want to convert to a persistance object.
	 * @returns an object with the properties _id, title, description, and status.
	 */
	toPersistance(domainConfiguration) {
		const { title, country,url_image,name,banner,active } = domainConfiguration;
		return {
			title: title.value,
			country: country.value,
			url_image: url_image.value,
			promotion:{
				name:name.value,
				banner:banner.value,
				active: active.value
			}
		};
	}

	/**
	 * @param id - The id of the task to find.
	 * @returns The task object
	 */
	async findById() {
		const configuration = await Configuration.find();
		if (!configuration) return null;
		return this.toDomain(configuration[0]);
	}

	async update(country) {
		const configurationUpdated = await Configuration.find({country});
		if (!configurationUpdated) return null;
		return this.toDomain(configurationUpdated);
	}

	/**
	 * Create a new task in the database.
	 * @param domainConfiguration - The user object that is passed in from the controller.
	 */
	async create(domainConfiguration) {
		const toPersistanceConfiguration = this.toPersistance(domainConfiguration);
		const configuration = new Configuration(toPersistanceConfiguration);
		await configuration.save();
	}
}

module.exports= ConfigurationRepository;