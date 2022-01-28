package com.bftcom.online.infrastructure.repositories.jdbc;

import com.bftcom.online.infrastructure.models.Book;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class BookMapper implements RowMapper<Book> {

    public Book mapRow(ResultSet resultSet, int i) throws SQLException {

        Book book = new Book();
        book.setId(resultSet.getLong("id"));
        book.setName(resultSet.getString("name"));
        book.setDefinition(resultSet.getString("definition"));
        return book;
    }
}
