package com.sharethought.AuthServer.config;

import com.sharethought.AuthServer.entity.Account;
import com.sharethought.AuthServer.entity.AccountDetails;
import com.sharethought.AuthServer.repo.AccountRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class AccountDetailsService implements UserDetailsService {

    private final AccountRepo repo;


    @Override
    public UserDetails loadUserByUsername(String phoneNumberOrEmail) throws UsernameNotFoundException {
        Account account = repo.findByPhoneNumber(phoneNumberOrEmail)
                .or(() -> repo.findByEmail(phoneNumberOrEmail))
                .orElseThrow(() -> new UsernameNotFoundException("Account not found with the given details:: "+phoneNumberOrEmail));
        var authorities = account.getAuthorities().stream()
                .map(auth -> new SimpleGrantedAuthority(auth.getName()))
                .toList();
        return new AccountDetails(
                account.getId(),
                account.getEmail(),
                account.getPhoneNumber(),
                account.getPassword(),
                authorities
        );

    }
}
