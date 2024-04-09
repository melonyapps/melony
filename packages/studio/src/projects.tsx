import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@melony/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@melony/ui/avatar";
import {
  BUCKET_NAME,
  BUCKET_REGION,
  ProjectContext,
  useGetProject,
  useGetProjects,
} from "@melony/core";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@melony/ui/skeleton";

type ProjectsPopoverProps = {
  selectedId?: string;
  onClickProject: (projectId: string) => void;
};

export function ProjectsPopover({
  selectedId,
  onClickProject,
}: ProjectsPopoverProps) {
  const navigate = useNavigate();
  const { data: projects = [], isLoading } = useGetProjects();

  if (isLoading) return <Skeleton className="h-4 w-full" />;

  const handleSelectProject = (projectId: string) => {
    onClickProject(projectId);
    navigate(`/p/${projectId}`);
  };

  return (
    <Select value={selectedId} onValueChange={handleSelectProject}>
      <SelectTrigger className="w-full border-0 shadow-none px-2">
        <SelectValue placeholder="- Select project" />
      </SelectTrigger>
      <SelectContent className="min-w-[240px]">
        <SelectGroup>
          <SelectLabel>Projects</SelectLabel>
          {projects.map((item) => (
            <SelectItem key={item._id} value={item._id}>
              <div className="flex gap-2.5 items-center">
                <span>
                  <Avatar className="h-6 w-6 rounded">
                    <AvatarImage
                      src={`https://${BUCKET_NAME}.${BUCKET_REGION}.cdn.digitaloceanspaces.com/${item?.logo}`}
                      alt={item.title}
                    />
                    <AvatarFallback className="text-xs">
                      {item.title.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </span>
                <span className="block truncate">{item.title}</span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export function ProjectProvider({
  children,
  projectId,
}: {
  children: React.ReactNode;
  projectId: string;
}) {
  const { data, isLoading } = useGetProject(projectId);

  const value = {
    projectId,
    project: data,
    isLoading,
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      </div>
    );

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
}
