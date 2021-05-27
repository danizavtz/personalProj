const axios = require('axios');
const tokenURLPrefix = ''
const APIendpointInstance = axios.create({
    baseURL: process.env.CORPORATE_URL_ENDPOINT,
    timeout: parseInt(process.env.TIMEOUT),
    headers: {
        'Content-Type': 'application/json',
        'X-Company-Id': process.env.XCOMPANYID,
        'X-Application-Id': process.env.XAPPLICATIONID,
        'X-User-Id': process.env.XUSERID,
        'X-Trace-Id': process.env.XTRACEID
    },
    params: {
        key: process.env.API_KEY
      }
});

exports.generateCode = async (req, res, next) => {
    body_data = {
            "clientId":  process.env.CLIENT_ID,
            "clientSecret": process.env.CLIENT_SECRET,
            "grantType": process.env.G_TYPE
    }
    try {
        const apicode = await APIendpointInstance.post('corporate/security/v1/authorize',body_data)
        console.log(apicode)
        req.apicode = apicode.data
        next()
    } catch (e) {
        console.log(e)
        res.status(500).json({errors: [{ location: 'apolice', msg: 'There was an error on request for code token generation.', param: 'apolice' }]})
    }
}

exports.generateToken = (req, res, next) => {

}



exports.generateURL = (req, res) => {
    res.status(200).json(req.apicode)

}