package com.bftcom.online.infrastructure.services;

import com.bftcom.online.infrastructure.models.Book;

import java.util.List;

/**
 * Базовый интерфейс сервиса доступа к репозиторию "Книга"
 */
public interface IBookService extends IService<Book>{
    /**
     * Получить случайные объекты.
     * @param numberOf Количество случайных объектов
     * @return Список объктов
     */
    public List<Book> getRandomBooks(int numberOf);

    /**
     * Получить объекты по ключевому слову
     * @param search Ключевое слово
     * @return Список объектов
     */
    public List<Book> searchBooks(String search);
}