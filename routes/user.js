var express = require('express');
var router = express.Router();

const {
    loginBlog
} = require('../controller/user')

const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel')


router.post('/login', function (req, res, next) {
    console.log(req.body)
    const {
        username,
        password
    } = req.body
    const result = loginBlog(username, password)
    return result.then(data => {
        if (data.username) {
            // 设置 session
            req.session.username = data.username
            req.session.realname = data.realname

            res.json(
                new SuccessModel()
            )
            return
        }
        res.json(
            new ErrorModel('登录失败')
        )
    })
});
module.exports = router;