const { check } = require('express-validator')

const isReqMsg = 'is required'
const lengthMsg = 'should be between 5 and 35 characters'

module.exports.registerValidation =  [
    check('fullname')
        .exists()
        .withMessage(`Fullname ${isReqMsg}`)
        .isLength({min: 5, max: 35})
        .withMessage(`Fullname ${lengthMsg}`),
    check('username')
        .exists()
        .withMessage(`Username ${isReqMsg}`)
        .isLength({min: 5, max: 35})
        .withMessage(`Username ${lengthMsg}`),
    check('password')
        .exists()
        .withMessage(`Password ${isReqMsg}`)
        .isLength({min: 5, max: 35})
        .withMessage(`Password ${lengthMsg}`),
    check('confirm-password')
        .custom((value, { req }) => {
            if (value !== req.body.password) throw new Error('Password did not match')
            return true
        })
        .withMessage('Passwords did not match.')
    ]