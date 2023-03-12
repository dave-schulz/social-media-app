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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRemoveFriend = exports.getUserFriends = exports.getAllUsers = exports.getUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield User_1.default.findById(id);
        res.status(200).json(user);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
exports.getUser = getUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllUsers = yield User_1.default.find();
        res.status(200).json(getAllUsers);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
exports.getAllUsers = getAllUsers;
const getUserFriends = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield User_1.default.findById(id);
        const friends = yield Promise.all(user.friends.map((id) => User_1.default.findById(id)));
        const formattedFriends = friends.map(({ _id, firstName, lastName, occupation, location }) => {
            return { _id, firstName, lastName, occupation, location };
        });
        res.status(200).json(formattedFriends);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
exports.getUserFriends = getUserFriends;
const addRemoveFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, friendId } = req.params;
        const user = yield User_1.default.findById(id);
        const friend = yield User_1.default.findById(friendId);
        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== friendId);
        }
        else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        yield user.save();
        yield friend.save();
        const friends = yield Promise.all(user.friends.map((id) => User_1.default.findById(id)));
        const formattedFriends = friends.map(({ _id, firstName, lastName, occupation, location }) => {
            return { _id, firstName, lastName, occupation, location };
        });
        res.status(200).json(formattedFriends);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
exports.addRemoveFriend = addRemoveFriend;
//# sourceMappingURL=users.js.map