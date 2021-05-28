const axios = require('axios');

const body_data_for_authorize_request = {
    "clientId": process.env.CLIENT_ID,
    "clientSecret": process.env.CLIENT_SECRET,
    "grantType": process.env.G_TYPE
}

const body_data_for_authorize_request_dev = {
    "clientId": process.env.CLIENT_ID,
    "clientSecret": process.env.CLIENT_SECRET_DEV,
    "grantType": process.env.G_TYPE
}

const body_data_for_authorize_request_hlg = {
    "clientId": process.env.CLIENT_ID,
    "clientSecret": process.env.CLIENT_SECRET_HLG,
    "grantType": process.env.G_TYPE
}

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

const APIendpointInstanceDev = axios.create({
    baseURL: process.env.CORPORATE_URL_ENDPOINT_DEV,
    timeout: parseInt(process.env.TIMEOUT),
    headers: {
        'Content-Type': 'application/json',
        'X-Company-Id': process.env.XCOMPANYID,
        'X-Application-Id': process.env.XAPPLICATIONID,
        'X-User-Id': process.env.XUSERID,
        'X-Trace-Id': process.env.XTRACEID
    },
    params: {
        key: process.env.API_KEY_DEV
    }
});

const APIendpointInstanceHlg = axios.create({
    baseURL: process.env.CORPORATE_URL_ENDPOINT_HLG,
    timeout: parseInt(process.env.TIMEOUT),
    headers: {
        'Content-Type': 'application/json',
        'X-Company-Id': process.env.XCOMPANYID,
        'X-Application-Id': process.env.XAPPLICATIONID,
        'X-User-Id': process.env.XUSERID,
        'X-Trace-Id': process.env.XTRACEID
    },
    params: {
        key: process.env.API_KEY_HLG
    }
});

exports.generateCode = async (req, res, next) => {
    try {
        let apicode = null
        if (req.query.ambiente && req.query.ambiente.toLowerCase() === 'dev') {
            apicode = await APIendpointInstanceDev.post(process.env.CORPORATE_AUTHORIZE, body_data_for_authorize_request_dev)
        } else if (req.query.ambiente && req.query.ambiente.toLowerCase() === 'hlg') {
            apicode = await APIendpointInstanceHlg.post(process.env.CORPORATE_AUTHORIZE, body_data_for_authorize_request_hlg)
        } else {
            apicode = await APIendpointInstance.post(process.env.CORPORATE_AUTHORIZE, body_data_for_authorize_request)
        }
        req.apicode = apicode.data.code
        next()
    } catch (error) {
        if (error.response) {
            const { code, message } = error.response.data
            res.status(error.response.status).json({ errors: [{ location: 'apolice', msg: `There was an error on request for code generation. Code: ${code}. Message: ${message}`, param: 'response error' }] })
        } else if (error.request) {
            res.status(500).json({ errors: [{ location: 'apolice', msg: 'There was an error on request for code generation.', param: 'request error' }] })
        } else {
            res.status(500).json({ errors: [{ location: 'apolice', msg: 'There was an error on request for code generation.', param: 'request error' }] })
        }
    }
}

exports.generateToken = async (req, res, next) => {
    const body_data_for_token_request = { "code": req.apicode }
    try {
        let tkn = null
        if (req.query.ambiente && req.query.ambiente.toLowerCase() === 'dev') {
            tkn = await APIendpointInstanceDev.post(process.env.CORPORATE_TOKEN, body_data_for_token_request)
        } else if (req.query.ambiente && req.query.ambiente.toLowerCase() === 'hlg') {
            tkn = await APIendpointInstanceHlg.post(process.env.CORPORATE_TOKEN, body_data_for_token_request)
        } else {
            tkn = await APIendpointInstance.post(process.env.CORPORATE_TOKEN, body_data_for_token_request)
        }
        req.apicredential = tkn.data
        next()
    } catch (error) {
        if (error.response) {
            const { code, message } = error.response.data
            res.status(error.response.status).json({ errors: [{ location: 'apolice', msg: `There was an error on request for token generation.Code: ${code}. Message: ${message}`, param: 'response error' }] })
        } else if (error.request) {
            res.status(500).json({ errors: [{ location: 'apolice', msg: 'There was an error on request for token generation.', param: 'request error' }] })
        } else {
            res.status(500).json({ errors: [{ location: 'apolice', msg: 'There was an error on request for token generation.', param: 'apolice' }] })
        }
    }
}

exports.generateURL = async (req, res) => {
    try {
        let corporate_response = null
        if (req.query.ambiente && req.query.ambiente.toLowerCase() === 'dev') {
            APIendpointInstanceDev.interceptors.request.use((config) => {
                config.headers = config.headers || {};
                config.headers.Authorization = `Bearer ${req.apicredential.token}`
                return config;
            });
            corporate_response = await APIendpointInstanceDev.get(`insurance/claim/v1/claims/${req.params.id}/selfInspection`)
        } else if (req.query.ambiente && req.query.ambiente.toLowerCase() === 'hlg') {
            APIendpointInstanceHml.interceptors.request.use((config) => {
                config.headers = config.headers || {};
                config.headers.Authorization = `Bearer ${req.apicredential.token}`
                return config;
            });
            corporate_response = await APIendpointInstanceHlg.get(`insurance/claim/v1/claims/${req.params.id}/selfInspection`)
        } else {
            APIendpointInstance.interceptors.request.use((config) => {
                config.headers = config.headers || {};
                config.headers.Authorization = `Bearer ${req.apicredential.token}`
                return config;
            });
            corporate_response = await APIendpointInstanceDev.get(`insurance/claim/v1/claims/${req.params.id}/selfInspection`)
        }
        res.status(200).json(corporate_response.data)
    } catch (error) {
        if (error.response) {
            const { code, message } = error.response.data
            res.status(error.response.status).json({ errors: [{ location: 'generateURL', msg: `There was an error on request for URL generation. Code: ${code}. Message: ${message}`, param: req.params.id }] })
        } else if (error.request) {
            res.status(500).json({ errors: [{ location: 'generateURL', msg: 'There was an error on request for URL generation.', param: req.params.id }] })
        } else {
            res.status(500).json({ errors: [{ location: 'generateURL', msg: 'There was an error on request for URL generation.', param: req.params.id }] })
        }
    }
}