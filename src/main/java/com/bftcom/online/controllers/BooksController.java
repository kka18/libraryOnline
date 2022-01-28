package com.bftcom.online.controllers;

import com.bftcom.online.infrastructure.models.Book;
import com.bftcom.online.infrastructure.services.IBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class BooksController {

    @Autowired
    private IBookService service;

    /**
     * Получить список книг.
     * @return Список книг
     */
    @GetMapping("/books")
    public ResponseEntity<Iterable<Book>> getBooks() {
        try {

            List<Book> books = new ArrayList<Book>();

            service.findAll().forEach(books::add);

            if (books.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(books, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Получить случайные книги
     * @param num Количество случайных книг
     * @return Список книг
     */
    @GetMapping("/books/random")
    public ResponseEntity<Iterable<Book>> getRandomBooks(@RequestParam("num") int num) {
        try {
            List<Book> books = new ArrayList<Book>();

            service.getRandomBooks(num).forEach(books::add);

            if (books.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(books, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Получить книгу по идентификатору.
     * @param id Идентификатор книги
     * @return Книга
     */
    @GetMapping("/books/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable("id") long id) {
        Optional<Book> _book = service.findById(id);

        if (_book.isPresent()) {
            return new ResponseEntity<>(_book.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Сохранить книгу.
     * @param book Книга
     * @return Книга
     */
    @PostMapping("/books")
    public ResponseEntity<Book> createBook(@RequestBody Book book) {
        try {
            Book _book = service.save(book);
            return new ResponseEntity<>(_book, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Обновить книгу.
     * @param book Книга
     * @return Книга
     */
    @PutMapping("/books/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable("id") long id, @RequestBody Book book) {
        try {
            Optional<Book> data = service.findById(book.getId());

            if (data.isPresent()) {
                Book _book =  data.get();
                _book.setName(book.getName());
                _book.setDefinition(book.getDefinition());
                _book.setAuthors(book.getAuthors());
                _book.setGenres(book.getGenres());
                _book.setBookFiles(book.getBookFiles());

                return new ResponseEntity<>(service.save(_book), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Удалить книгу по идентификатору.
     * @param id Идентификатор
     * @return Статус
     */
    @DeleteMapping("/books/{id}")
    public ResponseEntity<HttpStatus> deleteBook(@PathVariable("id") long id) {
        try {
            service.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Получить книги по ключевому слову.
     * @param search Ключевое слово
     * @return Список книг
     */
    @GetMapping("/books/search")
    public ResponseEntity<Iterable<Book>> getSearchBooks(@RequestParam("search") String search) {
        try {
            List<Book> books = new ArrayList<Book>();

            service.searchBooks(search).forEach(books::add);

            if (books.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(books, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
