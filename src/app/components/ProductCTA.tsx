import { motion } from 'motion/react';
import { ExternalLink, Calendar, BookOpen } from 'lucide-react';
import { useProducts } from '../store/productStore';

interface ProductCTAProps {
  productId: string;
  accentGradient: string; // e.g. 'from-blue-500 to-cyan-500'
}

export function ProductCTA({ productId, accentGradient }: ProductCTAProps) {
  const { products } = useProducts();
  const product = products.find((p) => p.id === productId);
  const links = product?.links ?? {};

  const hasLinks = links.learnMore || links.requestDemo || links.documentation;
  if (!hasLinks) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      viewport={{ once: false }}
      className="mt-12 flex flex-wrap gap-4 justify-center"
    >
      {links.learnMore && (
        <a
          href={links.learnMore}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${accentGradient} rounded-xl font-medium text-white hover:opacity-90 transition-opacity`}
        >
          <ExternalLink className="w-4 h-4" />
          Learn More
        </a>
      )}
      {links.requestDemo && (
        <a
          href={links.requestDemo}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-xl font-medium hover:bg-white/20 transition-colors"
        >
          <Calendar className="w-4 h-4" />
          Request Demo
        </a>
      )}
      {links.documentation && (
        <a
          href={links.documentation}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-xl font-medium hover:bg-white/20 transition-colors"
        >
          <BookOpen className="w-4 h-4" />
          Documentation
        </a>
      )}
    </motion.div>
  );
}
