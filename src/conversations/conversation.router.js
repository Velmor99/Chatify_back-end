const { Router } = require("express");
const conversationController = require("./conversation.controller");

const router = Router();

router.post("/", conversationController.createConversation);

router.get("/:email", conversationController.getConversation)

module.exports = router;
