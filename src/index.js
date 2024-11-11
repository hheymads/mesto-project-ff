import './pages/index.css'; 
import {initialCards} from './scripts/cards.js';
import {createCard, handleDeleteCard, handleLikeCard} from './components/card.js';
import {openModal, closeModal} from './components/modal.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const formEditProfile = document.querySelector('.popup__form[name="edit-profile"]');
const formAddCard = document.querySelector('.popup__form[name="new-place"]');
const profileName = document.querySelector('.profile__title'); // элемент с именем
const profileAbout = document.querySelector('.profile__description'); // элемент с информацией о себе
const nameInput = document.querySelector('.popup__input_type_name'); // поле ввода имени
const jobInput = document.querySelector('.popup__input_type_description'); // поле ввода информации о себе
const addCardNameInput = document.querySelector('.popup__input_type_card-name'); // поле ввода имени новой карточки
const addCardLinkInput = document.querySelector('.popup__input_type_url'); // поле ввода ссылки

// Модальное окно
// редактировать профиль
const editProfileBtn = document.querySelector('.profile__edit-button');
const popupProfileBtn = document.querySelector('.popup_type_edit');
const closeEditBtn = document.querySelectorAll('.popup__close');

// добавить карточку
const addBtn = document.querySelector('.profile__add-button');
const popupAddBtn = document.querySelector('.popup_type_new-card');

//открытие картинки
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

// Плавное открытие/закрытие попапов
const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
    popup.classList.add('popup_is-animated');
});



//Функция открытия попапа с картинкой
function openImageClick(item) {
    popupImage.src = item.link;
    popupImage.alt = item.name;
    popupCaption.textContent = item.name;
    openModal(popupTypeImage);
};

// @todo: Вывести карточки на страницу
initialCards.forEach(function (elem) {
    const cardsElement = createCard(elem, handleDeleteCard, openImageClick, handleLikeCard);
    placesList.append(cardsElement);
});

// Обработчики открытия модального окна
editProfileBtn.addEventListener('click', () => {
    // Заполнение полей формы текущими значениями
    nameInput.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;

    openModal(popupProfileBtn);
});

// Обработчик отправки формы "редактировать профиль"
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    
    // Получение значений полей из свойства value
    const newName = nameInput.value;
    const newJob = jobInput.value;

    // Обновление элементов на странице
    profileName.textContent = newName;
    profileAbout.textContent = newJob;

    // Закрытие модального окна
    closeModal(popupProfileBtn);
};

// Прикрепляем обработчик к форме редактирования профиля
formEditProfile.addEventListener('submit', handleFormSubmit);

addBtn.addEventListener('click', () => {
    openModal(popupAddBtn);
});

// Обработчик отправки формы добавления новой карточки
function handleAddCardSubmit(evt) {
    evt.preventDefault(); // Отменяем стандартное поведение формы

    // Получаем значения из полей формы для новой карточки
    const newCardName = addCardNameInput.value;
    const newCardLink = addCardLinkInput.value;

    // Создаем объект с новой карточкой
    const newCard = {
        name: newCardName,
        link: newCardLink
    };

    // Создаем новую карточку
    const newCardElement = createCard(newCard, handleDeleteCard, openImageClick, handleLikeCard);

    // Добавляем новую карточку в начало контейнера
    placesList.prepend(newCardElement);

    // Очищаем поля формы для новой карточки
    addCardNameInput.value = '';
    addCardLinkInput.value = '';

    // Закрываем попап
    closeModal(popupAddBtn);
};

// Прикрепляем обработчик к форме добавления новой карточки
formAddCard.addEventListener('submit', handleAddCardSubmit);

// Обработчик закрытия модального окна по кнопке (крестик)
closeEditBtn.forEach(item => {
    item.addEventListener('click', () => {
        const popup = item.closest('.popup');
        if (popup) {
            closeModal(popup);
        };
    });
});