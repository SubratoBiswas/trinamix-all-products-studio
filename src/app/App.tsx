import { BrowserRouter, Routes, Route } from 'react-router';
import { ProductProvider, useProducts } from './store/productStore';
import { ThemeProvider } from './context/ThemeContext';
import Landing from './pages/Landing';
import AdminPage from './pages/AdminPage';

function SyncLoader() {
  const { syncing } = useProducts();
  if (!syncing) return null;
  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin" />
      <p className="text-white/40 text-sm">Syncing with database…</p>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ProductProvider>
        <BrowserRouter>
          <SyncLoader />
          <Routes>
            <Route path="/"      element={<Landing />}   />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </BrowserRouter>
      </ProductProvider>
    </ThemeProvider>
  );
}
