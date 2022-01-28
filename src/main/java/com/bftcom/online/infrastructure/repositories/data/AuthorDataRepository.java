package com.bftcom.online.infrastructure.repositories.data;

import com.bftcom.online.infrastructure.models.Author;
import org.springframework.data.repository.CrudRepository;

public interface AuthorDataRepository extends CrudRepository<Author, Long> {

}
