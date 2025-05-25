const { v4: uuidv4 } = require('uuid');

const store = {
    boards: {
        'board-1': {
            id: 'board-1',
            title: 'Meu Projeto Pessoal',
            lists: ['list-1', 'list-2', 'list-3']
        }
    },
    lists: {
        'list-1': { id: 'list-1', title: 'A Fazer', boardId: 'board-1', cards: ['card-1', 'card-2'] },
        'list-2': { id: 'list-2', title: 'Em Andamento', boardId: 'board-1', cards: ['card-3'] },
        'list-3': { id: 'list-3', title: 'Feito', boardId: 'board-1', cards: [] }
    },
    cards: {
        'card-1': { id: 'card-1', title: 'Configurar Backend', content: 'Criar API inicial com Node.js' },
        'card-2': { id: 'card-2', title: 'Estruturar Frontend', content: 'Definir HTML e CSS base' },
        'card-3': { id: 'card-3', title: 'Implementar API', content: 'Desenvolver rotas CRUD' }
    }
};

module.exports = store;