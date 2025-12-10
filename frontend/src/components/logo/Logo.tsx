import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <div>
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
    </div>
  );
}
