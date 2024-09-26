# Authentication Flow with Access and Refresh Tokens

This document explains how the authentication system works using access tokens and refresh tokens.

## 1. **Overview**

Authentication is handled by issuing **JWT (JSON Web Tokens)** that represent the identity of the user. We use **two types of tokens** to manage authentication:

- **Access Token**: Short-lived token (e.g., 15 minutes), used to authenticate requests.
- **Refresh Token**: Long-lived token (e.g., 7 days), used to refresh the access token once it expires.

## 2. **Authentication Flow**

### 2.1. **Sign-up**
1. The user provides an email and password.
2. A unique user ID is generated, the password is hashed, and the user is stored in the database.
3. No tokens are generated at sign-up.

### 2.2. **Login**
1. The user sends their email and password.
2. The password is verified against the hashed password in the database.
3. If authentication succeeds:
   - An **access token** is generated (e.g., expires in 15 minutes).
   - A **refresh token** is generated and stored in the database with an expiration time (e.g., 7 days).
   - The access token is sent to the frontend for use in subsequent requests.

### 2.3. **Token Validation (Middleware)**
1. For every protected request, the client sends the access token in the `Authorization` header.
2. The server middleware:
   - Verifies the **access token** using `jwt.verify()`.
   - If the token is valid, the user proceeds.
   - If the token has expired:
     - The **user ID** is extracted from the expired token.
     - The **refresh token** is fetched from the database.
     - If the refresh token is still valid:
       - If the Device Id is identical to stored one:
         - A new access token and refresh token are generated.
         - The old refresh token is removed from the database, and the new one is stored.
         - The new access token is attached to the response for the client to use.
       - Else:
         - Return Error saying Device does not match login. Please Login.

## 3. **Logout**
1. The client sends the access token and optionally the refresh token.
2. The refresh token is deleted from the database, effectively logging the user out.
3. No tokens are valid after logout, and the user must log in again to continue.

## 4. **Refreshing Tokens**
1. When the access token expires:
   - The middleware will automatically generate a new access token if the refresh token is valid.
   - The refresh token is checked against the database to ensure it has not expired or been deleted.
   - A new access token is returned, ensuring the user can continue without interruption.

2. If the refresh token is expired or invalid:
   - The client is forced to log in again, generating new tokens.

## 5. **Security Considerations**
- The **refresh token** is stored server-side (in a database), so if a user logs out, the refresh token is deleted, ensuring that no new access tokens can be generated.
- The **access token** has a short lifespan to minimize risk if exposed.