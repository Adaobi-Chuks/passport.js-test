const bcrypt = require("bcrypt");
const UserService = require('../services/user.services');
const {MAXAGE, MESSAGES} = require("../configs/constants.configs");
const {
    CREATED,
    DUPLICATE_ERROR,
    INVALID_EMAIL_ERROR,
    INVALID_PASSWORD_ERROR,
    LOGIN,
    LOGGEDOUT
} = MESSAGES.USER;

class UserController {
    //create user
    async signUp(req, res) {
        const data = req.body;
        //checks if another user with email exists
        if (await UserService.userExists({email:data.email})) {
            //sends an error if the email exists
            return res.status(409)
            .send({
                success: false,
                message: DUPLICATE_ERROR
            });
        }
        //create a user if the email doesn't exist
        const createdUser = await UserService.create({
            ...data
        });
        const token = UserService.generateAuthToken(createdUser);
        res.cookie("token", token, {
            httpOnly: true, 
            maxAge: MAXAGE * 1000 
        });
        return res.header("token", token).status(201)
            .send({
                success: true,
                message: CREATED,
                data: {createdUser, token}
            });
    }
    
    async login(req, res) {
        const {email, password} = req.body;
        const user = await UserService.find({email});

        if (!user) return res.status(400).send({ success: false, message: INVALID_EMAIL_ERROR });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).send({ success: false, message: INVALID_PASSWORD_ERROR });

        const token = UserService.generateAuthToken(user);
        res.cookie("token", token, {
            httpOnly: true, 
            maxAge: MAXAGE * 1000 
        });
        res.header('token', token).status(200).send({
            success: true,
            message: LOGIN,
            data: { user, token }
        });
    }

    async logout(req, res) {
        req.user = {};
        req.logout((err) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            req.session.destroy((err) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ error: 'Internal server error' });
                    return;
                }
                res.clearCookie('connect.sid'); // Clear the session cookie
                res.status(200).send({
                success: true,
                message: LOGGEDOUT,
                });
            });
        });
    }

    
    async isLoggedIn (req, res, next) {
        (await req.user)
        ? res.status(200).json(req.user.firstName + " is successfully logged in...")
        : res.sendStatus(401);
  };
}

module.exports = new UserController();