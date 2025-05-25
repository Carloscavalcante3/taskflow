let draggedCard = null;

function addDragDropListeners() {
    const cards = document.querySelectorAll('.card');
    const lists = document.querySelectorAll('.list .cards-container');

    cards.forEach(card => {
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
    });

    lists.forEach(list => {
        list.addEventListener('dragover', handleDragOver);
        list.addEventListener('dragenter', handleDragEnter);
        list.addEventListener('dragleave', handleDragLeave);
        list.addEventListener('drop', handleDrop);
    });
}

function handleDragStart(e) {
    draggedCard = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', this.dataset.cardId);
}

function handleDragEnd() {
    this.classList.remove('dragging');
    draggedCard = null;
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function handleDragEnter(e) {
    e.preventDefault();
     const targetList = this.closest('.list').querySelector('.cards-container');
     if(targetList) {
        targetList.classList.add('drag-over');
     }
}

function handleDragLeave(e) {
     const targetList = this.closest('.list').querySelector('.cards-container');
     if(targetList) {
        targetList.classList.remove('drag-over');
     }
}

async function handleDrop(e) {
    e.preventDefault();
    const targetListContainer = this.closest('.list').querySelector('.cards-container');
    if (!targetListContainer || !draggedCard) return;

    targetListContainer.classList.remove('drag-over');
    const cardId = draggedCard.dataset.cardId;
    const targetListId = targetListContainer.dataset.listId;
    const sourceListId = draggedCard.closest('.list').dataset.listId;

    if (targetListId !== sourceListId) {
        const result = await moveCard(cardId, targetListId);
        if (result && result.message) {
            targetListContainer.appendChild(draggedCard);
        } else {
            alert("Falha ao mover o cartão.");
        }
    } else {
         targetListContainer.appendChild(draggedCard);
    }
}