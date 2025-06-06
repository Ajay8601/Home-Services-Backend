const User = require("../models/user");

async function handleUserRagister(req, res) {
    const { name, email, mobileNo, userName, password} = req.body;
    await User.create ({
        name, email, mobileNo, userName, password

    });
    return res.render("home");
}

module.exports = {
    handleUserRagister
}