
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DateConverter from "./pages/DateConverter";
import NepaliCalendar from "./pages/NepaliCalendar";
import UnicodeConverter from "./pages/UnicodeConverter";
import LoadShedding from "./pages/LoadShedding";
import Dictionary from "./pages/Dictionary";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/date-converter" element={<DateConverter />} />
          <Route path="/nepali-calendar" element={<NepaliCalendar />} />
          <Route path="/unicode-converter" element={<UnicodeConverter />} />
          <Route path="/load-shedding" element={<LoadShedding />} />
          <Route path="/dictionary" element={<Dictionary />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
