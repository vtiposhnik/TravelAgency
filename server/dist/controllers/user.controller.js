"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signout = void 0;
const signout = (req, res, next) => {
    try {
        res.clearCookie('access_token').status(200).json('User signed out successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.signout = signout;
