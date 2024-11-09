const User = require("../models/model.user");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const httpStatusText = require("../utils/httpStatusText");
const bcrypt = require("bcrypt");
const generateJWT = require("../middlewares/generateJWT");

const getAllUsers = asyncWrapper(async (req, res, next) => {
  // pagination
    const query = req.query;
    let limit = query.limit || 6;
    const page = query.page || 1;
    if (limit == 0) {
        limit = 6;
    }
    const skip = (page - 1) * limit;
    
    const users = await User.find({}, { __v: false, password: false })
        .limit(limit)
        .skip(skip);
    res.status(200).json({ status: httpStatusText.SUCCESS, data: users });
});

const getUser = asyncWrapper(async (req, res, next) => {
    const id = req.params.id;
    const users = await User.findById(id, { __v: false, password: false });
    res.status(200).json({ status: httpStatusText.SUCCESS, data: users });
});

const deleteUser = asyncWrapper(async (req, res, next) => {
    const id = req.params.id;

    const deleteUser = await User.findByIdAndDelete(id);

    if (!deleteUser) {
        const error = appError.create(
            "food not found!",
            404,
            httpStatusText.FAIL
        );
        return next(error);
    }
    res.status(201).json({ status: httpStatusText.SUCCESS, data: null });
});

const updateUser = asyncWrapper(async (req, res, next) => {
    const id = req.params.id;
    const updateUser = await User.findByIdAndUpdate(id, req.body);
    if (!updateUser) {
        const error = appError.create(
            "food not found!",
            404,
            httpStatusText.FAIL
        );
        return next(error);
    }
    res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
});

const register = asyncWrapper(async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        password,
        dateCreation,
        phoneNumber,
        role,
    } = req.body;

    const oldUser = await User.findOne({ email });

    if (oldUser) {
        const error = appError.create(
            "user already exists !",
            400,
            httpStatusText.FAIL
        );
        return next(error);
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        dateCreation,
        phoneNumber,
        role,
    });

    const token = generateJWT({
        email: newUser.email,
        _id: newUser._id,
        role: newUser.role,
    });
    newUser.token = token;
    await newUser.save();

    res.status(201).json({
        status: httpStatusText.SUCCESS,
        data: { user: newUser },
    });
});

const login = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        const error = appError.create(
            "email and password required !",
            400,
            httpStatusText.FAIL
        );
        return next(error);
    }
    const user = await User.findOne({ email });
    console.log("user=", user);
    if (!user) {
        const error = appError.create(
            "user not found",
            404,
            httpStatusText.FAIL
        );
        return next(error);
    }
    const matchedPassword = await bcrypt.compare(password, user.password);

    if (user && matchedPassword) {
        const token = generateJWT({
            email: user.email,
            _id: user.id,
            role: user.role,
        });
        res.status(200).json({
            status: httpStatusText.SUCCESS,
            data: { token, role: user.role, id: user._id },
        });
    } else {
        const error = appError.create(
            "password invalid",
            404,
            httpStatusText.FAIL
        );
        return next(error);
    }
});

module.exports = {
    getAllUsers,
    getUser,
    register,
    login,
    deleteUser,
    updateUser,
};
