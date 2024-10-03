import FacebookLoginButton from "../auth/FacebookLoginButton.jsx";
import GithubLoginButton from "../auth/GithubLoginButton";
import GoogleLoginButton from "../auth/GoogleLoginButton";

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