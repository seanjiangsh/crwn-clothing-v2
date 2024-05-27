import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector } from "../../redux/root-hook";
import { selectUser } from "../../redux/user/selectors";

import SignIn from "./sign-in/Sign-in";
import SignUp from "./sign-up/Sign-up";
import { AuthenticationContainer } from "./Authentication.styles";

export default function Authentication() {
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  // * redirect to shop if user is already signed in
  useEffect(() => {
    console.log("auth", user);
    if (user) navigate("/shop");
  }, [navigate, user]);

  return (
    <AuthenticationContainer data-testid="authentication">
      <SignIn />
      <SignUp />
    </AuthenticationContainer>
  );
}
