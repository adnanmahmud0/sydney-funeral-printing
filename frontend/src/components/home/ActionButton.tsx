import CommonButton from "@/components/button/CommonButton";

export function ActionButton() {
  return (
    <div className="pt-20">
      <div className="flex justify-center space-x-6">
        <CommonButton
          className="w-1/2"
          text={"NEED HELP WITH WHAT TO SAY?"}
          href={"/login"}
        />

        <CommonButton
          className="w-1/2"
          text={"VIEW PRICING - Get instant quote"}
          href={"/login"}
        />
      </div>
    </div>
  );
}
