package com.sharethought.AuthServer.util;

import com.sharethought.AuthServer.entity.Account;
import com.sharethought.AuthServer.entity.AccountDetails;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class SecurityUtil {

    public static Long getLoggedInAccountID() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()|| !(auth.getPrincipal() instanceof AccountDetails userDetails)) {
            throw new RuntimeException("Security Context Not Has Been Set Properly!");
        }
        return userDetails.getId();
    }

}
