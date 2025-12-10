import { Clock, MapPin, Car } from "lucide-react";
import { Card } from "@/components/ui/card";

export function DeliveryInfoCard() {
  return (
    <Card className="bg-blue-50/60 border-blue-200 p-6 rounded-2xl shadow-sm my-15">
      <div className="space-y-5">
        {/* 48 Hour Turnaround */}
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <div className="font-bold text-primary">
            Guaranteed 48 hour turnaround
          </div>
        </div>

        {/* Pick-up from our shop */}
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <div className="text-primary">
            Pick-up from our shop in
            <br />
            <span className="font-semibold">Drummoyne NSW 2047</span>
          </div>
        </div>

        {/* Uber / Taxi pick-up */}
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
            <Car className="h-5 w-5 text-primary" />
          </div>
          <div className="font-medium text-primary">
            Or book your own Uber
            <br />
            <span className="text-primary">Taxi to pick-up</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
