const checkIP = (allowedIPs) => (req, res, next) => {
    const reqPath = req.path;
    const origin = req.headers.origin;

    if(reqPath.includes('static')) {
        return next();
    }

    if (!allowedIPs.includes(origin)) {
        return res.status(403).send('<div><center><h1>403 Bad Request</h1></center><hr /></div>');
    }

    return next();
};

export default checkIP;
