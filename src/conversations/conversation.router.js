const { Router } = require("express");
const conversationController = require("./conversation.controller");

const router = Router();

router.post("/", conversationController.createConversation);

router.get("/:memberId", conversationController.getConversation)

module.exports = router;
