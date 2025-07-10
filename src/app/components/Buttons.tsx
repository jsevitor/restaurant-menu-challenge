import { Venue } from "@/types/types";

type Btn = {
  action?: () => void;
  venue: Venue;
  children: React.ReactNode;
};

export function GeneralButton({ action, venue, children }: Btn) {
  return (
    <button
      className="p-3 w-full rounded-full text-bg-primary cursor-pointer font-semibold shadow-md"
      style={{ backgroundColor: venue?.webSettings.primaryColour }}
      onClick={() => {
        if (action) {
          action();
        }
      }}
    >
      {children}
    </button>
  );
}
