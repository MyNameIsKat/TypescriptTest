import * as joi from 'joi';
import * as ejv from 'express-joi-validation';

const validator = ejv.createValidator({passError: true})

const schemaTest = joi.object({
    PK: joi.string().required(),
    SK: joi.string().required(),
    yes: joi.string().required()
})

export {validator, schemaTest}