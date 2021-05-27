const { params, validationResult } = require('express-validator');

exports.validationParamsRules = [
    params('id', 'id is required').exists(),
    params('id', 'id is required').notEmpty()
];

exports.checkRules = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};