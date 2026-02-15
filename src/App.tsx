import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import CalculatorPage from "./pages/calculator/CalculatorPage";
import BqTestPage from "./pages/bq-test/BqTestPage";
import RealHourlyWagePage from "./pages/real-hourly-wage/RealHourlyWagePage";
import FireCalculatorPage from "./pages/fire-calculator/FireCalculatorPage";
import CalculatorResultPage from "./pages/calculator/CalculatorResultPage";
import BqTestResultPage from "./pages/bq-test/BqTestResultPage";
import RealHourlyWageResultPage from "./pages/real-hourly-wage/RealHourlyWageResultPage";
import FireCalculatorResultPage from "./pages/fire-calculator/FireCalculatorResultPage";
import TermsPage from "./pages/legal/TermsPage";
import PrivacyPage from "./pages/legal/PrivacyPage";
import AboutPage from "./pages/legal/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  useEffect(() => {
    const K = window.Kakao;
    if (K && !K.isInitialized()) {
      K.init("4c4ae34490086192fffd1bb71754e2cc");
    }
  }, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="calculator" element={<CalculatorPage />} />
        <Route path="calculator/result" element={<CalculatorResultPage />} />
        <Route path="bq-test" element={<BqTestPage />} />
        <Route path="bq-test/result" element={<BqTestResultPage />} />
        <Route path="real-hourly-wage" element={<RealHourlyWagePage />} />
        <Route path="real-hourly-wage/result" element={<RealHourlyWageResultPage />} />
        <Route path="fire-calculator" element={<FireCalculatorPage />} />
        <Route path="fire-calculator/result" element={<FireCalculatorResultPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
