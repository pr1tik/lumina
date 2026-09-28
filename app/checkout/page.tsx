'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/cart/cart-context';
import { clearCart } from '@/components/cart/actions';
import { formatPrice } from '@/lib/shopify/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  ShieldCheck,
  Lock,
  ArrowLeft,
  CheckCircle2,
  Truck,
  CreditCard,
  Sparkles,
  ShoppingBag,
  HelpCircle,
  Tag,
  X,
} from 'lucide-react';
import { toast } from 'sonner';

interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
}

const SHIPPING_OPTIONS: ShippingOption[] = [
  {
    id: 'standard',
    name: 'Standard Insured Delivery',
    description: '3–5 business days • Tracked & Carbon Neutral',
    price: 0,
  },
  {
    id: 'express',
    name: 'Priority Air Express',
    description: '1–2 business days • Signature Required',
    price: 18,
  },
  {
    id: 'white-glove',
    name: 'White Glove Concierge Delivery',
    description: 'Scheduled delivery window & full room-of-choice placement',
    price: 45,
  },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { cart } = useCart();
  const [isSubmitting, startTransition] = useTransition();

  // Form states
  const [email, setEmail] = useState('');
  const [newsletter, setNewsletter] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('US');
  const [phone, setPhone] = useState('');

  // Shipping & Payment
  const [selectedShipping, setSelectedShipping] = useState<string>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'klarna' | 'paypal'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardName, setCardName] = useState('');
  const [sameBilling, setSameBilling] = useState(true);

  // Discount code
  const [discountInput, setDiscountInput] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{
    code: string;
    percent?: number;
    amount?: number;
    freeShipping?: boolean;
  } | null>(null);

  const subtotal = cart?.cost?.subtotalAmount?.amount
    ? parseFloat(cart.cost.subtotalAmount.amount)
    : 0;

  const currentShippingOption = SHIPPING_OPTIONS.find(o => o.id === selectedShipping) || SHIPPING_OPTIONS[0];
  const shippingFee = appliedDiscount?.freeShipping ? 0 : currentShippingOption.price;

  let discountAmount = 0;
  if (appliedDiscount) {
    if (appliedDiscount.percent) {
      discountAmount = (subtotal * appliedDiscount.percent) / 100;
    } else if (appliedDiscount.amount) {
      discountAmount = appliedDiscount.amount;
    }
  }

  const estimatedTax = (Math.max(0, subtotal - discountAmount) * 0.0825);
  const total = Math.max(0, subtotal - discountAmount + shippingFee + estimatedTax);

  const handleApplyDiscount = (e: React.FormEvent) => {
    e.preventDefault();
    const code = discountInput.trim().toUpperCase();

    if (!code) return;

    if (code === 'LUMINA10') {
      setAppliedDiscount({ code: 'LUMINA10', percent: 10 });
      setDiscountInput('');
      toast.success('Promo code LUMINA10 applied: 10% off entire order!');
    } else if (code === 'VIP20') {
      setAppliedDiscount({ code: 'VIP20', percent: 20 });
      setDiscountInput('');
      toast.success('VIP code VIP20 applied: 20% off entire order!');
    } else if (code === 'FREESHIP') {
      setAppliedDiscount({ code: 'FREESHIP', freeShipping: true });
      setDiscountInput('');
      toast.success('Promo code FREESHIP applied: Free shipping on this order!');
    } else {
      toast.error('Invalid promo code. Try LUMINA10 or VIP20');
    }
  };

  const handleRemoveDiscount = () => {
    setAppliedDiscount(null);
    toast.info('Discount removed');
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    if (!firstName || !lastName) {
      toast.error('Please provide your full name');
      return;
    }
    if (!address || !city || !zip) {
      toast.error('Please complete your shipping address');
      return;
    }

    if (paymentMethod === 'card') {
      if (!cardNumber || !cardExpiry || !cardCvc) {
        toast.error('Please fill in valid payment card details');
        return;
      }
    }

    startTransition(async () => {
      // Simulate secure order token generation and clearance
      const orderNumber = 'LUM-' + Math.floor(100000 + Math.random() * 900000);
      
      try {
        await clearCart();
      } catch (err) {
        // continue
      }

      toast.success('Order placed successfully!');
      
      const params = new URLSearchParams({
        orderId: orderNumber,
        email,
        name: `${firstName} ${lastName}`,
        total: total.toFixed(2),
        items: (cart?.totalQuantity || 1).toString(),
      });

      router.push(`/checkout/success?${params.toString()}`);
    });
  };

  // If cart is completely empty
  if (!cart || cart.lines.length === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-sides">
        <div className="max-w-md w-full bg-muted p-8 rounded-xl text-center border border-border flex flex-col items-center">
          <div className="size-16 rounded-full bg-popover flex items-center justify-center mb-6 text-foreground/70">
            <ShoppingBag className="size-8" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Your Cart is Empty</h1>
          <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
            You haven't added any Lumina design pieces to your bag yet. Explore our curated collections of architectural lighting, acoustics, and timepieces.
          </p>
          <Button asChild size="lg" className="w-full">
            <Link href="/shop">Explore Catalog</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Checkout Minimal Top Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-sides py-4 flex items-center justify-between">
          <Link href="/" className="font-black text-xl tracking-tighter uppercase hover:opacity-80 transition-opacity flex items-center gap-2">
            <span>LUMINA</span>
            <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground font-mono font-normal">STUDIO</span>
          </Link>

          <div className="flex items-center gap-6 text-sm">
            <Link href="/shop" className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors">
              <ArrowLeft className="size-4" />
              <span className="max-md:hidden">Return to Shop</span>
            </Link>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full border border-border">
              <Lock className="size-3.5 text-emerald-400" />
              <span>256-bit Encrypted Checkout</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-sides py-8 md:py-12">
        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Checkout Form */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            
            {/* Express Checkout */}
            <div className="p-6 rounded-xl bg-muted border border-border">
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3 text-center">
                Express Checkout
              </p>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    toast.info('Apple Pay session simulated. Fill contact details below.');
                  }}
                  className="h-11 rounded-lg bg-black text-white hover:opacity-90 flex items-center justify-center font-medium text-sm transition-all border border-neutral-800"
                >
                  <span className="font-semibold tracking-tight"> Pay</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    toast.info('Google Pay session simulated. Fill contact details below.');
                  }}
                  className="h-11 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 flex items-center justify-center font-medium text-sm transition-all border border-neutral-700"
                >
                  <span className="font-semibold tracking-tight">G Pay</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    toast.info('Shop Pay session simulated. Fill contact details below.');
                  }}
                  className="h-11 rounded-lg bg-[#5A31F4] text-white hover:opacity-90 flex items-center justify-center font-medium text-sm transition-all"
                >
                  <span className="font-semibold tracking-tight">Shop Pay</span>
                </button>
              </div>
              <div className="relative flex py-4 items-center">
                <div className="flex-grow border-t border-border"></div>
                <span className="flex-shrink mx-4 text-xs text-muted-foreground uppercase tracking-wider">or continue with details</span>
                <div className="flex-grow border-t border-border"></div>
              </div>
            </div>

            {/* Section 1: Contact Information */}
            <div className="p-6 rounded-xl bg-muted border border-border flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <span className="size-6 rounded-full bg-popover text-xs flex items-center justify-center font-mono">1</span>
                  Contact Information
                </h2>
                <span className="text-xs text-muted-foreground">Guest Checkout</span>
              </div>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="email" className="text-xs text-muted-foreground">Email address for receipt & tracking</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="alexander@domain.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="mt-1 bg-background"
                  />
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="newsletter"
                    checked={newsletter}
                    onChange={e => setNewsletter(e.target.checked)}
                    className="size-4 rounded accent-foreground cursor-pointer"
                  />
                  <Label htmlFor="newsletter" className="text-xs text-muted-foreground cursor-pointer">
                    Keep me updated on limited edition releases and studio dispatches
                  </Label>
                </div>
              </div>
            </div>

            {/* Section 2: Shipping Address */}
            <div className="p-6 rounded-xl bg-muted border border-border flex flex-col gap-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <span className="size-6 rounded-full bg-popover text-xs flex items-center justify-center font-mono">2</span>
                Shipping Address
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="country" className="text-xs text-muted-foreground">Country / Region</Label>
                  <select
                    id="country"
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    className="mt-1 w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="US">United States (USD $)</option>
                    <option value="CA">Canada (CAD $)</option>
                    <option value="GB">United Kingdom (GBP £)</option>
                    <option value="DE">Germany (EUR €)</option>
                    <option value="FR">France (EUR €)</option>
                    <option value="JP">Japan (JPY ¥)</option>
                    <option value="AU">Australia (AUD $)</option>
                    <option value="CH">Switzerland (CHF)</option>
                  </select>
                </div>

                <div className="hidden md:block"></div>

                <div>
                  <Label htmlFor="firstName" className="text-xs text-muted-foreground">First name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Alexander"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    required
                    className="mt-1 bg-background"
                  />
                </div>

                <div>
                  <Label htmlFor="lastName" className="text-xs text-muted-foreground">Last name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Vance"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    required
                    className="mt-1 bg-background"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="address" className="text-xs text-muted-foreground">Street address</Label>
                  <Input
                    id="address"
                    type="text"
                    placeholder="450 West 33rd Street"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    required
                    className="mt-1 bg-background"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="apartment" className="text-xs text-muted-foreground">Apartment, suite, unit (optional)</Label>
                  <Input
                    id="apartment"
                    type="text"
                    placeholder="Floor 14, Studio B"
                    value={apartment}
                    onChange={e => setApartment(e.target.value)}
                    className="mt-1 bg-background"
                  />
                </div>

                <div>
                  <Label htmlFor="city" className="text-xs text-muted-foreground">City</Label>
                  <Input
                    id="city"
                    type="text"
                    placeholder="New York"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    required
                    className="mt-1 bg-background"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="state" className="text-xs text-muted-foreground">State / Region</Label>
                    <Input
                      id="state"
                      type="text"
                      placeholder="NY"
                      value={state}
                      onChange={e => setState(e.target.value)}
                      required
                      className="mt-1 bg-background"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zip" className="text-xs text-muted-foreground">ZIP code</Label>
                    <Input
                      id="zip"
                      type="text"
                      placeholder="10001"
                      value={zip}
                      onChange={e => setZip(e.target.value)}
                      required
                      className="mt-1 bg-background"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="phone" className="text-xs text-muted-foreground">Phone number (for delivery notifications)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 234-5678"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="mt-1 bg-background"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Shipping Method */}
            <div className="p-6 rounded-xl bg-muted border border-border flex flex-col gap-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <span className="size-6 rounded-full bg-popover text-xs flex items-center justify-center font-mono">3</span>
                Shipping Method
              </h2>

              <div className="flex flex-col gap-3">
                {SHIPPING_OPTIONS.map(opt => {
                  const isSelected = selectedShipping === opt.id;
                  const priceLabel = appliedDiscount?.freeShipping || opt.price === 0
                    ? 'FREE'
                    : `$${opt.price}.00`;

                  return (
                    <label
                      key={opt.id}
                      onClick={() => setSelectedShipping(opt.id)}
                      className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-foreground bg-popover ring-1 ring-foreground'
                          : 'border-border bg-background/50 hover:bg-background'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="shipping_method"
                          checked={isSelected}
                          onChange={() => setSelectedShipping(opt.id)}
                          className="mt-1 size-4 accent-foreground cursor-pointer"
                        />
                        <div>
                          <p className="text-sm font-semibold">{opt.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{opt.description}</p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold">{priceLabel}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Section 4: Payment Details */}
            <div className="p-6 rounded-xl bg-muted border border-border flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <span className="size-6 rounded-full bg-popover text-xs flex items-center justify-center font-mono">4</span>
                  Payment Method
                </h2>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <ShieldCheck className="size-4 text-emerald-400" />
                  <span>Secure SSL</span>
                </div>
              </div>

              {/* Payment selector tabs */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`py-2.5 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-foreground bg-popover text-foreground'
                      : 'border-border bg-background/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <CreditCard className="size-3.5" />
                  Credit Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('klarna')}
                  className={`py-2.5 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    paymentMethod === 'klarna'
                      ? 'border-foreground bg-popover text-foreground'
                      : 'border-border bg-background/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Sparkles className="size-3.5" />
                  Klarna Pay in 4
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`py-2.5 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    paymentMethod === 'paypal'
                      ? 'border-foreground bg-popover text-foreground'
                      : 'border-border bg-background/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span>PayPal</span>
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-3 pt-2">
                  <div>
                    <Label htmlFor="cardName" className="text-xs text-muted-foreground">Name on card</Label>
                    <Input
                      id="cardName"
                      type="text"
                      placeholder="Alexander Vance"
                      value={cardName}
                      onChange={e => setCardName(e.target.value)}
                      className="mt-1 bg-background"
                    />
                  </div>

                  <div>
                    <Label htmlFor="cardNumber" className="text-xs text-muted-foreground">Card number</Label>
                    <Input
                      id="cardNumber"
                      type="text"
                      placeholder="4000 1234 5678 9010"
                      maxLength={19}
                      value={cardNumber}
                      onChange={e => {
                        const val = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
                        setCardNumber(val);
                      }}
                      className="mt-1 bg-background font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="cardExpiry" className="text-xs text-muted-foreground">Expiration (MM/YY)</Label>
                      <Input
                        id="cardExpiry"
                        type="text"
                        placeholder="12/28"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={e => {
                          let val = e.target.value.replace(/\D/g, '');
                          if (val.length >= 2) val = val.substring(0, 2) + '/' + val.substring(2, 4);
                          setCardExpiry(val);
                        }}
                        className="mt-1 bg-background font-mono"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardCvc" className="text-xs text-muted-foreground">CVC</Label>
                      <Input
                        id="cardCvc"
                        type="password"
                        placeholder="•••"
                        maxLength={4}
                        value={cardCvc}
                        onChange={e => setCardCvc(e.target.value.replace(/\D/g, ''))}
                        className="mt-1 bg-background font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'klarna' && (
                <div className="p-4 rounded-lg bg-background border border-border text-sm leading-relaxed">
                  <p className="font-semibold mb-1">Pay in 4 interest-free installments of ${(total / 4).toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">
                    Due every 2 weeks. Zero interest, zero hidden fees, and zero impact on your credit score.
                  </p>
                </div>
              )}

              {paymentMethod === 'paypal' && (
                <div className="p-4 rounded-lg bg-background border border-border text-sm leading-relaxed">
                  <p className="font-semibold mb-1">PayPal Express Checkout</p>
                  <p className="text-xs text-muted-foreground">
                    You will be redirected to PayPal's secure portal after clicking "Complete Order" to finalize payment.
                  </p>
                </div>
              )}

              {/* Billing address toggle */}
              <div className="pt-2 border-t border-border flex items-center gap-2">
                <input
                  type="checkbox"
                  id="sameBilling"
                  checked={sameBilling}
                  onChange={e => setSameBilling(e.target.checked)}
                  className="size-4 rounded accent-foreground cursor-pointer"
                />
                <Label htmlFor="sameBilling" className="text-xs text-muted-foreground cursor-pointer">
                  Billing address matches shipping address
                </Label>
              </div>
            </div>

            {/* Complete Order Button */}
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full h-14 text-base font-semibold tracking-wide flex items-center justify-between px-6"
            >
              <span>{isSubmitting ? 'Securing & Authorizing Order...' : 'Complete Order'}</span>
              <span>${total.toFixed(2)}</span>
            </Button>

            <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground py-2">
              <span className="flex items-center gap-1">
                <Truck className="size-3.5" />
                Carbon Neutral Delivery
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="size-3.5 text-emerald-400" />
                30-Day Studio Return Policy
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="size-3.5" />
                2-Year Lumina Warranty
              </span>
            </div>

          </div>

          {/* Right Column: Order Summary Sidebar */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-6 rounded-xl bg-muted border border-border sticky top-24">
              <h2 className="text-lg font-semibold mb-4 flex items-center justify-between">
                <span>Order Summary</span>
                <span className="text-sm font-normal text-muted-foreground font-mono">
                  {cart.totalQuantity} {cart.totalQuantity === 1 ? 'item' : 'items'}
                </span>
              </h2>

              {/* Items List */}
              <div className="divide-y divide-border/60 max-h-80 overflow-y-auto pr-1">
                {cart.lines.map(line => {
                  const img = line.merchandise.product.featuredImage?.url || '/placeholder.svg';
                  const variantTitle = line.merchandise.title !== 'Default Title' ? line.merchandise.title : null;

                  return (
                    <div key={line.id} className="py-3 flex items-center gap-4">
                      <div className="relative size-16 rounded-md overflow-hidden bg-popover flex-shrink-0 border border-border">
                        <Image
                          src={img}
                          alt={line.merchandise.product.title}
                          fill
                          className="object-cover"
                        />
                        <span className="absolute top-1 right-1 size-5 rounded-full bg-foreground text-background text-xs font-mono font-bold flex items-center justify-center">
                          {line.quantity}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{line.merchandise.product.title}</p>
                        {variantTitle && (
                          <p className="text-xs text-muted-foreground mt-0.5 font-mono">Option: {variantTitle}</p>
                        )}
                        <p className="text-xs text-muted-foreground mt-0.5">
                          ${parseFloat(line.cost.totalAmount.amount) / line.quantity} each
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-semibold">
                          ${parseFloat(line.cost.totalAmount.amount).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Promo Code Input */}
              <div className="pt-4 mt-2 border-t border-border">
                {appliedDiscount ? (
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-popover border border-emerald-500/30 text-xs">
                    <div className="flex items-center gap-2 text-emerald-400 font-mono font-medium">
                      <Tag className="size-3.5" />
                      <span>{appliedDiscount.code} APPLIED</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveDiscount}
                      className="text-muted-foreground hover:text-foreground p-1 transition-colors"
                      title="Remove code"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Promo code (e.g. LUMINA10)"
                      value={discountInput}
                      onChange={e => setDiscountInput(e.target.value)}
                      className="bg-background text-xs font-mono uppercase"
                    />
                    <Button
                      type="button"
                      onClick={handleApplyDiscount}
                      variant="outline"
                      size="sm"
                      className="text-xs px-3"
                    >
                      Apply
                    </Button>
                  </div>
                )}
                <p className="text-[11px] text-muted-foreground mt-1.5 pl-0.5">
                  Hint: Try code <span className="font-mono text-foreground font-semibold">LUMINA10</span> for 10% off or <span className="font-mono text-foreground font-semibold">FREESHIP</span>.
                </p>
              </div>

              {/* Price Calculation Breakdown */}
              <div className="space-y-2.5 pt-5 mt-4 border-t border-border text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="text-foreground">${subtotal.toFixed(2)}</span>
                </div>

                {appliedDiscount && (
                  <div className="flex justify-between text-emerald-400">
                    <span className="flex items-center gap-1">
                      Discount ({appliedDiscount.code})
                    </span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping ({currentShippingOption.name.split(' ')[0]})</span>
                  <span className="text-foreground">
                    {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between text-muted-foreground">
                  <span>Estimated Sales Tax (8.25%)</span>
                  <span className="text-foreground">${estimatedTax.toFixed(2)}</span>
                </div>

                <div className="pt-3 border-t border-border flex justify-between items-baseline">
                  <div>
                    <span className="text-base font-bold">Total</span>
                    <span className="text-xs text-muted-foreground block">Includes all applicable duties & taxes</span>
                  </div>
                  <span className="text-2xl font-bold tracking-tight">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Guarantee Box */}
              <div className="mt-6 p-4 rounded-lg bg-popover/60 border border-border/80 flex items-start gap-3 text-xs text-muted-foreground">
                <ShieldCheck className="size-5 text-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground mb-0.5">Lumina Authenticity & Service Guarantee</p>
                  <p className="leading-relaxed">
                    Every piece is rigorously inspected, packed in bespoke reinforced packaging, and covered by our lifetime support policy.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </form>
      </main>
    </div>
  );
}
