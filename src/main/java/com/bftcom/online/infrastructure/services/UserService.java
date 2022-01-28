package com.bftcom.online.infrastructure.services;

import com.bftcom.online.infrastructure.models.User;
import com.bftcom.online.infrastructure.repositories.data.UserDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService {

    @Autowired
    private UserDataRepository repository;

    /**
     * Получить объект по идентификатору.
     *
     * @param id Идентификатор
     * @return Объект
     */
    @Override
    public Optional<User> findById(long id) {
        return repository.findById(id);
    }

    /**
     * Получить список объектов.
     *
     * @return Список объектов
     */
    @Override
    public List<User> findAll() {
        return null;
    }

    /**
     * Сохранить объект.
     *
     * @param user Объект
     * @return Объект
     */
    @Override
    public User save(User user) {
        return null;
    }

    /**
     * Обновить объект.
     *
     * @param user   Объект
     * @param params Параметры
     */
    @Override
    public void update(User user, String[] params) {

    }

    /**
     * Удалить объект по идентификатору.
     *
     * @param id Идентификатор
     */
    @Override
    public void deleteById(long id) {

    }

    /**
     * Авторизация пользователя.
     *
     * @param user     Имя пользователя
     * @param password Пароль
     * @return Список объектов
     */
    @Override
    public Optional<User> authorize(String user, String password) {
        return repository.authorize(user, password);
    }
}
