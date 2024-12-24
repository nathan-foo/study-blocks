import { Webhook } from 'svix';
import { headers } from 'next/headers';

export async function POST(request) {
    const SIGNING_SECRET = process.env.SIGNING_SECRET;

    if (!SIGNING_SECRET) {
        throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local');
    }

    // Create new Svix instance with secret
    const webhook = new Webhook(SIGNING_SECRET);

    // Get headers
    const headerPayload = await headers();
    const svix_id = headerPayload.get('svix-id');
    const svix_timestamp = headerPayload.get('svix-timestamp');
    const svix_signature = headerPayload.get('svix-signature');

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error: Missing Svix headers', {
        status: 400,
        });
    }

    // Get body
    const payload = await request.json();
    const body = JSON.stringify(payload);

    let event;

    // Verify payload with headers
    try {
        event = webhook.verify(body, {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
        });
    } catch (err) {
        console.error('Error: Could not verify webhook:', err)
        return new Response('Error: Verification error', {
        status: 400,
        });
    }

    // Do something with payload
    const { id } = event.data;
    const eventType = event.type;
    console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
    console.log('Webhook payload:', body);

    if (event.type === 'user.created') {
        console.log('userId:', event.data.id);
    }

    return new Response('Webhook received', { status: 200 });
}