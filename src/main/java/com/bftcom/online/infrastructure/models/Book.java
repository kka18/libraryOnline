package com.bftcom.online.infrastructure.models;

import javax.persistence.*;
import java.util.List;

/**
 * Доменная модель описания произведения.
 */
@Entity
@Table(name = "book")
public class Book extends NamedEntity {
    // Описание
    @Column(name = "definition", nullable = true)
    private String definition;
    // Авторы произведения
    @ManyToMany
    @JoinTable(
            name = "book_author",
            joinColumns = @JoinColumn(name = "book_id"),
            inverseJoinColumns = @JoinColumn(name = "author_id"))
    List<Author> authors;

    // Жанры произведения
    @ManyToMany
    @JoinTable(
            name = "book_genre",
            joinColumns = @JoinColumn(name = "book_id"),
            inverseJoinColumns = @JoinColumn(name = "genre_id"))
    List<Genre> genres;

    // Файлы
    @ManyToMany
    @JoinTable(
            name = "book_file",
            joinColumns = @JoinColumn(name = "book_id"),
            inverseJoinColumns = @JoinColumn(name = "file_id"))
    private List<BookFile> bookFiles;

    /**
     * Конструктор.
     */
    public Book() {
        super();
    }

    /**
     * Конструктор.
     *
     * @param name    Наименование произведения
     * @param definition   Описание произведения
     */
    public Book(String name, String definition) {
        super(name);
        this.setDefinition(definition);
    }

    /**
     * Получить описание произзведения.
     * @return Описание произведения
     */
    public String getDefinition() {
        return definition;
    }

    /**
     * Установить описание произведения.
     * @param definition Описание произвдения
     */
    public void setDefinition(String definition) {
        this.definition = definition;
    }

    /**
     * Получить список авторов произведения.
     *
     * @return Список авторов произведения.
     */
    public List<Author> getAuthors() {
        return authors;
    }

    /**
     * Установить авторов произведения.
     * @param authors Авторы произведения
     */
    public void setAuthors(List<Author> authors) {
        this.authors = authors;
    }

    /**
     * Получить жанры произведения.
     *
     * @return Жанры произведения
     */
    public List<Genre> getGenres() {
        return genres;
    }

    /**
     * Установить жанры произведения.
     *
     * @param genres Жанры произведения
     */
    public void setGenres(List<Genre> genres) {
        this.genres = genres;
    }

    /**
     * Получить файлы произведения
     * @return Файлы произведения
     */
    public List<BookFile> getBookFiles() {
        return bookFiles;
    }

    /**
     * Установить файлы произведения
     * @param bookFiles
     */
    public void setBookFiles(List<BookFile> bookFiles) {
        this.bookFiles = bookFiles;
    }
}
