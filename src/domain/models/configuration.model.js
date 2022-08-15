const  InvalidConfigurationFormatException  =require("../errors/invalid.configuration.format.exception.js");
const  TitleVO  =require("../value-object/configuration-value-object/title.vo.js");
const  CountryVO =require ("../value-object/configuration-value-object/country.vo.js");
const  UrlImageVO =require("../value-object/configuration-value-object/url_image.vo.js");

 class ConfigurationModel {
	/**
	 * @param {titleVO} title
	 * @param {countryVO} country
	 * @param {urlImageVO} url_image
	 */
	constructor( title, country, url_image) {
		this.assertIsValid(title, country, url_image);
		this.title = title;
		this.country = country;
		this.url_image = url_image;
	}

	assertIsValid(title, country, url_image) {
		if (
			!(title instanceof TitleVO) ||
			!(country instanceof CountryVO) ||
			!(url_image instanceof UrlImageVO)
		)
			throw new InvalidConfigurationFormatException();
	}
}
module.exports= ConfigurationModel;