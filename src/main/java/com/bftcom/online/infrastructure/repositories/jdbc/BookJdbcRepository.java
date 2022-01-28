package com.bftcom.online.infrastructure.repositories.jdbc;

import com.bftcom.online.infrastructure.repositories.IRepository;
import com.bftcom.online.infrastructure.models.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

/**
 * Слой доступа к данным "Книга" (JDBC)
 */
@Repository
public class BookJdbcRepository implements IRepository<Book> {
    private final String SQL_GET_BY_ID = "select * from book where id = ?";
    private final String SQL_GET_ALL = "select * from book";
    private final String SQL_CREATE = "insert into book(name, definition) values (?,?)";
    private final String SQL_UPDATE = "update book set name = ?, definition = ? where id = ?";
    private final String SQL_DELETE = "delete from book where id = ?";
    //
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public BookJdbcRepository(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
    }

    /**
     * Получить объект по идентификатору.
     *
     * @param id Идентификатор
     * @return Объект
     */
    @Override
    public Optional<Book> findById(long id) {
        var data = jdbcTemplate.query(SQL_GET_BY_ID, new BookMapper(), new Object[] { id });
        return data.stream().findFirst();
    }

    /**
     * Получить список объектов.
     *
     * @return Список объектов
     */
    @Override
    public List<Book> findAll() {
        return jdbcTemplate.query(SQL_GET_ALL, new BookMapper());
    }

    /**
     * Сохранить объект.
     *
     * @param book Объект
     * @return Объект
     */
    @Override
    public Book save(Book book) {
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(
                new PreparedStatementCreator() {
                    public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
                        PreparedStatement ps =
                                connection.prepareStatement(SQL_CREATE, new String[] {"id", "name", "definition"});
                        ps.setString(1, book.getName());
                        ps.setString(2, book.getDefinition());
                        return ps;
                    }
                },
                keyHolder);
        book.setId(keyHolder.getKey().longValue());

        return book;
    }

    /**
     * Обновить объект.
     *
     * @param book   Объект
     * @param params Параметры
     */
    @Override
    public void update(Book book, String[] params) {
        jdbcTemplate.update(SQL_UPDATE, book.getName(), book.getDefinition(), book.getId());
    }

    /**
     * Удалить объект по идентификатору.
     *
     * @param id Идентификатор
     */
    @Override
    public void deleteById(long id)
    {
        jdbcTemplate.update(SQL_DELETE, id);
    }
}
