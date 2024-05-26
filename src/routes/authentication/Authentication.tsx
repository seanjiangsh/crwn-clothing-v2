import { useEffect } from "react";

import { useSelector } from "../../redux/root-hook";
import { selectUser } from "../../redux/user/selectors";

import SignIn from "./sign-in/Sign-in";
import SignUp from "./sign-up/Sign-up";
import { AuthenticationContainer } from "./Authentication.styles";

export default function Authentication() {
  const user = useSelector(selectUser);

  // * redirect to shop if user is already signed in
  useEffect(() => {
    if (user) window.location.href = "/shop";
  }, [user]);

  return (
    <AuthenticationContainer data-testid="authentication">
      <SignIn />
      <SignUp />
    </AuthenticationContainer>
  );
}
