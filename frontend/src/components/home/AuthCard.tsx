"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AuthCard() {
  const router = useRouter();

  return (
    <div className=" flex justify-end -mt-72 ">
      <Card className="w-full max-w-xs border-2 shadow-md ">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-semibold">Welcome Back</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Log in or create a new account to continue.
          </p>
        </CardHeader>

        <CardContent className="space-y-3 mb-2">
          <Button className="w-full" onClick={() => router.push("/login")}>
            Login
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push("/sign-up")}
          >
            Sign Up
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
