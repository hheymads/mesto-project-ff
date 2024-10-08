// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция удаления карточки
const handleDeleteCard = (cardsElement) => {
    cardsElement.remove();
}

// @todo: Функция создания карточки
const createCard = (elem, onDelete) => {
    const cardsElement = cardTemplate.cloneNode(true);
    const deleteBtn = cardsElement.querySelector('.card__delete-button');

    // Установка данных для карточки
    cardsElement.querySelector('.card__title').textContent = elem.name;
    cardsElement.querySelector('.card__image').src = elem.link;

    // Добавление обработчика события для кнопки удаления
    deleteBtn.addEventListener('click', () => {
    onDelete(cardsElement);
    });

    return cardsElement;
};

// @todo: Вывести карточки на страницу
initialCards.forEach(function (elem) {
    const cardsElement = createCard(elem, handleDeleteCard);
    placesList.append(cardsElement);
});