const express = require('express');
const router = express.Router();

const { getMssg, postMssg } = require('../controllers/messages');

router.route('/messages').get(getMssg).post(postMssg);