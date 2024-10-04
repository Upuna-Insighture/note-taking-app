# Single Sign-On (SSO) Implementation for React & Node.js

This guide walks you through integrating the existing SSO authentication module into a new project using React for the client-side and Node.js for the server-side. The module supports Google, Facebook, and GitHub login options.

## Project Setup

### Step 1: Copy the `auth` Module

To get started, copy the `auth` folder into the `src` directory of your React project.

```
├── src
│    ├── auth
│    │    ├── assets                     # Assets like images for login buttons
│    │    │    └── img
│    │    ├── components                 # Components for third-party logins
│    │    │    ├── FacebookLoginButton.jsx
│    │    │    ├── GithubLoginButton.jsx
│    │    │    ├── GoogleLoginButton.jsx
│    │    ├── context                    # Authentication context for state management
│    │    │    └── AuthProvider.js
│    │    ├── pages                      # Page for user login
│    │    │    └── LoginPage.js
│    │    ├── styles                     # CSS for login page
│    │    │    └── login.css
```

This directory contains all the necessary components to implement social logins and handle authentication logic.

### Step 2: Set Environment Variables

Add the following environment variables to your `.env` file in the root of your React project:

```env
REACT_APP_AUTH_SERVER_URL=http://localhost:5000/     # Your Node.js backend server URL
REACT_APP_AUTH_LOGIN_ROUTE=/login                    # Login page route
REACT_APP_AUTH_NVIGATE_SUCCESS=/notes                # Route to navigate after successful login
REACT_APP_AUTH_NVIGATE_ERROR=/                      # Route to navigate after login failure
```

- **REACT_APP_AUTH_SERVER_URL**: Points to your Node.js server (e.g., `http://localhost:5000/` in development).
  
- **REACT_APP_AUTH_LOGIN_ROUTE**: The login page path where the login page lives, typically `/login`.
  
- **REACT_APP_AUTH_NVIGATE_SUCCESS**: The path where users are redirected after a successful login, in this case `/notes`.
  
- **REACT_APP_AUTH_NVIGATE_ERROR**: The path where users are redirected in case of authentication failure, here it is set to the home page `/`.

You can adjust these values based on your specific project flow.

### Step 3: Using the AuthContext

To access authenticated user details, you can use the `AuthContext` provided in the `auth` module. For example:

```js
const { user } = useContext(AuthContext);
```

This will give you access to the `user` object which contains the logged-in user's information.

### Step 4: Implement the Login Function

To trigger the login process and navigate to the login page, define a function as shown below:

```js
const handleLogin = () => {
  navigate('/login');
};
```

This `handleLogin` function navigates users to the `/login` route where the login page (`LoginPage.js`) will be rendered.

### Step 5: Define Routes for Login

In your routes file, add the login route pointing to the `LoginPage.js` component:

```jsx
<Route path='/login' element={<LoginPage />} />
```

This ensures that when users navigate to `/login`, the login page is displayed, allowing them to authenticate using their preferred SSO provider (Google, Facebook, or GitHub).

### Step 6: Logout Function

To implement the logout functionality, add the following to your logout function:

```js
window.open(process.env.REACT_APP_API_URL + "/auth/logout", "_self");
```

This will initiate the logout process by calling the `/auth/logout` route on your backend and redirecting the user to log them out.

### Step 7: Protecting Routes with AuthProvider

To ensure that certain parts of your application are only accessible to authenticated users, wrap your routes with the `AuthProvider` component. This will manage the authentication state across your app.

Here’s an example of wrapping your main component with `AuthProvider`:

```jsx
const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <RouterFile />   {/* Define your routes here */}
        </AuthProvider>
      </BrowserRouter>  
    </ErrorBoundary>
  );
};
```

The `AuthProvider` makes the authentication context available throughout your app, ensuring that protected routes are only accessible to logged-in users.

### Step 8: Customizing the Auth Module

Feel free to customize the `auth` module based on your project’s needs. You can:

- Modify the social login buttons (`GoogleLoginButton.jsx`, `FacebookLoginButton.jsx`, `GithubLoginButton.jsx`) to fit your design.
- Update the `LoginPage.js` component to include additional information or styles.
- Adjust the CSS in `login.css` to match your app’s styling.

## Server (Node.js)

Make sure your Node.js backend implements the necessary authentication logic:

- **Login Route**: Your backend should handle authentication at the `/login` route.
- **Logout Route**: The backend should also handle logout at the `/auth/logout` route, ensuring the session or token is cleared when users log out.

## Running the Project

### 1. Start the Node.js Server

Ensure your Node.js server is running and handles the login/logout routes for OAuth providers.

```bash
npm run start
```

### 2. Run the React App

Start your React app, which will communicate with the backend server for authentication.

```bash
npm start
```

### 3. Access Protected Pages

Once authenticated, users will be able to access protected pages in your app. Ensure all routes requiring authentication are wrapped with the `AuthProvider`.