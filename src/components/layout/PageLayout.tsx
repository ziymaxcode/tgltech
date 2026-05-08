import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FloatingSocialLinks } from "../ui/FloatingSocialLinks";

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col pt-16 relative">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <FloatingSocialLinks />
    </div>
  );
}
