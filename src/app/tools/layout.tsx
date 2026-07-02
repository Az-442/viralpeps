import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <HeaderNav />
      {children}
      <Footer />
    </div>
  );
}
