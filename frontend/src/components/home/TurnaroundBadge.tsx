import { SparklesText } from "../ui/sparkles-text";

export function TurnaroundBadge() {
  return (
    <div className="flex justify-center mb-10 space-x-4 -mt-42">
      <div className="text-center gotham-bold">
        {/* 48 HOUR */}
        <SparklesText
          className="text-6xl gotham-black text-primary tracking-tight"
          sparklesCount={8}
        >
          48 HOUR
        </SparklesText>

        {/* Underline */}
        {/* <div className="w-full h-1 bg-[#3B82F6] -mt-2 mb-2" /> */}

        {/* Turnaround */}
        <SparklesText className="text-5xl font-light text-primary" sparklesCount={6}>
          Turnaround
        </SparklesText>
      </div>
    </div>
  );
}
