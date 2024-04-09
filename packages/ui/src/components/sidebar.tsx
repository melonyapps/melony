import { useEffect, useState } from "react";
import { cn } from "../lib";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  logo?: any;
  nav: JSX.Element | React.ReactNode;
  account: JSX.Element | React.ReactNode;
}

export function Sidebar({
  className,
  isCollapsed,
  setIsCollapsed,
  title,
  logo,
  nav,
  account,
}: SidebarProps) {
  const [navOpened, setNavOpened] = useState(false);

  /* Make body not scrollable when navBar is opened */
  useEffect(() => {
    if (navOpened) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [navOpened]);

  return (
    <aside
      className={cn(
        `fixed left-0 right-0 top-0 z-50 w-full flex flex-col border-r transition-[width] md:bottom-0 md:right-auto md:h-svh ${isCollapsed ? "md:w-14" : "md:w-64"}`,
        className
      )}
    >
      <div
        onClick={() => setNavOpened(false)}
        className={`absolute inset-0 transition-[opacity] delay-100 duration-700 ${navOpened ? "h-svh opacity-50" : "h-0 opacity-0"} w-full bg-black md:hidden`}
      />

      <div className="flex gap-2 h-[52px] items-center justify-between px-4 border-b">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            {logo && <div>{logo}</div>}
            <div className="flex-1 truncate">{title}</div>
          </div>
        )}

        <Button
          onClick={() => setIsCollapsed((prev) => !prev)}
          size="icon"
          variant="ghost"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        aria-label="Toggle Navigation"
        aria-controls="sidebar-menu"
        aria-expanded={navOpened}
        onClick={() => setNavOpened((prev) => !prev)}
      >
        {navOpened ? "<" : ">"}
      </Button>

      <div className="flex-1 overflow-y-auto p-2">{nav}</div>

      <div className="p-2 border-t">{account}</div>
    </aside>
  );
}
