package com.example.User_Service.Controller;

import com.example.User_Service.Entity.UserInfo;
import com.example.User_Service.Pojo.LoginRequest;
import com.example.User_Service.Pojo.LoginResponse;
import com.example.User_Service.Pojo.ResultResponse;
import com.example.User_Service.session.JwtBlacklistService;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.web.bind.annotation.*;
import com.example.User_Service.session.JwtUtils;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@ComponentScan
@RestController
@RequestMapping("/UserService")
public class UserController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private JwtBlacklistService jwtBlacklistService;


    @Autowired
    DataSource dataSource;
    @Autowired
    PasswordEncoder passwordEncoder;

    @PostMapping("/Login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) throws JsonProcessingException {
        ResultResponse resultResponse = new ResultResponse();
        Authentication authentication;
        try {
            authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        } catch (AuthenticationException ex) {
            resultResponse.setStatus("1");
            resultResponse.setErrorCode("101012");
            resultResponse.setMessage("Invalid User Password");
            return ResponseEntity.ok(resultResponse);
        }
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String jwtToken = jwtUtils.generateTokenFromUsername(userDetails);

        List<String> roles = userDetails.getAuthorities() != null
                ? userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList())
                : new ArrayList<>();

        LoginResponse response = new LoginResponse(jwtToken, userDetails.getUsername(), roles);
        resultResponse.setStatus("0");
        resultResponse.setErrorCode("101012");
        resultResponse.setMessage("Success");
        resultResponse.setData(response);
        return ResponseEntity.ok(resultResponse);
    }

    @PostMapping("/Logout")
    public ResponseEntity<?> logoutUser(HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        ResultResponse result = new ResultResponse();
        if (token != null && jwtUtils.validateJwtToken(token)) {
            jwtBlacklistService.blacklistToken(token);
            result.setStatus("1");
            result.setErrorCode("101013");
            result.setMessage("Logged out successfully");
        } else {
            result.setStatus("0");
            result.setErrorCode("101014");
            result.setMessage("Invalid Token");
        }
        return ResponseEntity.ok(result);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/createUser")
    public ResponseEntity<?> createUser(@RequestBody UserInfo userinfo) {
        JdbcUserDetailsManager userDetailsManager = new JdbcUserDetailsManager(dataSource);
        ResultResponse response;
        if (userDetailsManager.userExists(userinfo.getUsername())) {
            response = new ResultResponse("0", "User Already Exist", "101201");
            return ResponseEntity.ok(response);
        }

        UserDetails user = User.withUsername(userinfo.getUsername())
                .password(passwordEncoder.encode(userinfo.getPassword()))
                .roles(userinfo.getRole())
                .build();
        userDetailsManager.createUser(user);
        response = new ResultResponse("1", "User Created Succesfully", "");
        return ResponseEntity.ok(response);
    }


}
