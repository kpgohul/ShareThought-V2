package com.sharethought.AuthServer.service.impl;

import com.sharethought.AuthServer.dto.request.AccountCreateRequest;
import com.sharethought.AuthServer.dto.request.ChangePasswordRequest;
import com.sharethought.AuthServer.entity.Account;
import com.sharethought.AuthServer.entity.Authority;
import com.sharethought.AuthServer.exception.ResourceAlreadyExistException;
import com.sharethought.AuthServer.exception.ResourceNotFoundException;
import com.sharethought.AuthServer.repo.AccountRepo;
import com.sharethought.AuthServer.repo.AuthorityRepo;
import com.sharethought.AuthServer.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final AccountRepo accountRepo;
    private final AuthorityRepo authorityRepo;
    private final PasswordEncoder encoder;


    @Override
    public void createAccount(AccountCreateRequest request) {

        if(accountRepo.findByPhoneNumber(request.getPhoneNumber()).isPresent())
            throw new ResourceAlreadyExistException("Account", "PhoneNUmber", request.getPhoneNumber());
        if(accountRepo.findByEmail(request.getEmail()).isPresent())
            throw new ResourceAlreadyExistException("Account", "Email", request.getEmail());
        Set<Authority> authorities = Set.of(authorityRepo.findDistinctByName("USER"));
        Account newAcc = Account.builder()
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .password(encoder.encode(request.getPassword()))
                .authorities(authorities)
                .build();
        accountRepo.save(newAcc);

    }

    @Override
    public void changePassword(Long id, ChangePasswordRequest request) {

        Account account = accountRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Account", "ID", id.toString()));
        if (!encoder.matches(account.getPassword(), request.getOldPassword())) {
            throw new RuntimeException("Old password is incorrect");
        }
        account.setPassword(encoder.encode(request.getNewPassword()));
        accountRepo.save(account);

    }

    @Override
    public void deleteAccount(Long id) {

        Account account = accountRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Account", "ID", id.toString()));
        accountRepo.delete(account);

    }
}
