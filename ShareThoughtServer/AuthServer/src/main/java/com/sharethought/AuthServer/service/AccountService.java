package com.sharethought.AuthServer.service;

import com.sharethought.AuthServer.dto.request.AccountCreateRequest;
import com.sharethought.AuthServer.dto.request.ChangePasswordRequest;

public interface AccountService {

    void createAccount(AccountCreateRequest request);
    void changePassword(Long id, ChangePasswordRequest request);
    void deleteAccount(Long id);


}
