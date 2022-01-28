package com.bftcom.online.infrastructure.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Доменная модель описания жанра произведения.
 */
@Entity
@Table(name = "genre")
public class Genre extends NamedEntity {
    // Родительский жанр произведения
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="parent_id", referencedColumnName = "id")
    private Genre parent;
    // Дочерние жанры произведения
    @JsonIgnore
    @OneToMany(mappedBy="parent", fetch = FetchType.LAZY)
    private List<Genre> genres = new ArrayList<Genre>();

    /**
     * Получить родительский жанр произведения.
     * @return Родительский жанр произведения
     */
    public Genre getParent() {
        return parent;
    }

    /**
     * УУстановить родительский жанр произведения.
     * @param parentGenre Родительский жанр произведения
     */
    public void setParent(Genre parentGenre) {
        this.parent = parentGenre;
    }

    /**
     * Получить дочерние  жанры произведения.
     * @return Дочерние жанры произведения
     */
    public List<Genre> getGenres() {
        return genres;
    }

    /**
     * Установить дочерние жанры произведения.
     * @param genres Дочрние жанры произведения
     */
    public void setGenres(List<Genre> genres) {
        this.genres = genres;
    }
}
