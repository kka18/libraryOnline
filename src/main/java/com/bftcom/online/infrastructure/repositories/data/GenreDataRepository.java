package com.bftcom.online.infrastructure.repositories.data;

import com.bftcom.online.infrastructure.models.Genre;
import org.springframework.data.repository.CrudRepository;

public interface GenreDataRepository extends CrudRepository<Genre, Long> {

}
