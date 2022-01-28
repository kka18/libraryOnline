package com.bftcom.online.infrastructure.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Доменная модель описания пользователя.
 */
@Entity
@Table(name = "user_table")
public class User extends NamedEntity {

    // Пароль пользователя
    @Column(name = "password", nullable = false)
    private String password;

    /**
     * Конструктор.
     */
    public User(){
        super();
    }

    /**
     * Конструктор.
     * @param name Имя пользователя
     * @param password Пароль пользователя
     */
    public User(String name, String password) {
        super(name);
        this.setPassword(password);
    }

    /**
     * Получить пароль пользователя.
     * @return Пароль пользователя
     */
    public String getPassword() {
        return password;
    }

    /**
     * Установить пароль пользователя
     * @param password
     */
    public void setPassword(String password) {
        this.password = password;
    }
}
