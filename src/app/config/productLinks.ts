/**
 * 
 *  PRODUCT LINKS CONFIGURATION
 *  Edit the URLs below to update the CTAs on every product section.
 *
 *  Each product supports up to three independent links:
 *    learnMore     "Learn More" button  (opens in new tab)
 *    requestDemo   "Request Demo" button (opens in new tab)
 *    documentation  "Docs" button (opens in new tab)
 *
 *  Leave a field as an empty string ("") or undefined to hide that button.
 * 
 */

export interface ProductLinks {
  learnMore?: string;
  requestDemo?: string;
  documentation?: string;
}

export interface ProductLinkConfig {
  id: string;
  label: string;
  links: ProductLinks;
}

export const PRODUCT_LINKS: ProductLinkConfig[] = [
  {
    id: 'enterprise-ai',
    label: 'Enterprise AI',
    links: {
      learnMore:   '',   // e.g. 'https://trinamix.com/enterprise-ai'
      requestDemo: '',   // e.g. 'https://trinamix.com/demo?product=enterprise-ai'
      documentation: '', // e.g. 'https://docs.trinamix.com/enterprise-ai'
    },
  },
  {
    id: 'ariv',
    label: 'Ariv',
    links: {
      learnMore:   '',   // e.g. 'https://trinamix.com/ariv'
      requestDemo: '',   // e.g. 'https://trinamix.com/demo?product=ariv'
      documentation: '', // e.g. 'https://docs.trinamix.com/ariv'
    },
  },
  {
    id: 'documantra',
    label: 'Documantra',
    links: {
      learnMore:   '',   // e.g. 'https://trinamix.com/documantra'
      requestDemo: '',   // e.g. 'https://trinamix.com/demo?product=documantra'
      documentation: '', // e.g. 'https://docs.trinamix.com/documantra'
    },
  },
  {
    id: 'pricesense',
    label: 'Price Sense AI',
    links: {
      learnMore:   '',   // e.g. 'https://trinamix.com/price-sense-ai'
      requestDemo: '',   // e.g. 'https://trinamix.com/demo?product=pricesense'
      documentation: '', // e.g. 'https://docs.trinamix.com/price-sense-ai'
    },
  },
  {
    id: 'sno',
    label: 'SNO',
    links: {
      learnMore:   '',   // e.g. 'https://trinamix.com/sno'
      requestDemo: '',   // e.g. 'https://trinamix.com/demo?product=sno'
      documentation: '', // e.g. 'https://docs.trinamix.com/sno'
    },
  },
  {
    id: 'control-tower',
    label: 'Control Tower',
    links: {
      learnMore:   '',   // e.g. 'https://trinamix.com/control-tower'
      requestDemo: '',   // e.g. 'https://trinamix.com/demo?product=control-tower'
      documentation: '', // e.g. 'https://docs.trinamix.com/control-tower'
    },
  },
];

/**
 * Helper: look up links for a given product ID.
 * Returns undefined if the product isn't found.
 */
export function getProductLinks(id: string): ProductLinks | undefined {
  return PRODUCT_LINKS.find((p) => p.id === id)?.links;
}
