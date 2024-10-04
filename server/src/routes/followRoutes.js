"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const followController_1 = require("../controllers/followController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Follow a user
router.post("/follow", authMiddleware_1.authenticate, followController_1.followUser);
// Unfollow a user
router.post("/unfollow", authMiddleware_1.authenticate, followController_1.unfollowUser);
exports.default = router; // exports the router object
