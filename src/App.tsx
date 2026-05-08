/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PageLayout } from "./components/layout/PageLayout";
import { CartProvider } from "./context/CartContext";
import { ScrollToTop } from "./components/ScrollToTop";

// View placeholders
import { HomePage } from "./pages/HomePage";
import { StorePage } from "./pages/StorePage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { CareersPage } from "./pages/CareersPage";
import { LabsPage } from "./pages/LabsPage";
import { SolutionsPage } from "./pages/SolutionsPage";
import { ProductDetailsPage } from "./pages/ProductDetailsPage";
import { ProjectDetailsPage } from "./pages/ProjectDetailsPage";
import { CheckoutPage } from "./pages/CheckoutPage";

export default function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <PageLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/store" element={<StorePage />} />
            <Route path="/store/:productId" element={<ProductDetailsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route
              path="/projects/:projectId"
              element={<ProjectDetailsPage />}
            />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/labs" element={<LabsPage />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </PageLayout>
      </Router>
    </CartProvider>
  );
}
