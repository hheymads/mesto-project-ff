import { addLike, removeLike} from './api.js';

// Находим template элемент
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

// Функция обработки лайка
const handleLikeClick = (cardId, isLiked, likeButton, likeCounter) => {
    const likeMethod = isLiked ? removeLike : addLike;

    likeMethod(cardId)
        .then((updatedCard) => {
            likeButton.classList.toggle('card__like-button_is-active');
            likeCounter.textContent = updatedCard.likes.length;
        })
        .catch((err) => {
            console.log('Ошибка при обработке лайка:', err);
        });
};

// Функция создания карточки
export const createCard = (cardData, handleDeleteCard, openImageClick, userId) => {
    const cardElement = cardTemplate.cloneNode(true);
    const deleteBtn = cardElement.querySelector('.card__delete-button');
    const likeBtn = cardElement.querySelector('.card__like-button');
    const likeCounter = cardElement.querySelector('.card__like-counter');
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');

    // Заполняем данные карточки
    cardTitle.textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    likeCounter.textContent = cardData.likes.length;

    // Проверяем, поставил ли текущий пользователь лайк
    const isLiked = cardData.likes.some(user => user._id === userId);
    if (isLiked) {
        likeBtn.classList.add('card__like-button_is-active');
    }

    // Показываем кнопку удаления только для своих карточек
    if (cardData.owner._id !== userId) {
        deleteBtn.style.display = 'none';
    }

    // Обработчик удаления карточки
    deleteBtn.addEventListener('click', () => {
        handleDeleteCard(cardData._id, cardElement);
    });

    // Обработчик клика по изображению
    cardImage.addEventListener('click', () => {
        openImageClick(cardData);
    });

    // Обработчик лайка
    likeBtn.addEventListener('click', () => {
        const isLiked = likeBtn.classList.contains('card__like-button_is-active');
        const likeMethod = isLiked ? removeLike : addLike;

        likeMethod(cardData._id)
            .then((updatedCard) => {
                likeBtn.classList.toggle('card__like-button_is-active');
                likeCounter.textContent = updatedCard.likes.length;
            })
            .catch((err) => {
                console.log('Ошибка при обработке лайка:', err);
            });
    });

    return cardElement;
};

// Экспортируем функцию обработки лайка с псевдонимом
export { handleLikeClick as handleLikeCard };