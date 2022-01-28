package com.bftcom.online.infrastructure.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

/**
 * Доменная модель описания файла.
 */
@Entity
@Table(name = "file")
public class BookFile extends NamedEntity {
    // Данные
    @Column(name = "data", nullable = true)
    private byte[] data;

    // Тип
    @Column(name = "type", nullable = true)
    private String type;

    // Тип содержимого, 1-image, 2-content
    @Column(name = "content_type", nullable = true)
    private int contentType;

    // Url
    @Transient
    private String url;

    // Произведения
    @JsonIgnore
    @ManyToMany
    @JoinTable(name = "book_file",
            joinColumns = @JoinColumn(name = "book_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "file_id", referencedColumnName = "id"))
    private List<Book> books;

    /**
     * Конструктор.
     */
    public BookFile() {
        super();
    }

    /**
     * Конструктор.
     * @param name Наименование
     * @param data Содержимое
     * @param type Тип
     * @param contentType Тип содержимого
     */
    public BookFile(String name, byte[] data, String type, int contentType) {
        super(name);
        this.setData(data);
        this.setType(type);
        this.setContentType(contentType);
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

    /**
     * Получить содержимое
     * @return Содержимое
     */
    public byte[] getData() {
        return data;
    }

    /**
     * Установить содержимое
     * @param data Содержимое
     */
    public void setData(byte[] data) {
        this.data = data;
    }

    /**
     * Получить тип
     * @return Тип
     */
    public String getType() {
        return type;
    }

    /**
     * Установить тип
     * @param type Тип
     */
    public void setType(String type) {
        this.type = type;
    }

    /**
     * Получить тип содержимого
     * @return Тип содержимого
     */
    public int getContentType() {
        return contentType;
    }

    /**
     * Установить тип содержимого
     * @param contentType
     */
    public void setContentType(int contentType) {
        this.contentType = contentType;
    }

    /**
     * Получить Url
     * @return Url
     */
    public String getUrl() {
        return url;
    }

    /**
     * Установить Url
     * @param url Url
     */
    public void setUrl(String url) {
        this.url = url;
    }
}
