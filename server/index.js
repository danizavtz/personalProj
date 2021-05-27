const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/swagger.json');
const options = {
  customCss: '.swagger-ui .topbar { display: none }'
};

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument, options));
router.use(require('./routes/apolice.route'))

router.get('/', (req, res) => {
    req.servermsg = {msg: "server up and running"}
    res.status(200).json(req.servermsg);
});
  //após tentar casar todas as rotas a ultima rota que sobrou é not found
router.get('*', (req, res) => {
    res.status(404).json({ errors: [{location: req.path, msg: 'Not found', param: null}]});
});

module.exports = router;