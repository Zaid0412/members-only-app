const db = require('../db/queries')
const moment = require('moment')

const indexControllers = {
    home: async (req, res, next) => {
        try {
            db.getAllPosts().then(posts => {
                if (posts.length > 0) {   
                    const formattedPosts = posts.map(e => {
                        return {
                            ...e,
                            formattedDate: moment(e.date).fromNow(),
                        }
                    });
                    res.render('index', { posts: formattedPosts })
                }
                res.render('index', { posts })
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = indexControllers;