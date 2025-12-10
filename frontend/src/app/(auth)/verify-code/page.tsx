
import { OtpInputSeparate } from "@/components/auth/otp-verification-form";
import Logo from "@/components/logo/Logo";

export default function ResetPassword() {
  return (
    <>
      <div className="text-center">
        {/* Top logo */}
        <Logo />
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Verify OTP
        </h1>
        <p className="mt-2 text-primary">
          Enter the 5-digit code sent to your email or phone
        </p>
      </div>

      <OtpInputSeparate className="mt-8" />
    </>
  );
}
