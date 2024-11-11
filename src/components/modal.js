// Функция для открытия модального окна
export const openModal = (popup) => {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleCloseEsc);
    document.addEventListener('click', closeOverlay);
};

// Функция для закрытия модального окна
export const closeModal = (popup) => {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleCloseEsc);
    document.removeEventListener('click', closeOverlay);
};

// Escape
const handleCloseEsc = (evt) => {
    if (evt.key === 'Escape') {
        const popupActive = document.querySelector('.popup_is-opened');
        closeModal(popupActive);
    }
};

// через оверлэй
const closeOverlay = (evt) => {
    if (evt.target.classList.contains('popup_is-opened')) {
        closeModal(evt.target);
    }
};