# Responsive Login & Registration System (Frontend Only)

## 📝 Project Overview

This is a frontend-only user authentication interface with login and registration forms designed to provide a smooth and interactive experience. It simulates a login/signup flow with input validation and dynamic UI behavior using JavaScript. Though no backend integration is present, mock login state is stored using `localStorage`.

Key features include:
- Combined login and registration forms on a single responsive page.
- Smooth form toggle using JavaScript (Login <-> Register).
- Show/hide password feature for user convenience.
- Email and password validation (including password strength and confirmation check).
- User inputs are temporarily stored in localStorage for simulating login.
- Designed with mobile responsiveness and modern animations/transitions.

## 🚀 Steps to Run/Test

1. Open `index.html` in a modern web browser.
2. The default view will show the Login form.
3. Click the “Register” link/button to switch to the Registration form.
4. Enter user details and test the following:
   - Valid email format (e.g., user@example.com).
   - Strong password (suggested: min 8 characters with letters & numbers).
   - Confirm password field matches the password.
5. Submit the form and observe the UI feedback.
6. Switch back to Login and enter the registered credentials.
7. Toggle the password visibility icon to test show/hide password.
8. Open the browser developer tools > Application > localStorage to view stored user data.
