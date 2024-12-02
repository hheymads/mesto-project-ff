const config = {
    baseUrl: "https://nomoreparties.co/v1/pwff-cohort-1",
    headers: {
      authorization: "74090edb-b742-423d-9482-d9a39f100d25",
      'Content-Type': 'application/json'
    }
  };

  //Функция обрабатывающая ответ сервера
  function getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  // Функция получения данных пользователя
export function getUserInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'GET',
      headers: config.headers
    })
    .then(getResponse);
  };

  // Функция получения карточек с сервера
export function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
  .then(getResponse);
};

// Функция обновления данных пользователя
export function updateUserInfo(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      ...config.headers, // Сохраняем существующие заголовки
      'Content-Type': 'application/json' // Указываем Content-Type
    },
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(getResponse);
};

// Функция добавления новой карточки
export function addCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      ...config.headers, // Сохраняем существующие заголовки
      'Content-Type': 'application/json' // Указываем Content-Type
    },
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(getResponse);
};

// Функция добавления лайка карточке
export function addLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(getResponse);
}

// Функция удаления лайка с карточки
export function removeLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(getResponse);
}

// Функция удаления карточки
export function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(getResponse);
}

// Функция обновления аватара
export function updateAvatar(avatarLink) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink
    })
  })
  .then(getResponse);
}