package com.bftcom.online.infrastructure.services;

import com.bftcom.online.infrastructure.models.User;

import java.util.Optional;

/**
 * Базовый интерфейс сервиса доступа к репозиторию "Пользователь"
 */
public interface IUserService extends IService<User> {
    /**
     * Авторизация пользователя.
     * @param user Имя пользователя
     * @param password Пароль
     * @return Список объектов
     */
    public Optional<User> authorize(String user, String password);
}
