package com.bftcom.online.infrastructure.services;

import com.bftcom.online.infrastructure.models.Genre;
import com.bftcom.online.infrastructure.repositories.data.GenreDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Сервис доступа к данным "Жанр"
 */
@Service
public class GenreService implements IGenreService {
    // Репозиторий доступа к данным
    @Autowired
    private GenreDataRepository repository;
    /**
     * Получить объект по идентификатору.
     *
     * @param id Идентификатор
     * @return Объект
     */
    @Override
    public Optional<Genre> findById(long id) {
        return repository.findById(id);
    }

    /**
     * Получить список объектов.
     *
     * @return Список объектов
     */
    @Override
    public List<Genre> findAll() {
        return (List<Genre>) repository.findAll();
    }

    /**
     * Сохранить объект.
     *
     * @param genre Объект
     * @return Объект
     */
    @Override
    public Genre save(Genre genre) {
        return repository.save(genre);
    }

    /**
     * Обновить объект.
     *
     * @param genre  Объект
     * @param params Параметры
     */
    @Override
    public void update(Genre genre, String[] params) {
        repository.save(genre);
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
