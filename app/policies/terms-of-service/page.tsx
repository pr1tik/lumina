import { PageLayout } from '@/components/layout/page-layout';

export const metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service and Conditions for Lumina Studio.',
};

export default function TermsOfServicePage() {
  return (
    <PageLayout className="bg-neutral-50 text-neutral-900 min-h-screen pt-32 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-light mb-8 tracking-tight">Terms of Service</h1>
        <p className="text-neutral-500 mb-12 font-light">Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="prose prose-neutral max-w-none prose-headings:font-light prose-headings:tracking-tight prose-a:text-black">
          <h2>1. Introduction</h2>
          <p>
            Welcome to Lumina. These Terms of Service govern your use of our website and services. By accessing or using our website, you agree to be bound by these terms. If you disagree with any part of the terms, then you may not access our services.
          </p>

          <h2>2. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are and will remain the exclusive property of Lumina Studio and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Lumina.
          </p>

          <h2>3. User Accounts</h2>
          <p>
            When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
          </p>

          <h2>4. Products and Pricing</h2>
          <p>
            All products are subject to availability. We reserve the right to discontinue any product at any time. Prices for our products are subject to change without notice. We shall not be liable to you or to any third-party for any modification, price change, suspension, or discontinuance of the Service.
          </p>

          <h2>5. Limitation of Liability</h2>
          <p>
            In no event shall Lumina, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
