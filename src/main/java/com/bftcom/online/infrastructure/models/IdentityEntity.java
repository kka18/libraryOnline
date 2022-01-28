package com.bftcom.online.infrastructure.models;

import javax.persistence.*;

/**
 * Модель описания базового класса c атрибутом id.
 */
@MappedSuperclass
public abstract class IdentityEntity {
    // Идентификатор
    @Id
    @GeneratedValue(generator = "increment", strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private long id;

    /**
     * Конструктор
     */
    public IdentityEntity() {

    }

    /**
     * Получить идентификатор.
     * @return Идентификатор
     */
    public long getId() {
        return this.id;
    }

    /**
     * Установить идентификатор.
     * @param id Идентификатор
     */
    public void setId(long id) {
        this.id = id;
    }
}
