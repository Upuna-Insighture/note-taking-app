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

### Step 1: Install Required Dependencies

To set up the authentication server, install the following npm packages:

```bash
npm install cors cookie-session passport passport-facebook passport-github2 passport-google-oauth20
```

- **cors**: Enables Cross-Origin Resource Sharing (CORS) between your React app and the Node.js server.
- **cookie-session**: Manages session cookies for user authentication.
- **passport**: Middleware for authentication.
- **passport-facebook**: Strategy for Facebook login.
- **passport-github2**: Strategy for GitHub login.
- **passport-google-oauth20**: Strategy for Google OAuth 2.0 login.

### Step 2: Copy `authRoutes.js` and `passportConfig.js`

1. Copy the `authRoutes.js` and `passportConfig.js` files into your project.
2. Fix the imports in both files if necessary to match your project structure.

These files contain the routing logic for authentication and the passport configuration for OAuth providers (Google, Facebook, GitHub).

### Step 3: Configure SSO Providers

To allow the SSO providers (Google, GitHub, Facebook) to authenticate users in your app, you need to configure them in their respective developer portals.

Once configured, add the following environment variables to your `.env` file:

```env
# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# GitHub OAuth
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# Facebook OAuth
FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=

# Cookie Session Key
COOKIE_KEY=
```

- **GOOGLE_CLIENT_ID** & **GOOGLE_CLIENT_SECRET**: These values come from your Google developer console for OAuth.
- **GITHUB_CLIENT_ID** & **GITHUB_CLIENT_SECRET**: These values are generated in your GitHub OAuth app settings.
- **FACEBOOK_CLIENT_ID** & **FACEBOOK_CLIENT_SECRET**: These values are generated in your Facebook developer portal.
- **COOKIE_KEY**: A secret key used for signing the session cookie. You can generate a random string for this key.

### Step 4: Configure Callback URLs

Each OAuth provider (Google, GitHub, Facebook) requires a callback URL to be set. Ensure that the callback URLs in your `passportConfig.js` match the ones you configure in the SSO provider portals.

For example:

- Google Callback URL: `http://localhost:5000/auth/google/callback`
- GitHub Callback URL: `http://localhost:5000/auth/github/callback`
- Facebook Callback URL: `http://localhost:5000/auth/facebook/callback`

These URLs should match the ones you've set up in Google, GitHub, and Facebook OAuth settings.

### Step 5: Add Server Configuration to `index.js` or Main Server File

In your main server file (e.g., `index.js`), add the following middleware and routes:

1. **Session Management**:

```js
app.use(
  session({
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    keys: [process.env.COOKIE_KEY], // Use the key from the .env file
    cookie: {
      secure: true, 
      sameSite: 'None', // Required for CORS when working with different domains
    },
  })
);
```

This sets up session cookies with a lifespan of 1 day and ensures cookies are only sent over secure HTTPS connections.

2. **Passport Initialization**:

```js
app.use(passport.initialize());
app.use(passport.session());
```

This initializes passport and enables session support, allowing users to stay logged in across page reloads.

3. **CORS Configuration**:

```js
const allowedOrigins = ['http://localhost:3000']; // Frontend URL (adjust for production)

app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  })
);
```

This enables CORS support, allowing your frontend at `http://localhost:3000` (or your production URL) to communicate with the backend. It also ensures credentials (cookies) are included in cross-origin requests.

4. **Authentication Routes**:

```js
app.use('/auth', authRoutes);
```

This adds routing for authentication endpoints such as `/auth/google`, `/auth/github`, and `/auth/facebook`. These routes handle the login and callback flow for each provider.

### Step 6: Starting the Server

Once everything is set up, you can start your Node.js server by running:

```bash
npm start
```

Ensure that your frontend (React) is running on `http://localhost:3000` and the backend on `http://localhost:5000`.

---

This concludes the setup for the Node.js server. Make sure you test the OAuth login flows for Google, GitHub, and Facebook in your application to confirm everything is working as expected.