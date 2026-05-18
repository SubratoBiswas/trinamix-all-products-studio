import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';
import { Brain, ArrowRight } from 'lucide-react';
import { useProducts } from '../store/productStore';

export function PlatformHub() {
  const { products: PRODUCTS } = useProducts();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const scrollToProduct = (productId: string) => {
    setSelectedProduct(productId);
    setTimeout(() => {
      const element = document.getElementById(`product-${productId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  };

  return (
    <section
      id="hub"
      ref={containerRef}
      className="min-h-screen relative flex items-center justify-center py-20 px-6"
    >
      <motion.div style={{ opacity }} className="max-w-7xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            Your AI Ecosystem
          </h2>
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto hub-subtitle">
            Explore our suite of AI-powered products
          </p>
        </motion.div>

        {/* Product Network Visualization */}
        <div className="relative h-[600px] md:h-[700px] flex items-center justify-center">
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {PRODUCTS.map((product, i) =>
              PRODUCTS.slice(i + 1).map((targetProduct, j) => (
                <motion.line
                  key={`${i}-${j}`}
                  x1="50%"
                  y1="50%"
                  x2={`calc(50% + ${targetProduct.hubPosition.x}px)`}
                  y2={`calc(50% + ${targetProduct.hubPosition.y}px)`}
                  stroke={
                    hoveredProduct === product.id || hoveredProduct === targetProduct.id
                      ? 'rgba(59, 130, 246, 0.4)'
                      : 'rgba(255, 255, 255, 0.1)'
                  }
                  strokeWidth={hoveredProduct === product.id || hoveredProduct === targetProduct.id ? '2' : '1'}
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                  viewport={{ once: false }}
                  className="transition-all duration-300"
                />
              ))
            )}
          </svg>

          {/* Central Hub */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: false }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          >
            <div className="relative">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-2xl"
              />
              <div className="relative w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                <Brain className="w-12 h-12 text-white" />
              </div>
            </div>
          </motion.div>

          {/* Product Nodes */}
          {PRODUCTS.map((product, index) => {
            const Icon = product.icon;
            return (
              <motion.div
                key={product.id}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                viewport={{ once: false }}
                className="absolute"
                style={{
                  left: `calc(50% + ${product.hubPosition.x}px)`,
                  top: `calc(50% + ${product.hubPosition.y}px)`,
                  transform: 'translate(-50%, -50%)',
                }}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToProduct(product.id)}
                  className="relative group"
                >
                  {/* Glow Effect */}
                  <motion.div
                    animate={{
                      scale: hoveredProduct === product.id ? [1, 1.3, 1] : 1,
                      opacity: hoveredProduct === product.id ? [0.3, 0.6, 0.3] : 0.2,
                    }}
                    transition={{
                      duration: 2,
                      repeat: hoveredProduct === product.id ? Infinity : 0,
                    }}
                    className={`absolute inset-0 bg-gradient-to-r ${product.gradient} rounded-2xl blur-xl`}
                  />

                  {/* Node */}
                  <div className={`relative w-32 h-32 bg-gradient-to-br ${product.gradient} rounded-2xl flex flex-col items-center justify-center p-4 shadow-2xl border border-white/20`}>
                    <Icon className="w-10 h-10 text-white mb-2" />
                    <div className="text-xs text-white/90 font-medium text-center leading-tight">
                      {product.name}
                    </div>
                  </div>

                  {/* Tooltip */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: hoveredProduct === product.id ? 1 : 0,
                      y: hoveredProduct === product.id ? 0 : 10,
                    }}
                    className="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-xl border border-white/20 rounded-lg px-4 py-2 whitespace-nowrap pointer-events-none"
                  >
                    <div className="text-xs text-white/90">{product.tagline}</div>
                    <div className="flex items-center gap-1 text-xs text-blue-400 mt-1">
                      Explore <ArrowRight className="w-3 h-3" />
                    </div>
                  </motion.div>
                </motion.button>
              </motion.div>
            );
          })}

          {/* Pulsing Data Points */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400 rounded-full"
              style={{
                left: `${30 + Math.random() * 40}%`,
                top: `${30 + Math.random() * 40}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random(),
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: false }}
          className="text-center mt-12"
        >
          <p className="text-lg text-white/60">
            Click any product to explore its capabilities
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
