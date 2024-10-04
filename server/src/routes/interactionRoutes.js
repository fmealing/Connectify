"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const interactionController_1 = require("../controllers/interactionController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Routes for liking/unliking posts
router.post("/posts/like", authMiddleware_1.authenticate, interactionController_1.likePost);
router.post("/posts/unlike", authMiddleware_1.authenticate, interactionController_1.unlikePost);
exports.default = router;
