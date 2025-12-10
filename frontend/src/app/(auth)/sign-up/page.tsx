import { SignupForm } from "@/components/auth/signup-form";
import Logo from "@/components/logo/Logo";

export default function SignupPage() {
  return (
    <>
      <div className="text-center">
        {/* Top logo */}
        <Logo />
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Create an Account
        </h1>
        <p className="mt-2 text-primary">
          Sign up to order premium cards all year long.
        </p>
      </div>
      <SignupForm />
    </>
  );
}
