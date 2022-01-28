package com.bftcom.online.infrastructure.repositories;

import java.util.List;
import java.util.Optional;

/**
 * Базовый интерфейс доступа к данным
 * @param <T> Объект
 */
public interface IRepository<T> {
    /**
     * Получить объект по идентификатору.
     * @param id Идентификатор
     * @return Объект
     */
    public Optional<T> findById(long id);

    /**
     * Получить список объектов.
     * @return Список объектов
     */
    public List<T> findAll();

    /**
     * Сохранить объект.
     *
     * @param t Объект
     * @return Объект
     */
    public T save(T t);

    /**
     * Обновить объект.
     * @param t Объект
     * @param params Параметры
     */
    public void update(T t, String[] params);

    /**
     * Удалить объект по идентификатору.
     * @param id Идентификатор
     */
    public void deleteById(long id);
}
