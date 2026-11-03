import { onRequest } from 'firebase-functions/v2/https';
import app from './app.js';

export const api = onRequest({
  region: 'us-central1',
  secrets: ['RAZORPAY_KEY_ID', 'RAZORPAY_KEY_SECRET', 'RAZORPAY_WEBHOOK_SECRET'],
}, app);