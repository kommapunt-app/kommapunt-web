import { Button } from "./Button";
import { PAGE_GUTTER_CLASS, PAGE_RIGHT_RAIL_CLASS } from "@/lib/page-layout";

export function FloatingHomeCta() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 pb-4 lg:pb-6">
      <div className={PAGE_GUTTER_CLASS}>
        <div className={PAGE_RIGHT_RAIL_CLASS}>
          <Button
            href="/bubbles"
            className="pointer-events-auto w-full max-w-sm px-6 py-3.5 text-sm !text-white shadow-[4px_4px_0_0_#FF1493] hover:shadow-[5px_5px_0_0_#FF1493] sm:px-7 sm:py-4 sm:text-base lg:w-auto lg:max-w-none"
          >
            Kies jou Bubbles
          </Button>
        </div>
      </div>
    </div>
  );
}
