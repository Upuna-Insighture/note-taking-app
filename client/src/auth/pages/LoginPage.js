import FacebookLoginButton from "../components/FacebookLoginButton.jsx";
import GithubLoginButton from "../components/GithubLoginButton.jsx";
import GoogleLoginButton from "../components/GoogleLoginButton.jsx";
import '../styles/login.css';

const LoginPage = () => {
  return (
    <div className="login">
      <div className="wrapper">
        <div className="center">
          <GoogleLoginButton />
          <FacebookLoginButton />
          <GithubLoginButton />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;