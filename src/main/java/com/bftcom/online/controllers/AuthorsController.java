package com.bftcom.online.controllers;

import com.bftcom.online.infrastructure.models.Author;
import com.bftcom.online.infrastructure.services.IAuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class AuthorsController {

    @Autowired
    private IAuthorService service;

    /**
     * Получить список авторов.
     * @return Список авторов
     */
    @GetMapping("/authors")
    public ResponseEntity<Iterable<Author>> getAuthors() {
        try {
            List<Author> authors = new ArrayList<Author>();

            service.findAll().forEach(authors::add);

            if (authors.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(authors, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Получить автора по идентификатору.
     * @param id Идентификатор автора
     * @return Автор
     */
    @GetMapping("/authors/{id}")
    public ResponseEntity<Author> getAuthorsById(@PathVariable("id") long id) {
        Optional<Author> _author = service.findById(id);

        if (_author.isPresent()) {
            return new ResponseEntity<>(_author.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Сохранить автора.
     * @param author Автор
     * @return Автор
     */
    @PostMapping("/authors")
    public ResponseEntity<Author> createAuthor(@RequestBody Author author) {
        try {
            Author _author = service.save(author);
            return new ResponseEntity<>(_author, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Обновить автора.
     * @param author Автор
     * @return Автор
     */
    @PutMapping("/authors/{id}")
    public ResponseEntity<Author> updateAuthor(@PathVariable("id") long id, @RequestBody Author author) {
        try {
            Optional<Author> data = service.findById(author.getId());

            if (data.isPresent()) {
                Author _author =  data.get();
                _author.setFirstName(author.getFirstName());
                _author.setLastName(author.getLastName());
                _author.setDisplayName(author.getDisplayName());
                _author.setBiography(author.getBiography());
                return new ResponseEntity<>(service.save(_author), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Удалить автора по идентификатору.
     * @param id Идентификатор
     * @return Статус
     */
    @DeleteMapping("/authors/{id}")
    public ResponseEntity<HttpStatus> deleteAuthor(@PathVariable("id") long id) {
        try {
            service.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
