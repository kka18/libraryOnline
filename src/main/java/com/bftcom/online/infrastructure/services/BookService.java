package com.bftcom.online.infrastructure.services;

import com.bftcom.online.infrastructure.models.Book;
import com.bftcom.online.infrastructure.repositories.data.BookDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Сервис доступа к данным "Книга"
 */
@Service
public class BookService implements IBookService {
    // Репозиторий доступа к данным
    @Autowired
    private BookDataRepository repository;
    /**
     * Получить объект по идентификатору.
     *
     * @param id Идентификатор
     * @return Объект
     */
    @Override
    public Optional<Book> findById(long id) {
        return repository.findById(id);
    }

    /**
     * Получить список объектов.
     *
     * @return Список объектов
     */
    @Override
    public List<Book> findAll() {
        return (List<Book>) repository.findAll();
    }

    /**
     * Сохранить объект.
     *
     * @param book Объект
     * @return Объект
     */
    @Override
    public Book save(Book book) {
        return repository.save(book);
    }

    /**
     * Обновить объект.
     *
     * @param book   Объект
     * @param params Параметры
     */
    @Override
    public void update(Book book, String[] params) {
        repository.save(book);
    }

    /**
     * Удалить объект по идентификатору.
     *
     * @param id Идентификатор
     */
    @Override
    public void deleteById(long id) {
        repository.deleteById(id);
    }

    /**
     * Получить случайные объекты.
     * @param numberOf Количество случайных объектов
     * @return Список объктов
     */
    @Override
    public List<Book> getRandomBooks(int numberOf) {
        //NOTE: Неоптимальный метод получения
        List<Book> books = findAll();
        List<Book> randomBooks = new ArrayList<>();
        List<Book> copy = new ArrayList<>(books);

        SecureRandom rand = new SecureRandom();
        for (int i = 0; i < Math.min(numberOf, books.size()); i++) {
            randomBooks.add(copy.remove(rand.nextInt( copy.size())));
        }

        return randomBooks;
    }

    /**
     * Получить объекты по ключевому слову
     *
     * @param search Ключевое слово
     * @return Список объектов
     */
    @Override
    public List<Book> searchBooks(String search) {
        return repository.search(search);
    }
}
