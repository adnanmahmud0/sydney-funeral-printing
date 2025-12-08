import { LoginForm } from "@/components/auth/login-form";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <div className="text-center">
        {/* Top logo */}
        <div className="flex justify-center mb-6">
          <Link href="/" className="flex items-center gap-3 font-semibold">
            <div>
              <Image width={173} height={145} src="/vercel.png" alt="Logo" />
            </div>
            <div>
              <span className="text-[#1C75BC] flex flex-col items-start gotham-black text-4xl">
                <div>Sydney</div>
                <div>Funeral</div>
                <div className="font-black">Printing</div>
              </span>
            </div>
          </Link>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Welcome back
        </h1>
        <p className="mt-2 text-primary">
          Enter your credentials to access your account
        </p>
      </div>

      <LoginForm className="mt-8" />
    </>
  );
}
