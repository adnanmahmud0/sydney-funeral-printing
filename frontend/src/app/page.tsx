import { Industries1 } from "@/components/home/page";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <div>
        <div className="flex justify-center mb-6">
          <Link href="/" className="flex items-center gap-3 font-semibold">
            <div>
              <Image width={173} height={145} src="/vercel.png" alt="Logo" />
            </div>
            <div>
              <span className="text-[#1C75BC] flex space-x-3 items-start gotham-black text-7xl font-normal">
                <div>Sydney</div>
                <div>Funeral</div>
                <div className="font-black">Printing</div>
              </span>
            </div>
          </Link>
        </div>
        <p className="text-center text-primary text-lg">
          <span className="font-bold">
            Welcome to Sydney Funeral Printing –
          </span>{" "}
          We are here to help you produce funeral stationery that reflects the
          life, love, and memories of someone special. Our templates enable you
          to quickly and easily design pieces that honour their legacy in a
          meaningful and personal way
        </p>
        <Industries1 />
      </div>
    </>
  );
}
