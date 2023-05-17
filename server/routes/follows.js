const router = require("express").Router();
const myQuery = require("../db");
const { vtUser } = require("../verifyToken");

// POST: /folows/vacationID (add followers)
router.post("/:vacationID", vtUser, (req, res) => {
    // req.params.vacationID
    let _vacID = req.params.vacationID
    let _userID = req.user.id

    const q = `INSERT INTO follows (user_id, vacations_id )
            VALUES ("${_userID}", "${_vacID}");`

    myQuery(q).then(r => {
        res.status(201).json({ err: false, msg: "follow added successfully" })
    },
        err => {
            console.log(err)
            res.status(400).json({ err: true, msg: err.message });
        }
    )
});

// DELETE: /folows/vacationID (delete followers)
router.delete("/:vacationID", vtUser, async (req, res) => {
    // req.params.vacationID
    let _vacID = req.params.vacationID
    let _userID = req.user.id

    if (!_vacID || !_userID) {
        return res.status(400).json({ err: true, msg: "missing some info" });
    }

    try {
        const q = `DELETE FROM follows where vacations_id = ${_vacID} and user_id = ${_userID}`;
        const vacation = await myQuery(q);
        res.json({ err: false, msg: "follows was delete successfully" });
    } catch (err) {
        res.status(400).json({ err: true, msg: err.message });
    }
});

module.exports = router;