const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');

router.get('/', boardController.getAllBoards);
router.get('/:boardId', boardController.getBoardById);
router.post('/', boardController.createBoard);

router.post('/:boardId/lists', boardController.createList);

router.post('/lists/:listId/cards', boardController.createCard);
router.put('/cards/:cardId/move', boardController.moveCard);
router.delete('/cards/:cardId', boardController.deleteCard);

module.exports = router;