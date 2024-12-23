import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CreateProductPage from "./pages/CreateProductPage";
import styles from "./App.module.css";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/create-product" element={<CreateProductPage />} />
      </Routes>
    </Router>
  )
}

function Header() {
  return (
    <div className={styles.header}>
      <h1>Art Gallery</h1>
      <small>The Metropolitan Museum of Art Collection — European Paintings</small>
      <Link to="/create-product">Create My Own Art</Link>
    </div>
  )
}
