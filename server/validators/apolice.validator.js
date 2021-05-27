const { param, validationResult } = require('express-validator');

exports.validationParamsRules = [
    param('id', 'id is required').exists(),
    param('id', 'id is required').notEmpty().isAlphanumeric()
];

exports.checkRules = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};