document.addEventListener('DOMContentLoaded', init);

async function init() {
    const boardData = await fetchBoard();
    renderBoard(boardData);
}

saveCardBtn.addEventListener('click', async () => {
    const title = cardTitleInput.value.trim();
    const content = cardContentInput.value.trim();
    const listId = listIdInput.value;

    if (!title) {
        alert('O título do cartão é obrigatório.');
        return;
    }

    const newCard = await addCard(listId, title, content);

    if (newCard) {
        addNewCardToUI(listId, newCard);
        closeAddCardModal();
    } else {
        alert('Falha ao adicionar o cartão.');
    }
});