import { PageLayout } from '@/components/layout/page-layout';

export const metadata = {
  title: 'Shipping Policy',
  description: 'Shipping rates, times, and policies for Lumina.',
};

export default function ShippingPolicyPage() {
  return (
    <PageLayout className="bg-neutral-50 text-neutral-900 min-h-screen pt-32 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-light mb-8 tracking-tight">Shipping Policy</h1>
        <p className="text-neutral-500 mb-12 font-light">Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="prose prose-neutral max-w-none prose-headings:font-light prose-headings:tracking-tight">
          <h2>Order Processing Time</h2>
          <p>
            All orders are processed within 1 to 2 business days (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped.
          </p>

          <h2>Domestic Shipping Rates and Estimates</h2>
          <p>We offer simple, flat-rate shipping options within the United States:</p>
          <ul>
            <li><strong>Standard Shipping (5-7 business days):</strong> Free on all orders over $50. Otherwise, $5.99.</li>
            <li><strong>Expedited Shipping (2-3 business days):</strong> $12.99</li>
            <li><strong>Overnight Shipping (1 business day):</strong> $24.99</li>
          </ul>

          <h2>International Shipping</h2>
          <p>
            We offer international shipping to most countries globally. Shipping charges for your order will be calculated and displayed at checkout. Please note that your order may be subject to import duties and taxes (including VAT), which are incurred once a shipment reaches your destination country. Lumina is not responsible for these charges if they are applied and are your responsibility as the customer.
          </p>

          <h2>How do I check the status of my order?</h2>
          <p>
            When your order has shipped, you will receive an email notification from us which will include a tracking number you can use to check its status. Please allow 48 hours for the tracking information to become available.
          </p>
          <p>
            If you haven't received your order within 10 days of receiving your shipping confirmation email, please contact us at hello@luminastudio.com with your name and order number, and we will look into it for you.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
