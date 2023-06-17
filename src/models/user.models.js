const {model, Schema} = require('mongoose');
const {ENUM, DATABASES, SALTROUNDS} = require("../configs/constants.configs");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 60
    },
    googleId: {
        type: String,
        required: false,
        unique: true
    },
    role: {
        type: String,
        enum: [ENUM.GUEST, ENUM.ADMIN],
        default: ENUM.GUEST,
        lowercase: true,
        required: true
    },
}, { 
    timestamps: true
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        const salt = await bcrypt.genSalt(SALTROUNDS);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

userSchema.pre('findOneAndUpdate', async function (next) {
    if (this.getUpdate().$set.password) {
        const salt = await bcrypt.genSalt(SALTROUNDS);
        this.getUpdate().$set.password = await bcrypt.hash(this.getUpdate().$set.password, salt);
    }
    next();
});

module.exports = model(DATABASES.USER, userSchema);