const jwt = require("jsonwebtoken");
const myQuery = require("./db");

const vtUser = (req, res, next) => {
    jwt.verify(req.headers.token, process.env.TOKEN_SECRET, (err, payload) => {

        if (err) {
            return res.status(403).json({ err: true, msg: err.message })
        }

        req.user = payload; // {id, username }
        next();
    })
}

const vtAdmin = (req, res, next) => {
    //console.log('vtAdmin: req.headers.token = ', req.headers.token);
    jwt.verify(
        req.headers.token,
        process.env.TOKEN_SECRET,
        async (err, payload) => {

            if (err) {
                
                return res.status(403).json({ err: true, msg: err.message })
            }

            // sql-request by payload.id
            // and check role is admin       

            let q = `SELECT * FROM user where id = ${payload.id}`;
            const _users = await myQuery(q);
            //console.log('vtAdmin: _user = ', _users[0]);

            if (!_users[0] || _users[0].role != "admin") {
                return res.status(403).json({ err: true, msg: "you dont have permissions" })
            }

            req.user = payload; // {id, username }
            next();
        })
}

module.exports = { vtUser, vtAdmin };