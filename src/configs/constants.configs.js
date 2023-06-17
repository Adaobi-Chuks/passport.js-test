module.exports = {
    DATABASE_URI : process.env.DATABASE_URI,

    COOKIE_SECRET : process.env.COOKIE_SECRET,

    PORT : process.env.PORT,
    SECRET : process.env.SECRET,
    MAXAGE: 3 * 24 * 60 * 60,
    BASEPATH : "/api/v1",
    ENUM: {
        GUEST: "guest",
        ADMIN: "admin"
    },
    DATABASES: {
        USER: "user",
    },
    MESSAGES : {
        DATABASE: {
            CONNECTED: "MongoDB is connected",
            ERROR: "There was an error while connecting to the database."
        },
        USER: {
            CREATED: "User created successfully",
            FETCHED: "User fetched successfully",
            FETCHEDALL: "User fetched successfully",
            UPDATED: "User updated successfully",
            DELETED: "User deleted successfully",
            DUPLICATE_ERROR: "Email already exists",
            INVALID_ID_ERROR: "Invalid id",
            INVALID_EMAIL_ERROR: "Invalid email",
            INVALID_PASSWORD_ERROR: "Invalid password",
            LOGIN: "Login was successfull",
            LOGGEDOUT: "Logout was successfull"
        },
    }
}