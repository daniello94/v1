const express = require("express");

const router = express.Router();

const user = require('../api/controllers/user.controllers');
const authTeacher = require("../api/midleweres/authTeacher");

router.post('/signup', authTeacher, function (req, res) {
    user.add(req.body, function (err, user) {
        if (err) {
            res.status(404);
            res.json({
                error: "user not created"
            })
        } else {
            res.json(user)
        }
    })
});

router.post('/login', function (req, res) {
    user.login(req.body, function (err, loggedUser, token = '') {
        if (err) {
            res.status(404);
            res.json({
                error: 'User not logged'
            })
        } else if (token) {
            res.json({ success: true, user: loggedUser, jwt: token })
        } else {
            res.json({ success: false, massage: 'username or password do not match' })
        }
    })
});

router.post('/all/', function (req, res) {
    let group = req.query.group

    user.list(group,function (err, users) {
        if (err) {
            res.status(404);
            res.json({
                error: "user not found"
            })
        } else {
            res.json(users)
        }
    })

});

router.get('/:id', function (req, res) {
    user.get(req.params.id, function (err, user) {
        if (err) {
            res.status(404);
            res.json({
                error: 'User not found'
            })
        } else {
            res.json(user)
        }
    })
});

router.put('/update/:id', function (req, res) {
    user.update(req.params.id, req.body, function (err, data) {
        if (err) {
            res.status(404);
            res.json({
                error: 'user is not found'
            })
        } else {
            res.json(data)
        }
    })
});


router.delete('/delete/:id', authTeacher, function (req, res) {
    user.delete(req.params.id, function (err, data) {
        if (err) {
            res.status(404);
            res.json({
                error: "User not found"
            })
        } else {
            res.json(data)
        }
    })
});

router.put('/addGrade/:id', function (req, res) {
    user.grades([req.params.id, req.body], function (err, grades) {
        if (err) res.send(err)
        res.json(grades)
    })
});


module.exports = router;