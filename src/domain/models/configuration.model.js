const  InvalidConfigurationFormatException  =require("../errors/invalid.configuration.format.exception.js");
const  TitleVO  =require("../value-object/configuration-value-object/title.vo.js");
const  CountryVO =require ("../value-object/configuration-value-object/country.vo.js");
const  UrlImageVO =require("../value-object/configuration-value-object/url_image.vo.js");
const  NameVO  =require("../value-object/configuration-value-object/name.vo.js");
const  BannerVO =require ("../value-object/configuration-value-object/banner.vo.js");
const  ActiveVO =require("../value-object/configuration-value-object/active.vo.js");


 class ConfigurationModel {
	/**
	 * @param {titleVO} title
	 * @param {countryVO} country
	 * @param {urlImageVO} url_image
	 * @param {bannerVO} bannerVO
	 * @param {nameVO} nameVO
	 * @param {activeVO} activeVO
	 * 
	 */
	constructor( title, country, url_image,name,banner,active) {
		this.assertIsValid(
			title,
			country, 
			url_image,
			name,
			banner,
			active
			);

		this.title = title;
		this.country = country;
		this.url_image = url_image;
		this.name = name;
		this.banner = banner;
		this.active= active;
	}

	assertIsValid(title, country, url_image, name,banner,active) {
		if (
			!(title instanceof TitleVO) ||
			!(country instanceof CountryVO) ||
			!(url_image instanceof UrlImageVO) ||
			!(name instanceof NameVO) ||
			!(banner instanceof BannerVO) ||
			!(active instanceof ActiveVO)
		)
			throw new InvalidConfigurationFormatException();
	}
}
module.exports= ConfigurationModel;