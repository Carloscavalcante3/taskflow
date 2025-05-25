const { v4: uuidv4 } = require('uuid');
const store = require('../store/datastore');

const findListByCardId = (cardId) => {
    for (const listId in store.lists) {
        if (store.lists[listId].cards.includes(cardId)) {
            return store.lists[listId];
        }
    }
    return null;
};

exports.getAllBoards = (req, res) => {
    const firstBoardId = Object.keys(store.boards)[0];
    if (firstBoardId) {
        res.redirect(307, `/api/boards/${firstBoardId}`);
    } else {
        res.status(404).json({ message: 'Nenhum quadro encontrado' });
    }
};

exports.getBoardById = (req, res) => {
    const { boardId } = req.params;
    const board = store.boards[boardId];

    if (!board) {
        return res.status(404).json({ message: 'Quadro não encontrado' });
    }

    const fullBoard = {
        ...board,
        lists: board.lists.map(listId => {
            const list = store.lists[listId];
            return {
                ...list,
                cards: list.cards.map(cardId => store.cards[cardId])
            };
        })
    };

    res.status(200).json(fullBoard);
};

exports.createBoard = (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ message: 'Título é obrigatório' });
    }
    const newId = `board-${uuidv4()}`;
    const newBoard = {
        id: newId,
        title,
        lists: []
    };
    store.boards[newId] = newBoard;
    res.status(201).json(newBoard);
};

exports.createList = (req, res) => {
    const { boardId } = req.params;
    const { title } = req.body;

    if (!store.boards[boardId]) {
        return res.status(404).json({ message: 'Quadro não encontrado' });
    }
    if (!title) {
        return res.status(400).json({ message: 'Título da lista é obrigatório' });
    }

    const newListId = `list-${uuidv4()}`;
    const newList = {
        id: newListId,
        title,
        boardId,
        cards: []
    };

    store.lists[newListId] = newList;
    store.boards[boardId].lists.push(newListId);

    res.status(201).json(newList);
};

exports.createCard = (req, res) => {
    const { listId } = req.params;
    const { title, content } = req.body;

    if (!store.lists[listId]) {
        return res.status(404).json({ message: 'Lista não encontrada' });
    }
    if (!title) {
        return res.status(400).json({ message: 'Título do cartão é obrigatório' });
    }

    const newCardId = `card-${uuidv4()}`;
    const newCard = {
        id: newCardId,
        title,
        content: content || ''
    };

    store.cards[newCardId] = newCard;
    store.lists[listId].cards.push(newCardId);

    res.status(201).json(newCard);
};

exports.moveCard = (req, res) => {
    const { cardId } = req.params;
    const { targetListId } = req.body;

    const card = store.cards[cardId];
    const targetList = store.lists[targetListId];
    const sourceList = findListByCardId(cardId);

    if (!card || !targetList || !sourceList) {
        return res.status(404).json({ message: 'Cartão ou lista não encontrado(s)' });
    }

    if (sourceList.id === targetListId) {
        return res.status(200).json({ message: 'Cartão já está na lista de destino' });
    }

    sourceList.cards = sourceList.cards.filter(id => id !== cardId);
    targetList.cards.push(cardId);

    res.status(200).json({ message: 'Cartão movido com sucesso' });
};

exports.deleteCard = (req, res) => {
    const { cardId } = req.params;

    const card = store.cards[cardId];
    const sourceList = findListByCardId(cardId);

    if (!card || !sourceList) {
        return res.status(404).json({ message: 'Cartão não encontrado' });
    }

    sourceList.cards = sourceList.cards.filter(id => id !== cardId);
    delete store.cards[cardId];

    res.status(200).json({ message: 'Cartão excluído com sucesso' });
}