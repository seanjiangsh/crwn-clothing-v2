import "./authentication.css";
import SignIn from "./sign-in/Sign-in";
import SignUp from "./sign-up/Sign-up";

export default function Authentication() {
  return (
    <div className="authentication-container">
      <SignIn />
      <SignUp />
    </div>
  );
}
