'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { ArrowRight } from 'lucide-react';

export function FooterNewsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    setSubscribed(true);
    toast.success('Welcome to Lumina Private Access. Check your inbox for private collection previews.');
  };

  if (subscribed) {
    return (
      <div className="text-xs font-mono text-background/80 bg-background/10 py-2.5 px-3 rounded-md">
        ✓ Subscription confirmed. Exclusive invitations will arrive at {email}.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-sm">
      <p className="text-xs text-background/70 leading-relaxed">
        Join our private registry for limited edition allocations, studio dispatches, and exhibition invitations.
      </p>
      <div className="flex gap-1.5 mt-1">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="h-9 px-3 text-xs rounded bg-background/10 text-background placeholder:text-background/40 border border-background/20 focus:outline-none focus:border-background flex-1"
        />
        <button
          type="submit"
          className="h-9 px-3 text-xs font-semibold rounded bg-background text-foreground hover:bg-background/90 transition-all flex items-center gap-1 shrink-0"
        >
          <span>Join</span>
          <ArrowRight className="size-3" />
        </button>
      </div>
    </form>
  );
}
