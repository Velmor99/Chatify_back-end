const { Router } = require("express");
const MessageController = require("./message.controller");

const router = Router();

router.post("/", MessageController.postMessage);

// router.get('/', MessageController.connectToRoom)

router.get("/:conversationId", MessageController.getMessagesOfConversation)

module.exports = router;
