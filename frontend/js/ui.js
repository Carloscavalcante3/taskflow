const boardContainer = document.getElementById('board-container');
const boardTitleEl = document.getElementById('board-title');
const addCardModal = document.getElementById('add-card-modal');
const closeModalBtn = document.querySelector('.close-btn');
const saveCardBtn = document.getElementById('save-card-btn');
const cardTitleInput = document.getElementById('card-title-input');
const cardContentInput = document.getElementById('card-content-input');
const listIdInput = document.getElementById('list-id-input');

function createCardElement(card) {
    const cardEl = document.createElement('div');
    cardEl.classList.add('card');
    cardEl.setAttribute('draggable', 'true');
    cardEl.dataset.cardId = card.id;

    cardEl.innerHTML = `
        <h4>${card.title}</h4>
        <p>${card.content || ''}</p>
        <button class="delete-card-btn" title="Excluir Cartão">&times;</button>
    `;

    cardEl.querySelector('.delete-card-btn').addEventListener('click', async (e) => {
        e.stopPropagation();
        const cardIdToDelete = card.id;
        const success = await deleteCard(cardIdToDelete);
        if (success) {
            cardEl.remove();
        } else {
            alert('Falha ao excluir o cartão.');
        }
    });

    return cardEl;
}

function createListElement(list) {
    const listEl = document.createElement('div');
    listEl.classList.add('list');
    listEl.dataset.listId = list.id;

    const cardsContainer = document.createElement('div');
    cardsContainer.classList.add('cards-container');
    cardsContainer.dataset.listId = list.id;

    list.cards.forEach(card => {
        cardsContainer.appendChild(createCardElement(card));
    });

    listEl.innerHTML = `
        <div class="list-header">
            <h3 class="list-title">${list.title}</h3>
        </div>
    `;
    listEl.appendChild(cardsContainer);

    const addCardButton = document.createElement('button');
    addCardButton.classList.add('add-card-btn');
    addCardButton.textContent = '+ Adicionar outro cartão';
    addCardButton.addEventListener('click', () => {
        openAddCardModal(list.id);
    });

    listEl.appendChild(addCardButton);
    return listEl;
}

function renderBoard(board) {
    if (!board) {
        boardTitleEl.textContent = 'Erro ao carregar o quadro';
        boardContainer.innerHTML = '<p>Não foi possível carregar os dados. Verifique se o backend está rodando.</p>';
        return;
    }

    boardTitleEl.textContent = board.title;
    boardContainer.innerHTML = '';

    board.lists.forEach(list => {
        boardContainer.appendChild(createListElement(list));
    });

    addDragDropListeners();
}

function openAddCardModal(listId) {
    listIdInput.value = listId;
    cardTitleInput.value = '';
    cardContentInput.value = '';
    addCardModal.style.display = 'block';
    cardTitleInput.focus();
}

function closeAddCardModal() {
    addCardModal.style.display = 'none';
}

function addNewCardToUI(listId, card) {
    const listContainer = document.querySelector(`.cards-container[data-list-id="${listId}"]`);
    if (listContainer) {
        listContainer.appendChild(createCardElement(card));
        addDragDropListeners(); 
    }
}

closeModalBtn.onclick = closeAddCardModal;
window.onclick = function(event) {
    if (event.target == addCardModal) {
        closeAddCardModal();
    }
}