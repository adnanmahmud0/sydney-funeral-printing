// src/components/otp-input-separate.tsx
"use client"; // ← This MUST be a Client Component

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import CommonButton from "../button/CommonButton";

export function OtpInputSeparate({ className }: { className?: string }) {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", ""]);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return; // only allow single digit or empty

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 4) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 5);
    if (pasted.length > 0) {
      const newOtp = pasted.padEnd(5, "").slice(0, 5).split("");
      setOtp(newOtp);
      // Focus the last filled input or the next empty one
      const nextIndex = pasted.length < 5 ? pasted.length : 4;
      inputsRef.current[nextIndex]?.focus();
    }
  };

  const isComplete = otp.every((digit) => digit !== "");

  return (
    <form
      className={className}
      action="/api/auth/verify-otp"
      method="POST"
      onSubmit={(e) => {
        // Optionally prevent submission if incomplete
        if (!isComplete) e.preventDefault();
      }}
    >
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label className="text-primary text-center">Enter 5-Digit Code</Label>
          <p className="text-center text-sm text-muted-foreground">
            We sent a verification code to your email/phone
          </p>

          {/* Hidden input to send full OTP to backend */}
          <input type="hidden" name="otp" value={otp.join("")} />

          {/* 5 Separate Inputs */}
          <div className="flex justify-center gap-3 md:gap-4">
            {[0, 1, 2, 3, 4].map((index) => (
              <Input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={otp[index]}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                ref={(el) => {
                  inputsRef.current[index] = el;
                }}
                className="w-12 h-12 md:w-14 md:h-14 text-center text-xl font-semibold tracking-widest"
                autoFocus={index === 0}
              />
            ))}
          </div>
        </div>

        <CommonButton
          text={isComplete ? "Verify & Continue" : "Verify OTP"}
          href="/verify-code"
        />

        <p className="text-center text-sm text-primary">
          Didn&apos;t receive the code?{" "}
          <Link href="/resend-otp" className="font-medium hover:underline">
            Resend OTP
          </Link>
        </p>
      </div>
    </form>
  );
}
