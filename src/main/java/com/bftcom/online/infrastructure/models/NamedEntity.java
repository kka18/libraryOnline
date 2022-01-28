package com.bftcom.online.infrastructure.models;

import javax.persistence.*;

/**
 * Модель описания базового класса c атрибутами id, name.
 */
@MappedSuperclass
public abstract class NamedEntity extends IdentityEntity {
    // Наименование
    @Column(name = "name", nullable = false)
    private String name;

    /**
     * Конструктор.
     */
    public NamedEntity() {

    }

    /**
     * Конструктор.
     * @param name Наименование
     */
    public NamedEntity(String name) {
        this.name = name;
    }

    /**
     * Получить наименование.
     * @return Наименование
     */
    public String getName() {
        return name;
    }

    /**
     * Установить наименование.
     * @param name Наименование
     */
    public void setName(String name) {
        this.name = name;
    }
}
