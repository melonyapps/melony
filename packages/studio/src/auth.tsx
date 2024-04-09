import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@melony/ui/avatar";
import { useAuth, useCheckAuth, useGetIdentity } from "@melony/core";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@melony/ui/dropdown-menu";
import { Button } from "@melony/ui/button";
import { NavLink, useLocation } from "react-router-dom";
import { Cog } from "lucide-react";
import { cn } from "@melony/ui/lib";

type AccountPopoverProps = {
  hideName?: boolean;
  small?: boolean;
  onLogout?: () => void;
};

export function AccountPopover({
  hideName = false,
  small = false,
  onLogout,
}: AccountPopoverProps) {
  const { refetch } = useCheckAuth();
  const { data: identity } = useGetIdentity();
  const { logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout({
      onSuccess: () => {
        onLogout && onLogout();
        refetch();
      },
    });
  };

  return (
    <div className="flex flex-col gap-1">
      <NavLink
        to={`/settings`}
        className={cn(
          "inline-flex items-center whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 justify-start",
          {
            "text-accent-foreground bg-muted":
              location.pathname === "/settings",
          }
        )}
      >
        <span className="mr-2">{<Cog className="h-4 w-4" />}</span>
        <span className="block truncate">Project settings</span>
      </NavLink>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center cursor-pointer hover:bg-muted rounded-lg px-2 py-1">
            <Avatar className="h-7 w-7 mr-2">
              <AvatarImage
                src={identity?.avatar || ""}
                alt={identity?.displayName}
              />
              <AvatarFallback>
                {(identity?.displayName || "").slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="text-left">
              <div className="text-sm">{identity?.displayName}</div>
              <div className="text-xs opacity-60">{identity?.email}</div>
            </div>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={handleLogout}>
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
