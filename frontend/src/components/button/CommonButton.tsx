import Link from "next/link";

type ButtonProps = {
  text: string;
  href: string;
  className?: string;
};

export default function CommonButton({ text, href, className }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`rounded-sm py-3 text-center text-white bg-linear-to-r/increasing from-[#1C75BC] to-[#447ED7] ${className}`}
    >
      {text}
    </Link>
  );
}
