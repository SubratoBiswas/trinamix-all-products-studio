import { useProducts } from '../store/productStore';
import { GenericProductSection } from './GenericProductSection';

export function ProductSections() {
  const { products } = useProducts();
  return (
    <div id="products" className="relative">
      {products.map((product) => (
        <GenericProductSection key={product.id} product={product} />
      ))}
    </div>
  );
}
