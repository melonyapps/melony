import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@melony/ui/avatar";
import { useAuth, useLogout } from "@melony/core/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@melony/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useSession } from "next-auth/react";

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
  const { data: session } = useSession();
  const { mutate: logout } = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: (res) => {
        navigate(res?.redirectUrl);
      },
    });
  };

  return (
    <div className="flex flex-col gap-1">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center cursor-pointer hover:bg-muted rounded-lg px-2 py-1">
            <Avatar className="h-7 w-7 mr-2">
              <AvatarImage
                src={session?.user?.image || ""}
                alt={session?.user?.name || ""}
              />
              <AvatarFallback className="text-xs">
                {(session?.user?.name || "").slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="text-left">
              <div className="text-sm">{session?.user?.name}</div>
              <div className="text-xs opacity-60">{session?.user?.email}</div>
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
