function requestTime(req) {
    req.requestTime = Date.now()
}

function checkCors(req, res) {
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', '*');
        res.setHeader('Content-Type', 'application/json');
        return res.status(204).send();
    }
};

function requireAPIKey(req, res) {
    return; //TODO skip for now
    if (!(req.headers["nhost-webhook-secret"] && process.env.NHOST_WEBHOOK_SECRET === req.headers["nhost-webhook-secret"])) {
        console.log('requireAPIKey: ', 'unauthorised');
        res.status(401).send('unauthorised')
    }
}

function setSessionDetails(req, res) {
    const sessionVariables = req.body.event?.session_variables ? req.body.event.session_variables : req.body.session_variables;
    req.sessionVars = sessionVariables;
}

function addMiddleware(req, res){
    checkCors(req, res);
    requireAPIKey(req, res);
    requestTime(req);
    setSessionDetails(req, res)
}

module.exports = {
    addMiddleware
}