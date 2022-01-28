package com.bftcom.online.infrastructure.repositories.data;

import com.bftcom.online.infrastructure.models.Book;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookDataRepository extends CrudRepository<Book, Long> {
    /**
     * Поиск объектов по ключевому слову.
     * @param search Ключевое слово
     * @return Список объектов
     */
    @Query("select distinct book from Book book " +
                            "left join book.authors author " +
                            "left join book.genres genre " +
                            "where lower(book.name) like lower(concat('%', :search, '%')) " +
                            "or lower(author.displayName) like lower(concat('%', :search, '%'))" +
                            "or lower(genre.name) like lower(concat('%', :search, '%'))")
    List<Book> search(@Param("search") String search);
}
