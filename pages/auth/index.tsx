import AuthLayout from "../../components/layout/auth-layout/auth-layout";
import SignIn from "./sign-in/sign-in";

type Props = {};
const Auth = (props: Props) => {
  return (
    <SignIn />
  );
};
Auth.Layout = AuthLayout;
export default Auth;
