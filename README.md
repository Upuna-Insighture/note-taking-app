# SSO Implementation for React/Node.js Project

This guide explains how to integrate the existing SSO authentication module into a new React/Node.js project. The module supports Google, Facebook, and GitHub login options and can be customized as per your project requirements.

## Project Structure

### Copy the Auth Module

To start, copy the `auth` folder into the `src` directory of your React project:

```
├── src
│    ├── auth
│    │    ├── assets
│    │    │    └── img               # Assets like images for login buttons
│    │    ├── components
│    │    │    ├── FacebookLoginButton.jsx  # Facebook login component
|    |    |    ├── GithubLoginButton.jsx    # GitHub login component
│    │    │    ├── GoogleLoginButton.jsx    # Google login component
│    │    ├── context
│    │    │    └── AuthProvider.js          # Auth context for managing authentication state
│    │    ├── pages
│    │    │    └── Login.js                 # Login page component
│    │    ├── styles
│    │    │    └── login.css                # CSS for the login page
```

This structure provides everything you need to set up the authentication module in your project.

## Configuration

### Environment Variables

Add the following to your `.env` file to configure the authentication flow:

```env
REACT_APP_AUTH_SERVER_URL=http://localhost:5000/      # Your Node.js backend server URL
REACT_APP_AUTH_LOGIN_ROUTE=/login                     # Login page URL
REACT_APP_AUTH_NVIGATE_SUCCESS=/notes                 # Route to navigate after a successful login
REACT_APP_AUTH_NVIGATE_ERROR=/                        # Route to navigate after a failed login
```

- **REACT_APP_AUTH_SERVER_URL**: This is the URL of your authentication server. In development, it will likely be `http://localhost:5000/`.
  
- **REACT_APP_AUTH_LOGIN_ROUTE**: Defines the login page route. Typically, this will be `/login`.
  
- **REACT_APP_AUTH_NVIGATE_SUCCESS**: Defines where users should be redirected after successful authentication. In this example, users are redirected to `/notes`.
  
- **REACT_APP_AUTH_NVIGATE_ERROR**: Defines where users should be redirected if authentication fails. This example redirects to the home page (`/`).

You can customize these routes as per your project’s flow.

### Logout Function

To enable the logout functionality, add the following code to your logout function:

```js
window.open(process.env.REACT_APP_API_URL + "/auth/logout", "_self");
```

This initiates the logout process by calling the backend endpoint `/auth/logout`. The use of `_self` ensures the user is redirected within the same tab after logging out.

## Customizations

The `auth` module is designed to be modular and easily customizable. You can modify the following components based on your project’s requirements:

- **Login Buttons**: The components inside `auth/components` (`GoogleLoginButton.jsx`, `FacebookLoginButton.jsx`, and `GithubLoginButton.jsx`) can be customized to fit the design of your project.
  
- **Login Page**: The `auth/pages/Login.js` file serves as the login page. You can change its layout, styling, or add any additional information relevant to your application.
  
- **CSS**: The `auth/styles/login.css` file contains the styles for the login page. Adjust the styles to match your project's theme.

## Server (Node.js)

Make sure your Node.js backend handles the authentication logic and has routes for the login and logout processes. The backend should support OAuth for Google, Facebook, and GitHub logins.

- **Login Route**: Your backend should implement the `/login` route to authenticate users.
- **Logout Route**: The `/auth/logout` route is used to handle the user logout process.

## Starting the Project

1. Ensure the environment variables are correctly set in the `.env` file.
2. Start your Node.js backend server:
   ```bash
   npm run start
   ```
3. Run your React app:
   ```bash
   npm start
   ```
