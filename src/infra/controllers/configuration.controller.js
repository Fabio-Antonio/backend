const { MissingFieldsFormatException } =require("../errors/missing.fields.exception.js");
const { UnnecessaryFieldsException } =require("../errors/unnecesary.fields.exception.js");

 class ConfgurationController {
    constructor({ configurationCreateUseCase, 
        configurationFindByIdUseCase, 
        configurationUpdateUseCase }) {
		this.configurationCreateUseCase = configurationCreateUseCase;
		this.configurationFindByIdUseCase = configurationFindByIdUseCase;
		this.configurationUpdateUseCase = configurationUpdateUseCase;
	}

	async create(req, res, next) {
		const { title, country, url_image, ...rest } = req.body;
		try {
			if (!country || !title || !url_image)
				throw new MissingFieldsFormatException();

			if (Object.keys(rest).length > 0) throw new UnnecessaryFieldsException();
			await this.configurationCreateUseCase.execute(req.body);
			res.status(200).send();
		} catch (error) {
			next(error);
		}
	}

	async findById(req, res, next) {
		try {
			const configurationFound = await this.configurationFindByIdUseCase.execute();
			res.status(200).json(configurationFound);
		} catch (error) {
			next(error);
		}
	}

	async update(req, res, next) {
        const country= req.header('ylv-country');
        
		try {
			const configurationUpdated = await this.configurationUpdateUseCase.execute(country);
			res.status(200).json(configurationUpdated);
		} catch (error) {
			next(error);
		}
	}
}

module.exports= ConfgurationController