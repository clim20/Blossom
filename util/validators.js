module.exports.validateRegisterInput = (username, email) => {
    const errors = {}
    if (username.trim() === '') {
        errors.username = 'Username must not be empty'
    }
    
    if (email.trim() === '') {
        errors.email = 'Email must not be empty'
    } else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
        if (!email.match(regEx)) {
            errors.email = 'Email must be a valid email address'
        }
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.validateLoginInput = (username, email) => {
    const errors = {};
    if (username.trim() === '') {
        errors.username = 'Username must not be empty'
    }

    if (email.trim() === '') {
        errors.email = 'Email must not be empty'
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}