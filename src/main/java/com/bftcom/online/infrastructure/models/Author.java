package com.bftcom.online.infrastructure.models;

import javax.persistence.*;
import java.util.List;

/**
 * Доменная модель описания автора произведения.
 */
@Entity
@Table(name = "author")
public class Author extends IdentityEntity {
    // Имя автора
    @Column(name = "first_name", nullable = false)
    private String firstName;
    // Фамилия автора
    @Column(name = "last_name", nullable = false)
    private String lastName;
    // Отображаемое имя
    @Column(name = "display_name", nullable = true)
    private String displayName;
    // Краткая биография
    @Column(name = "biography", nullable = true)
    private String biography;
    // Произведения
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "book_author",
            joinColumns = @JoinColumn(name = "book_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "author_id", referencedColumnName = "id"))
    private List<Book> books;

    /**
     * Конструктор.
     */
    public Author(){
        super();
    }

    /**
     * Конструктор.
     * @param firstName Имя автора
     * @param lastName Фамилия автора
     * @param displayName Отображаемое имя
     * @param biography Краткая биография
     */
    public Author(String firstName, String lastName, String displayName, String biography) {
        super();
        this.setFirstName(firstName);
        this.setLastName(lastName);
        this.setDisplayName(displayName);
        this.setBiography(biography);
    }

    /**
     * Получить имя автора.
     * @return Имя автора
     */
    public String getFirstName() {
        return firstName;
    }

    /**
     * Установить имя автора.
     * @param firstName Имя автора
     */
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    /**
     * Получить фамилию автора.
     * @return Фамилия автора
     */
    public String getLastName() {
        return lastName;
    }

    /**
     * Установить фамилию автора.
     * @param lastName Фамилия автора
     */
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    /**
     * Получить отображаемое имя автора.
     * @return Отображаемое имя автора
     */
    public String getDisplayName() {
        return displayName;
    }

    /**
     * Установить отображаемое имя автора.
     * @param displayName Отображаемое имя автора
     */
    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    /**
     * Получить краткую биографиюю автора.
     * @return Краткая биография автора
     */
    public String getBiography() {
        return biography;
    }

    /**
     * Установить краткую биографию автора.
     * @param biography Краткая биография автора
     */
    public void setBiography(String biography) {
        this.biography = biography;
    }

    /**
     * Получить произведения.
     * @return Произведения
     */
    public List<Book> getBooks() {
        return books;
    }

    /**
     * Установить произведения.
     * @param books Произведения
     */
    public void setBooks(List<Book> books) {
        this.books = books;
    }
}


