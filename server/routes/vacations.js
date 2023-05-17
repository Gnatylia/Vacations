const router = require("express").Router();
const myQuery = require("../db");
const { vtUser, vtAdmin } = require("../verifyToken");

// GET: /vacations
router.get("/", vtUser, async (req, res) => {
    let _user = req.user;
    console.log('/vacations: _user.id = ', _user.id);
    let _vacations = [];

    try {
        let q = `SELECT v.*, count(f.user_id) as follows
        FROM vacations as v
        LEFT JOIN follows as f
        on v.id=f.vacations_id
        group by v.id
        order by follows desc`;

        _vacations = await myQuery(q);

        if (_vacations.length == 0) {
            return res.json({ error: true, message: "Vacations not found" });
        }

        const query2 = `SELECT vacations_id from follows where user_id = ${_user.id}`

        const _vacationsByUser = await myQuery(query2);
        console.log('/vacations: _vacationsByUser = ', JSON.stringify(_vacationsByUser));
        //[{"vacationID":1},{"vacationID":3},{"vacationID":2},{"vacationID":4}]
        if (_vacationsByUser.length > 0) {
            _vacations.map(v => {
                let _follow = _vacationsByUser.find(f => (f.vacations_id == v.id));
                v['checked'] = (_follow) ? true : false;
            })
        }
        res.json(_vacations);

    } catch (err) {
        return res.json({ error: true, message: err.message });
    }
});

// POST: /vacations
router.post("/", vtAdmin, (req, res) => {
    //console.log(req.body);
    const { description, destination, photo, date_from, date_to, price } = req.body;

    if (description && destination && photo && date_from && date_to && price) {
        const q = `INSERT INTO vacations (description, destination, photo, date_from, date_to, price)
            VALUES ("${description}", "${destination}", "${photo}", "${date_from}", "${date_to}", "${price}");`

        myQuery(q).then(r => {
            res.status(201).json({ err: false, msg: "vacations added successfully" })
        },
            err => {
                console.log(err)
                res.status(500).json({ err: true })
            }
        );

    } else {
        res.status(500).json({ err: true, msg: "missing some info" })
    }
});

// PUT: /vacations (update item by admin)
router.put("/", vtAdmin, async (req, res) => {
    const { id, description, destination, photo, date_from, date_to, price } = req.body;

    if (!id) {
        return res.status(400).json({ err: true, msg: "missing some info" })
    } else {
        // 1. get vacation by ID from db
        const q = `select * from vacations where id= ${id}`
        const vacations = await myQuery(q);
        //console.log('put./vacations: vacations = ', vacations);
        if (!vacations[0]) {
            return res.status(400).json({ err: true, msg: "vacation not found" })
        }
    }
    // 2. sql-query 'update vocations 
    // set description=${description}
    // ..
    // where id=${id}

    const q2 = `UPDATE vacations 
    SET description = "${description}",
    destination = "${destination}",
    photo =  "${photo}",
    date_from = "${date_from}" ,
    date_to = "${date_to}",
    price = "${price}" WHERE id = ${id};`
    await myQuery(q2);

    res.json({ err: false, msg: "vacation was updated successfully" });
});

// DELETE: /vacations/vacationID
router.delete("/:vacationID", vtAdmin, async (req, res) => {
    let _vacID = req.params.vacationID
    let _adminID = req.user.id

    if (!_adminID) {
        return res.status(400).json({ err: true, msg: "administrator rights only" })

    } else {

        try {
            const q = `DELETE FROM vacations where id = ${_vacID}`;
            const vacation = await myQuery(q);
            res.json({ err: false, msg: "vacation was delete successfully" });
        } catch (err) {
            res.json({ err: true, msg: err.message });
        }
    }
})

module.exports = router;