import type { Metadata } from "next";
import AppConfig from "@/components/config/app-config";
import TasksProvider from "@/context/TasksContext/tasks-context";
import ToastProvider from "@/context/ToastContext/toast.context";
import Toast from "@/components/toast";
import Nav from "@/components/nav";
import PaginationProvider from "@/context/PaginationContext/pagination-context";

export const metadata: Metadata = {
  title: "To-Do List (v2)",
  description: "Stay Organized, One Task at a Time!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppConfig>
          <ToastProvider>
            <TasksProvider>
              <PaginationProvider>
                <Nav />
                {children}
                <Toast />
              </PaginationProvider>
            </TasksProvider>
          </ToastProvider>
        </AppConfig>
      </body>
    </html>
  );
}
