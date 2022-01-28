package com.bftcom.online.infrastructure.services;

import com.bftcom.online.infrastructure.models.Author;
import com.bftcom.online.infrastructure.repositories.data.AuthorDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Сервис доступа к данным "Автор"
 */
@Service
public class AuthorService implements IAuthorService {
    // Репозиторий доступа к данным
    @Autowired
    private AuthorDataRepository repository;
    /**
     * Получить объект по идентификатору.
     *
     * @param id Идентификатор
     * @return Объект
     */
    @Override
    public Optional<Author> findById(long id) {
        return repository.findById(id);
    }

    /**
     * Получить список объектов.
     *
     * @return Список объектов
     */
    @Override
    public List<Author> findAll() {
        return (List<Author>) repository.findAll();
    }

    /**
     * Сохранить объект.
     *
     * @param book Объект
     * @return Объект
     */
    @Override
    public Author save(Author book) {
        return repository.save(book);
    }

    /**
     * Обновить объект.
     *
     * @param book   Объект
     * @param params Параметры
     */
    @Override
    public void update(Author book, String[] params) {
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
}
