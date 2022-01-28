package com.bftcom.online.controllers;

import com.bftcom.online.infrastructure.models.Genre;
import com.bftcom.online.infrastructure.services.IGenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class GenresController {

    @Autowired
    private IGenreService service;

    /**
     * Получить список жанров.
     * @return Список жанров
     */
    @GetMapping("/genres")
    public ResponseEntity<Iterable<Genre>> getGenres() {
        try {
            List<Genre> genres = new ArrayList<Genre>();

            service.findAll().forEach(genres::add);

            if (genres.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(genres, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Получить жанр по идентификатору.
     * @param id Идентификатор жанра
     * @return Жанр
     */
    @GetMapping("/genres/{id}")
    public ResponseEntity<Genre> getGenreById(@PathVariable("id") long id) {
        Optional<Genre> _genre = service.findById(id);

        if (_genre.isPresent()) {
            return new ResponseEntity<>(_genre.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Сохранить жанр.
     * @param genre Жанр
     * @return Жанр
     */
    @PostMapping("/genres")
    public ResponseEntity<Genre> createGenre(@RequestBody Genre genre) {
        try {
            Genre _genre = service
                    //.save(new Book(book.getName(), book.getImage(), book.getContent()));
                    .save(genre);
            return new ResponseEntity<>(_genre, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Обновить жанр.
     * @param genre Жанр
     * @return Жанр
     */
    @PutMapping("/genres/{id}")
    public ResponseEntity<Genre> updateGenre(@PathVariable("id") long id, @RequestBody Genre genre) {
        try {
            Optional<Genre> data = service.findById(genre.getId());

            if (data.isPresent()) {
                Genre _genre =  data.get();
                _genre.setName(genre.getName());
                return new ResponseEntity<>(service.save(_genre), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Удалить жанр.
     * @param id Идентификатор жанра
     * @return Статус
     */
    @DeleteMapping("/genres/{id}")
    public ResponseEntity<HttpStatus> deleteGenre(@PathVariable("id") long id) {
        try {
            service.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
