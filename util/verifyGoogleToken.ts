import { OAuth2Client } from 'google-auth-library';

export default async function verifyGoogleToken(token: string) {
    const client = new OAuth2Client(token);
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: '486025064243-8qhej8fb46i3fiird267mn1nrf43753g.apps.googleusercontent.com',  // Specify the CLIENT_ID of the app that accesses the backend
    });
    const payload = await ticket.getPayload();
    const userid = payload['sub'];
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
    return { ...payload, userid }
}