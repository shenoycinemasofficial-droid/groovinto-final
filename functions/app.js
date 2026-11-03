import crypto from 'node:crypto';
import express from 'express';
import Razorpay from 'razorpay';

const app = express();
const courseAmountsPaise = {
  'ai-video-production': 499900,
  'mind-training': 39900,
};

app.post('/api/razorpay-webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.get('x-razorpay-signature');

  if (!webhookSecret) {
    return res.status(503).json({ error: 'Razorpay webhook secret is not configured.' });
  }

  if (!Buffer.isBuffer(req.body) || !signature) {
    return res.status(400).json({ error: 'Missing webhook body or signature.' });
  }

  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(req.body)
    .digest('hex');
  if (expectedSignature.length !== signature.length) {
    return res.status(400).json({ error: 'Webhook signature verification failed.' });
  }

  const signaturesMatch = crypto.timingSafeEqual(
    Buffer.from(expectedSignature, 'utf8'),
    Buffer.from(signature, 'utf8')
  );
  if (!signaturesMatch) {
    return res.status(400).json({ error: 'Webhook signature verification failed.' });
  }

  let payload;
  try {
    payload = JSON.parse(req.body.toString('utf8'));
  } catch {
    return res.status(400).json({ error: 'Invalid webhook JSON.' });
  }

  console.info('Razorpay webhook received:', {
    event: payload.event,
    eventId: req.get('x-razorpay-event-id') || 'unknown',
  });
  return res.status(200).json({ received: true });
});

app.use(express.json());

app.post('/api/create-order', async (req, res) => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  const courseId = typeof req.body?.course_id === 'string' ? req.body.course_id : '';
  const isProjectDeposit = req.body?.product === 'project_deposit';
  const amount = isProjectDeposit ? 10000 : courseAmountsPaise[courseId];
  const currency = 'INR';
  const receipt = typeof req.body?.receipt === 'string' ? req.body.receipt : `groovinto_${Date.now()}`;
  const notes = req.body?.notes && typeof req.body.notes === 'object' ? req.body.notes : undefined;

  if (!keyId || !keySecret) {
    return res.status(503).json({ error: 'Razorpay credentials are not configured.' });
  }

  if (!Number.isInteger(amount) || amount < 100) {
    return res.status(400).json({ error: 'Select a valid course or project deposit.' });
  }

  try {
    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
    const order = await razorpay.orders.create({ amount, currency, receipt, notes });
    return res.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: keyId,
    });
  } catch (error) {
    const razorpayError = error?.error?.description || error?.message || 'Unable to create Razorpay order.';
    console.error('Razorpay create-order failed:', razorpayError);
    const status = error?.statusCode === 401 ? 401 : 500;
    const message = status === 401
      ? 'Razorpay rejected the server credentials. Check that the Key ID and Key Secret are a matching pair from the same account and mode.'
      : razorpayError;
    return res.status(status).json({ error: message });
  }
});

app.post('/api/verify-payment', (req, res) => {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body || {};

  if (!keySecret) {
    return res.status(503).json({ error: 'Razorpay credentials are not configured.' });
  }

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ error: 'Missing payment verification fields.' });
  }

  const expectedSignature = crypto
    .createHmac('sha256', keySecret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');
  if (expectedSignature.length !== razorpay_signature.length) {
    return res.status(400).json({ error: 'Payment signature verification failed.' });
  }
  const signaturesMatch = crypto.timingSafeEqual(
    Buffer.from(expectedSignature, 'utf8'),
    Buffer.from(razorpay_signature, 'utf8')
  );

  if (!signaturesMatch) {
    return res.status(400).json({ error: 'Payment signature verification failed.' });
  }

  return res.json({ success: true, message: 'Payment verified successfully.' });
});

export default app;