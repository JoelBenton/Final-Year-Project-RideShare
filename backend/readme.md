# Setup

## 1. Dependencies

After cloning the repository, run the following commands to install the dependencies (Based on Package.json):

```bash
npm install 
```

## 2. Variables

Create a .env file in the root directory and add the following variables:

```text
DB_HOST
DB_USER
DB_PASSWORD
DB_DATABASE
DB_PORT
PORT
ACCESS_TOKEN_SECRET - require("crypto").randomBytes(64).toString("hex") <- Used to generate Token - To use in terminal, do node and then copy and run the command for a token.
REFRESH_TOKEN_SECRET - ^
```

Use 127.0.0.1 on Host for local hosted databases.

## 3. Certificate - Development Only

```bash
openssl req -nodes -new -x509 -keyout server.key -out server.cert -days 365
```

Don't change command as backend is setup to work with listed file names.

This command will generate two files:

- `server.key`: Private key.
- `server.cert`: Self-signed certificate.

If being setup for Production, Read HTTPS_Setup.md in instructions folder on github repo.