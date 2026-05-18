import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { FileText, Mail, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { ProductCTA } from '../ProductCTA';

export function Documantra() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const flowSteps = [
    { icon: Mail, label: 'Email Received', status: 'complete' },
    { icon: FileText, label: 'Document Extracted', status: 'complete' },
    { icon: CheckCircle, label: 'Data Validated', status: 'complete' },
    { icon: ArrowRight, label: 'ERP Integration', status: 'processing' },
  ];

  const extractedData = [
    { field: 'Invoice Number', value: 'INV-2024-8847', confidence: 99 },
    { field: 'Vendor', value: 'Acme Corp', confidence: 98 },
    { field: 'Amount', value: '$15,240.00', confidence: 99 },
    { field: 'Due Date', value: 'Apr 15, 2026', confidence: 97 },
    { field: 'PO Number', value: 'PO-45623', confidence: 95 },
  ];

  const stats = [
    { label: 'Processing Time', value: '2.3s', change: '-87%' },
    { label: 'Accuracy', value: '99.2%', change: '+12%' },
    { label: 'Auto-processed', value: '94%', change: '+31%' },
  ];

  return (
    <section
      id="product-documantra"
      ref={containerRef}
      className="min-h-screen relative flex items-center justify-center py-20 px-6 bg-gradient-to-b from-black via-orange-950/10 to-black"
    >
      <motion.div style={{ opacity }} className="max-w-7xl w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-4xl md:text-6xl font-bold">Documantra</h2>
              <p className="text-xl text-white/60 mt-2">
                Intelligent document processing & automation
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Processing Flow */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false }}
            className="space-y-6"
          >
            {/* Flow Visualization */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-6">
              <div className="text-lg font-medium mb-6">Document Processing Flow</div>
              
              <div className="relative">
                {flowSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={index}>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.15 }}
                        viewport={{ once: false }}
                        className="flex items-center gap-4 relative z-10"
                      >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          step.status === 'complete'
                            ? 'bg-green-500/20 border-2 border-green-500'
                            : 'bg-orange-500/20 border-2 border-orange-500'
                        }`}>
                          <Icon className={`w-6 h-6 ${
                            step.status === 'complete' ? 'text-green-400' : 'text-orange-400'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{step.label}</div>
                          <div className={`text-xs ${
                            step.status === 'complete' ? 'text-green-400' : 'text-orange-400'
                          }`}>
                            {step.status === 'complete' ? 'Complete' : 'Processing...'}
                          </div>
                        </div>
                      </motion.div>

                      {/* Connector Line */}
                      {index < flowSteps.length - 1 && (
                        <motion.div
                          initial={{ scaleY: 0 }}
                          whileInView={{ scaleY: 1 }}
                          transition={{ duration: 0.3, delay: 0.5 + index * 0.15 }}
                          viewport={{ once: false }}
                          className="w-0.5 h-8 bg-gradient-to-b from-green-500 to-orange-500 ml-6 my-2 origin-top"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Document Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: false }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden"
            >
              <div className="bg-white/5 border-b border-white/10 px-6 py-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-orange-400" />
                  <span className="text-sm font-medium">Incoming Document</span>
                </div>
              </div>
              <div className="p-6">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
                  <div className="text-xs text-white/60">Subject: Invoice from Acme Corp</div>
                  <div className="text-sm">Attachment: invoice_march_2026.pdf</div>
                  <div className="flex items-center gap-2 mt-3">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-xs text-green-400">Auto-processed & validated</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Extracted Data & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: false }}
            className="space-y-6"
          >
            {/* Extracted Data */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-6">
              <div className="text-lg font-medium mb-4">Extracted Data</div>
              <div className="space-y-3">
                {extractedData.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    viewport={{ once: false }}
                    className="bg-white/5 border border-white/10 rounded-xl p-3"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white/60">{item.field}</span>
                      <span className="text-xs text-green-400">{item.confidence}% confident</span>
                    </div>
                    <div className="font-medium">{item.value}</div>
                    <div className="mt-2 bg-white/5 rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.confidence}%` }}
                        transition={{ duration: 1, delay: 0.7 + index * 0.1 }}
                        viewport={{ once: false }}
                        className="h-full bg-gradient-to-r from-orange-500 to-red-500"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.1 + index * 0.1 }}
                  viewport={{ once: false }}
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-4 text-center"
                >
                  <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-400 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/60 mb-1">{stat.label}</div>
                  <div className="text-xs text-green-400">{stat.change}</div>
                </motion.div>
              ))}
            </div>

            {/* Exception Handling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              viewport={{ once: false }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-5 h-5 text-yellow-400" />
                <div className="text-lg font-medium">Smart Exception Handling</div>
              </div>
              <div className="space-y-2 text-sm text-white/70">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-1.5 flex-shrink-0" />
                  <div>Low confidence? Route to human review</div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-1.5 flex-shrink-0" />
                  <div>Data mismatch? Flag for validation</div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-1.5 flex-shrink-0" />
                  <div>New format? Learn and adapt</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <ProductCTA productId="documantra" accentGradient="from-orange-500 to-red-500" />
      </motion.div>
    </section>
  );
}
