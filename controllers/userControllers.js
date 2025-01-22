const db = require('../db/queries');

const usersControllers = {
    login: {
        get: (req, res) => {
            res.render('login')
        }
    }
}

module.exports = usersControllers