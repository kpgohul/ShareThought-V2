package com.sharethought.AuthServer.repo;

import com.sharethought.AuthServer.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface AccountRepo extends CrudRepository<Account, Long> {

    Optional<Account> findByPhoneNumber(String phoneNumber);
    Optional<Account> findByEmail(String email);

}
