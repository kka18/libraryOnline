package com.bftcom.online.infrastructure.services;

import com.bftcom.online.infrastructure.models.BookFile;
import com.bftcom.online.infrastructure.repositories.data.BookDataRepository;
import com.bftcom.online.infrastructure.repositories.data.BookFileDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Сервис доступа к данным "Файл"
 */
@Service
public class BookFileService implements IBookFileService {
    // Репозиторий доступа к данным
    @Autowired
    private BookFileDataRepository repository;

    /**
     * Получить объект по идентификатору.
     *
     * @param id Идентификатор
     * @return Объект
     */
    @Override
    public Optional<BookFile> findById(long id) {
        return repository.findById(id);
    }

    /**
     * Получить список объектов.
     *
     * @return Список объектов
     */
    @Override
    public List<BookFile> findAll() {
        return (List<BookFile>) repository.findAll();
    }

    /**
     * Сохранить объект.
     *
     * @param bookFile Объект
     * @return Объект
     */
    @Override
    public BookFile save(BookFile bookFile) {
        return repository.save(bookFile);
    }

    /**
     * Обновить объект.
     *
     * @param bookFile Объект
     * @param params   Параметры
     */
    @Override
    public void update(BookFile bookFile, String[] params) {
        repository.save(bookFile);
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
