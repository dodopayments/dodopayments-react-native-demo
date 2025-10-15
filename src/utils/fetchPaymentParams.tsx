import { BACKEND_API_URL } from '../config';

const fetchPaymentParams = async () => {
  try {
    const serverUrl = BACKEND_API_URL;
    if(!serverUrl || serverUrl.includes('YOUR_COMPUTER_IP')) {
        throw new Error('⚠️ Backend URL not configured!\n\nPlease update YOUR_COMPUTER_IP in src/config.ts\n\nSee SETUP.md for instructions.');
    }
        
    const response = await fetch(serverUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to create payment intent');
    }
    
    const key = await response.json();
    console.log('Payment params received:', key);
    return key;
  } catch (err) {
    console.error('Error fetching payment params:', err);
    throw err; // IMPORTANT: throw the error, don't swallow it!
  }
};
export default fetchPaymentParams;
