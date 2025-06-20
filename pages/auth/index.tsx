import SignInSignUp from "@/components/auth/auth-layout";
import AuthLayout from "../../components/layout/auth-layout/auth-layout";

type Props = {};
const Auth = (props: Props) => {
  return (
    <SignInSignUp />
  );
};
Auth.Layout = AuthLayout;
export default Auth;
