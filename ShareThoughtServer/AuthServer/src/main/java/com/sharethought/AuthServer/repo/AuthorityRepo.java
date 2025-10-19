package com.sharethought.AuthServer.repo;

import com.sharethought.AuthServer.entity.Authority;
import org.springframework.data.repository.CrudRepository;

public interface AuthorityRepo extends CrudRepository<Authority, Long> {

    Authority findDistinctByName(String name);

}
