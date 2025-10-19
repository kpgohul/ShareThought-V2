package com.sharethought.AuthServer.config;

import com.sharethought.AuthServer.entity.AccountDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthProvider implements AuthenticationProvider {

    private final AccountDetailsService service;
    private final PasswordEncoder encoder;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String phoneOrEmail = authentication.getName();
        String rawPass = authentication.getCredentials().toString();
        UserDetails accountDetails = service.loadUserByUsername(phoneOrEmail);
        if(encoder.matches(rawPass, accountDetails.getPassword())){
            return new UsernamePasswordAuthenticationToken(accountDetails, null, accountDetails.getAuthorities());
        }else{
            throw new BadCredentialsException("Account Details are incorrect!");
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
    }
}
