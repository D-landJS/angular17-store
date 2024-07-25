// This is your test secret API key.
const stripe = Stripe("pk_test_51Pd03BRvjEtuWHBMm1qTerD1J3dXO9gU3pkxpUuwWF1DU3u2uo0RJ9lbxHT6AZmMYl7DE4md5X6guaWyvmBK1CyT00C2ZqlPbA");

initialize();

// Create a Checkout Session
async function initialize() {
  const fetchClientSecret = async () => {
    const response = await fetch("/create-checkout-session", {
      method: "POST",
    });
    const { clientSecret } = await response.json();
    return clientSecret;
  };

  const checkout = await stripe.initEmbeddedCheckout({
    fetchClientSecret,
  });

  // Mount Checkout
  checkout.mount('#checkout');
}