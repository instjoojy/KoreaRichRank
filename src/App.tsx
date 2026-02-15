import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import CalculatorPage from "./pages/calculator/CalculatorPage";
import BqTestPage from "./pages/bq-test/BqTestPage";
import RealHourlyWagePage from "./pages/real-hourly-wage/RealHourlyWagePage";
import FireCalculatorPage from "./pages/fire-calculator/FireCalculatorPage";
import TermsPage from "./pages/legal/TermsPage";
import PrivacyPage from "./pages/legal/PrivacyPage";
import AboutPage from "./pages/legal/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  useEffect(() => {
    const K = window.Kakao;
    if (K && !K.isInitialized()) {
      K.init("50b0bd620c60846528260bc97eb320d7");
    }
  }, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="calculator" element={<CalculatorPage />} />
        <Route path="bq-test" element={<BqTestPage />} />
        <Route path="real-hourly-wage" element={<RealHourlyWagePage />} />
        <Route path="fire-calculator" element={<FireCalculatorPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
