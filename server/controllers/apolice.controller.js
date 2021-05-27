const axios = require('axios');
const tokenURLPrefix = ''
const APIendpointInstance = axios.create({
    baseURL: process.env.CORPORATE_URL_ENDPOINT,
    timeout: process.env.TIMEOUT,
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

exports.generateCode = (req, res, next) => {

}

exports.generateToken = (req, res, next) => {

}



exports.generateURL = (req, res) => {
    res.status(200).json({ "msg": "ok" })

}