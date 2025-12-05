import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getAllContacts, getChatPartners, getMessagesByUserId, sendMessage } from '../controllers/message.controller.js';
import { arcjetProtection } from '../middleware/arcjet.middleware.js';

const router=express.Router();

//acrjet middleware run then protectRoute middleware will run....

router.use(arcjetProtection,protectRoute);


router.get("/contact", getAllContacts);
router.get("/chats",getChatPartners);
router.get("/:id", getMessagesByUserId);
router.post("/send/:id",sendMessage);


export default router