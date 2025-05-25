const API_URL = 'http://localhost:5000/api';

async function fetchBoard(boardId = '') {
    try {
        const response = await fetch(`${API_URL}/boards/${boardId}`);
        if (!response.ok) {
            throw new Error(`Erro na API: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Falha ao buscar quadro:", error);
        return null;
    }
}

async function addCard(listId, title, content) {
    try {
        const response = await fetch(`${API_URL}/boards/lists/${listId}/cards`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content }),
        });
        if (!response.ok) {
            throw new Error(`Erro ao adicionar cartão: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Falha ao adicionar cartão:", error);
        return null;
    }
}

async function moveCard(cardId, targetListId) {
     try {
        const response = await fetch(`${API_URL}/boards/cards/${cardId}/move`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ targetListId }),
        });
        if (!response.ok) {
            throw new Error(`Erro ao mover cartão: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Falha ao mover cartão:", error);
        return null;
    }
}

async function deleteCard(cardId) {
    try {
        const response = await fetch(`${API_URL}/boards/cards/${cardId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`Erro ao excluir cartão: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Falha ao excluir cartão:", error);
        return null;
    }
}