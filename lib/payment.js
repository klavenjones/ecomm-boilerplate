import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY)

export async function initiateCheckout({ lineItems } = {}) {
  const stripe = await stripePromise
  await stripe.redirectToCheckout({
    mode: 'payment',
    lineItems,
    billing_address_collection: 'auto',
    shipping_address_collection: {
      allowed_countries: ['US', 'CA']
    },
    successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: window.location.origin
  })
}
