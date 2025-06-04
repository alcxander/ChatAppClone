"use client"; // components passed as children will not be use client by default meaning we can use server components in this route

import { Sidebar } from "./sidebar";
import { Toolbar } from "./toolbar";

interface WorkspaceIdLayoutProps {
  children: React.ReactNode;
}

const WorkspaceIdLayout = ({ children }: WorkspaceIdLayoutProps) => {
  return (
    <div className="h-full">
      <Toolbar />
      <div className="flex h-[calc(100vh-40px)]">
        <Sidebar />
        {children}</div>
    </div>
  );
};

export default WorkspaceIdLayout;
