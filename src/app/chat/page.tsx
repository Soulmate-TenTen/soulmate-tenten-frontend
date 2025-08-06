import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getTodayDate } from "@/lib/utils";

export default function ChatPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Header title={getTodayDate()} />
      <p className="text-sm text-gray-500">🚧공사중🚧</p>
      <Footer />
    </div>
  );
}