"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body.userData;
        console.log(req.body);
        const user = yield user_model_1.default.findOne({ username: username });
        if (!email || !password || email === '' || password === '' || !username || username === '') {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (username === (user === null || user === void 0 ? void 0 : user.username)) {
            return res.status(400).json({ message: 'Username is already in use!' });
        }
        if (email === (user === null || user === void 0 ? void 0 : user.email)) {
            return res.status(400).json({ message: 'Email is already in use!' });
        }
        const hashedPwd = bcryptjs_1.default.hashSync(password, 6);
        const newUser = new user_model_1.default({
            username,
            email,
            password: hashedPwd
        });
        newUser.save();
        res.status(200).json({ message: "Registration completed successfully!", success: true, username: user === null || user === void 0 ? void 0 : user.username });
        console.log('REQUEST BODY(SIGNUP):', req.body);
    }
    catch (error) {
        next(error);
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const secret_key = process.env.SECRET_KEY_JWT;
    let token = 'default_token';
    console.log(req.body);
    try {
        const { email, password } = req.body;
        const user = yield user_model_1.default.findOne({ email: email });
        if (!email || !password || email === '' || password === '') {
            return res.status(400).json({ message: 'All fields are required', success: false });
        }
        if (!user) {
            return res.status(400).json({ message: "No such user registered!", success: false });
        }
        if (user === null || user === void 0 ? void 0 : user.password) {
            const pwdCheck = yield bcryptjs_1.default.compare(password, user.password);
            if (!pwdCheck) {
                return res.status(400).json({ message: "Password is incorrect!", success: false });
            }
        }
        const _a = user._doc, { password: pass } = _a, rest = __rest(_a, ["password"]);
        if (secret_key) {
            token = jsonwebtoken_1.default.sign({
                id: user === null || user === void 0 ? void 0 : user._id,
                isAdmin: user.isAdmin
            }, secret_key);
        }
        res.status(200).cookie('access_token', token, {
            httpOnly: true,
            sameSite: false
        }).json({ message: "User logged in successfully!", success: true, user: rest });
        console.log('REQUEST BODY(LOGIN):', req.body);
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
