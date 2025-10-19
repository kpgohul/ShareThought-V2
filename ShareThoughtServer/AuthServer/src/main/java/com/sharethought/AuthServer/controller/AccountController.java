package com.sharethought.AuthServer.controller;

import com.sharethought.AuthServer.dto.request.AccountCreateRequest;
import com.sharethought.AuthServer.dto.request.ChangePasswordRequest;
import com.sharethought.AuthServer.entity.Account;
import com.sharethought.AuthServer.service.AccountService;
import com.sharethought.AuthServer.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth/accounts")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService service;

    @PostMapping
    public ResponseEntity<?> register(@RequestBody AccountCreateRequest request) {
        service.createAccount(request);
        return ResponseEntity.status(HttpStatus.CREATED).body("Account record created successfully!");
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request) {
        Long loggedAccountId = SecurityUtil.getLoggedInAccountID();
        service.changePassword(loggedAccountId, request);
        return ResponseEntity.ok("Password changed successfully");
    }

    @DeleteMapping
    public ResponseEntity<?> deleteAccount() {
        Long loggedAccountId = SecurityUtil.getLoggedInAccountID();
        service.deleteAccount(loggedAccountId);
        return ResponseEntity.ok("Account deleted successfully");
    }

}
