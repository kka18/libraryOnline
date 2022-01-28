package com.bftcom.online.infrastructure.repositories.data;

import com.bftcom.online.infrastructure.models.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserDataRepository  extends CrudRepository<User, Long> {
    /**
     * Авторизация пользователя.
     * @param user Имя пользователя
     * @param password Пароль
     * @return Список объектов
     */
    @Query("select distinct user from User user " +
            "where user.name = concat('%', :user, '%') " +
            "and user.password = concat('%', :password, '%')")
    Optional<User> authorize(@Param("user") String user, @Param("password") String password);
}
