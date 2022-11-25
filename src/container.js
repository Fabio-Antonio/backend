const awilix = require("awilix");
/* task import  */
const  ConfigurationController = require("./infra/controllers/configuration.controller.js");
const  ConfigurationRepository  =require("./infra/repositories/configuration.repository.js");
/// use case
const  configurationCreateUseCase  =require("./app/use-cases/configuration/configuration-create.usecase.js");
const  configurationUpdateUseCase  =require("./app/use-cases/configuration/configuration-update.usecase.js");
const  configurationFindByIdUseCase  = require("./app/use-cases/configuration/configuration-findById.usecase.js");

const container = awilix.createContainer({
	injectionMode: awilix.InjectionMode.PROXY,
});

// use case

// ===============task =====================

// task use-case
container.register({
	configurationCreateUseCase: awilix.asClass(configurationCreateUseCase).singleton(),
	configurationFindByIdUseCase: awilix.asClass(configurationFindByIdUseCase).singleton(),
	configurationUpdateUseCase: awilix.asClass(configurationUpdateUseCase).singleton(),
});

// task controller
container.register({
	configurationController: awilix.asClass(ConfigurationController).singleton(),
});

// task respository
container.register({
	configurationRepository: awilix.asClass(ConfigurationRepository).singleton(),
});

module.exports = container;