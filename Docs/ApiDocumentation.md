# API Documentation

## Overview

This document provides an overview of the API endpoints available in the project. It includes information on the request methods, endpoints, request parameters, and response formats.

## Authentication

### Sign Up

- **Endpoint**: `POST /user/signup`
- **Description**: Registers a new user.
- **Request Body**:
  - `email` (string, required): User's email address.
  - `password` (string, required): User's password.
- **Response**:
  - **Success (201 Created)**:
    - Message: `User registered`
  - **Error (400 Bad Request)**:
    - Message: `Email and password are required`
  - **Error (500 Internal Server Error)**:
    - Message: `Error registering user`

### Login

- **Endpoint**: `POST /user/login`
- **Description**: Authenticates a user and issues tokens.
- **Request Body**:
  - `email` (string, required): User's email address.
  - `password` (string, required): User's password.
- **Response**:
  - **Success (200 OK)**:
    - `accessToken` (string): JWT access token.
    - `refreshToken` (string): JWT refresh token.
    - `userId` (string): User's unique identifier.
  - **Error (400 Bad Request)**:
    - Message: `No Email Provided` or `No Password Provided`
  - **Error (401 Unauthorized)**:
    - Message: `User with that email doesn’t exist` or `Password incorrect!`

### Logout

- **Endpoint**: `POST /user/logout`
- **Description**: Logs out a user by invalidating the refresh token. Required UserId to complete action.
- **Response**:
  - **Success (200 OK)**:
    - Message: `Logged out successfully`
  - **Error (500 Internal Server Error)**:
    - Message: `Error logging out`

### Check Token Validity
  - **Endpoint**: `POST /user/check-access-token`
  - **Description**: Runs the authenticateToken middleware to confirm if the user has a valid access token / Refresh token.
  - **Response**:
    - **Success (200 OK)**:
    - **400 Validation Error**: 
      - Indicates a variables validation has failed. Eg. No DeviceId or UserID. / Bad Request.
    - **401 Unauthorized**: 
      - Indicates missing or invalid authentication credentials.
    - **403 Forbidden**: 
      - Indicates expired or invalid tokens.
    - **500 Internal Server Error**: 
      - Indicates a server-side error.

## Middleware

### authenticateToken

- **Description**: Middleware to authenticate requests using the access token.
- **Behavior**:
  - Verifies the access token.
  - If the access token is expired, checks the refresh token and generates a new access token if valid.
  - Attaches the user information and current refresh token to the request object.

## Error Handling
- **400 Validation Error**: Indicates a variables validation has failed. Eg. No DeviceId or UserID. / Bad Request.
- **401 Unauthorized**: Indicates missing or invalid authentication credentials.
- **403 Forbidden**: Indicates expired or invalid tokens.
- **500 Internal Server Error**: Indicates a server-side error.

## Notes

- The refresh token is stored in the database and is not exposed to the frontend.
- Access tokens are short-lived and are refreshed using valid refresh tokens.