const { Router } = require('express');
const handler = require('../handlers/user');
const middleware = require('../middlewares');
const validation = require('../middlewares/validations');
const route = Router();

route.get('/:id', middleware.jwt, validation.userIdParamValidation, handler.getUserById);
route.get('/', middleware.authorize("admin"), handler.getAllUser);
route.post('/', validation.registerValidation, handler.register);

module.exports = route;
