// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

// @todo: Функция создания карточки
export const createCard = (elem, onDelete, openImageClick, onLike) => {
    const cardsElement = cardTemplate.cloneNode(true);
    const deleteBtn = cardsElement.querySelector('.card__delete-button');
    const likeBtn = cardsElement.querySelector('.card__like-button');

    // Установка данных для карточки
    cardsElement.querySelector('.card__title').textContent = elem.name;
    const cardImage = cardsElement.querySelector('.card__image');
    cardImage.src = elem.link;
    cardImage.alt = elem.name;

    // Добавление обработчика события для открытия картинки
    cardImage.addEventListener('click', () => {
        openImageClick(elem);
    });

    // Добавление обработчика события для кнопки удаления
    deleteBtn.addEventListener('click', () => {
        onDelete(cardsElement);
    });

    // Добавление обработчика лайка
    likeBtn.addEventListener('click', () => {
        onLike(likeBtn);
    });

    return cardsElement;
};

// @todo: Функция удаления карточки
export const handleDeleteCard = (cardsElement) => {
    cardsElement.remove();
};

// Функция обработки лайка
export const handleLikeCard = (likeButton) => {
    likeButton.classList.toggle('card__like-button_is-active');
};