<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Groovinto

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/96e19ab1-2ce9-4057-8b86-e836b65d250c

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies: `npm install` and `npm install --prefix functions`
2. Put local Razorpay credentials in `.env` (never commit this file).
3. Run the frontend and payment server separately with `npm run dev` and `npm run server`.

## Deploy to Firebase

The Firebase project is selected in `.firebaserc`. Firebase Hosting serves `dist`, and `/api/**` requests are routed to the `api` Cloud Function.

1. Install the Firebase CLI and authenticate with `firebase login`.
2. Use a billing-enabled Firebase project; Cloud Functions requires the Blaze plan.
3. Set the rotated Razorpay API credentials and the Razorpay webhook secret directly into Firebase Secret Manager:
   `firebase functions:secrets:set RAZORPAY_KEY_ID --project groovinto-final`
   `firebase functions:secrets:set RAZORPAY_KEY_SECRET --project groovinto-final`
   `firebase functions:secrets:set RAZORPAY_WEBHOOK_SECRET --project groovinto-final`
4. Deploy with `firebase deploy --project groovinto-final`.

In the Razorpay Dashboard, configure a webhook at `https://groovinto.com/api/razorpay-webhook` after Firebase finishes activating the custom domain. Use the same webhook secret saved in Firebase and subscribe to `payment.captured`, `order.paid`, and `payment.failed`. The endpoint validates Razorpay's signature and logs verified event IDs; course access is not automatically provisioned by a webhook yet.

For the GoDaddy domain, Firebase Hosting's custom-domain page must show the domain as connected and its SSL certificate as active. The currently published A and TXT records resolve correctly, but HTTPS is not yet serving a certificate for `groovinto.com`. Use Firebase's **Check status/Retry** action and wait for certificate provisioning; add `www` separately in Firebase if you need that hostname too.

The `.env.production` file contains public Firebase web configuration only. Do not put Razorpay secrets in any `VITE_*` variable or frontend environment file.
