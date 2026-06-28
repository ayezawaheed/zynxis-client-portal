# Week 3 – Interactive MFA Timed Gate

## Overview

This project implements a **Multi-Factor Authentication (MFA) Timed Gate** using **Python**, **Flask**, and **SQLite**. It simulates a real-world authentication system where users must verify their identity using either a server-generated One-Time Password (OTP) or a Time-Based One-Time Password (TOTP) generated through an authenticator application.

The project was developed as part of **Bootcamp 2026 – Week 3**.

---

## Features

- User authentication using a 6-digit OTP
- OTP expiry after 5 minutes
- Maximum of 3 verification attempts
- SQLite database for OTP persistence
- Automatic cleanup of expired OTPs
- Multiple concurrent login sessions using unique session IDs
- QR code generation for TOTP setup
- Google Authenticator compatible TOTP verification
- Request logging for authentication events
- REST API built with Flask

---

## Project Structure

```
bootcamp-2026-mfa-timed-gate/
│
├── src/
│   ├── app.py
│   ├── routes.py
│   ├── database.py
│   ├── models.py
│   ├── utils.py
│   └── cleanup.py
│
├── docs/
│   ├── architecture.md
│   ├── ai-review-summary.md
│   └── failure-demo.md
│
├── screenshots/
│
├── tests/
│
├── requirements.txt
└── README.md
```

---

## Technologies Used

- Python 3
- Flask
- SQLite
- PyOTP
- QRCode
- Thunder Client (API Testing)
- Git & GitHub

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd bootcamp-2026-mfa-timed-gate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the application:

```bash
python src/app.py
```

The server will start on:

```
http://127.0.0.1:5000
```

---

## API Endpoints

### Login

**POST**

```
/login
```

Request

```json
{
    "username": "user1"
}
```

Response

```json
{
    "message": "OTP sent successfully",
    "session_id": 1
}
```

---

### Verify OTP

**POST**

```
/verify
```

Request

```json
{
    "session_id": 1,
    "otp": "123456"
}
```

---

### Setup TOTP

**POST**

```
/setup-totp
```

Request

```json
{
    "username": "user1"
}
```

Response

```json
{
    "message": "QR code generated",
    "qr_file": "user1_qr.png"
}
```

---

### Verify TOTP

**POST**

```
/verify
```

Request

```json
{
    "username": "user1",
    "totp": "654321"
}
```

---

## Authentication Flow

1. User sends a login request.
2. Server generates a random 6-digit OTP.
3. OTP is stored in SQLite with a 5-minute expiry and attempt counter.
4. OTP is simulated as being sent to the user's registered device.
5. User submits the OTP.
6. Successful verification logs the user in.
7. Invalid OTP increases the attempt counter.
8. After three failed attempts, the session is invalidated.
9. Expired OTPs are automatically removed.
10. Users can alternatively authenticate using TOTP generated from Google Authenticator.

---

## Bonus Feature

### QR-Based Authentication

The application supports TOTP authentication.

- Generates a unique QR code
- Compatible with Google Authenticator
- Uses PyOTP for verification
- No OTP is stored for each login
- Codes refresh every 30 seconds

---

## Screenshots

The project includes screenshots demonstrating:

- OTP Login
- Successful Verification
- Failed Verification
- QR Code Generation
- TOTP Authentication

---

## Documentation

Additional documentation is available in the `docs` folder:

- architecture.md
- ai-review-summary.md
- failure-demo.md

---

## Future Improvements

- Real SMS and Email integration
- User registration module
- JWT authentication after successful login
- Password hashing
- Rate limiting
- Docker deployment

---

## Author

**Ayeza Waheed**

Bootcamp 2026 – Week 3 Project

Interactive MFA Timed Gate
