# Dodo Payments React Native Demo App

A demonstration application showcasing **two payment integration methods** with Dodo Payments in React Native:

1. **React Native SDK** - Native payment sheet with full customization
2. **Payment Link (InAppBrowser)** - Hosted checkout page in browser

- 📦 Install our SDK from [NPM](https://www.npmjs.com/package/dodopayments-react-native-sdk)
- 📚 Read our [Integration Guide](https://docs.dodopayments.com/api-reference/react-native-integration) for detailed documentation.
- 🎥 Watch our demo video to see the Dodo Payments SDK in action.

<a href="https://youtu.be/eicctkqK04Y" target="_blank">
    <img src="https://github.com/dodopayments/dodopayments-react-native-demo/blob/main/images/thumbnail.png?raw=true"
      alt="React Native SDK Demo" />
</a>

## Features

- 🔄 **Two Payment Flows**: Switch between SDK and Payment Link methods
- 🔒 Secure payment processing with PCI compliance
- 💳 Support for multiple payment methods
- 📱 Native UI components for Android and iOS
- 🎨 Customizable payment interface
- 🌓 Light and dark mode support
- 🔗 Deep linking for payment callbacks

## Prerequisites

- Node.js (v14 or higher)
- React Native development environment setup
- iOS: Xcode and CocoaPods
- Android: Android Studio and Android SDK
- Dodo Payments account and API keys

## Installation

1. Clone the repository:

```bash
git clone https://github.com/dodopayments/dodopayments-react-native-demo.git
cd dodopaymentdemoapp
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Install iOS dependencies:

```bash
cd ios && pod install && cd ..
```

## Configuration

### Backend Server Setup

1. Navigate to the server directory and create `.env` file:

```bash
cd server
cp .env.example .env
```

2. Get your credentials from [Dodo Payments Dashboard](https://app.dodopayments.com/developer):
   - API Key: https://app.dodopayments.com/developer/api-keys
   - Publishable Key: https://app.dodopayments.com/developer/others
   - Product ID: https://app.dodopayments.com/products

3. Edit `server/.env` with your credentials:

```env
DODOPAYMENTS_TEST_API_KEY=key_test_your_api_key_here
DODO_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
DODO_PRODUCT_ID=pdt_your_product_id_here
```

4. Install server dependencies and start:

```bash
npm install
npm start
```

Server will run on `http://localhost:5252`

### Frontend App Configuration

1. Update `App.tsx` with your publishable key (line 9):

```tsx
const PUBLISHABLE_KEY = 'pk_test_your_publishable_key_here';
```

2. Configure network settings in `src/config.ts` based on your device:

**For Android Emulator:**
```typescript
export const IS_ANDROID_EMULATOR = true;
```

**For Physical Device:**
```typescript
export const IS_ANDROID_EMULATOR = false;
export const YOUR_COMPUTER_IP = '192.168.1.100'; // Your computer's IP
```

## Running the App

**Important**: Start the backend server first!

1. **Start Backend Server** (in `server/` directory):
```bash
cd server
npm start
```

2. **Start Metro Bundler** (in root directory):
```bash
npm start
```

3. **Launch App**:

### iOS
```bash
npm run ios
```

### Android
```bash
npm run android
```

## Using the App

The app features a **bottom tab bar** with two payment methods:

### 1. SDK Payment (Tab 1)
- Native payment sheet
- Fully customizable UI
- Processes payment via React Native SDK
- Best for production apps

### 2. Payment Link (Tab 2)
- Opens hosted checkout in InAppBrowser
- Quick integration, no SDK setup needed
- Good for testing or fallback option
- Returns to app via deep linking

## Project Structure

```
dodopayments-react-native-demo/
├── src/
│   ├── Components/           # Reusable UI components
│   │   ├── PaymentContent.tsx    # Shared payment UI
│   │   ├── BottomTabBar.tsx      # Tab navigation
│   │   └── ...
│   ├── constants/            # Shared constants & data
│   │   └── mockData.ts           # Product data & calculations
│   ├── utils/                # Utility functions
│   ├── PaymentScreen.tsx     # SDK payment flow
│   ├── PaymentLinkScreen.tsx # InAppBrowser flow
│   └── config.ts             # Network configuration
├── server/                   # Backend server
│   ├── server.js             # Express API server
│   ├── .env.example          # Environment template
│   └── package.json
├── ios/                      # iOS native code
├── android/                  # Android native code
└── App.tsx                   # Main app entry
```

## Integration Guide

### 1. Setup Payment Provider

Wrap your app with the `DodoPaymentProvider`:

```tsx
import {DodoPaymentProvider} from 'dodopayments-sdk-react-native';

function App() {
  return (
    <DodoPaymentProvider publishableKey={process.env.DODO_PUBLISHABLE_KEY}>
      <PaymentScreen />
    </DodoPaymentProvider>
  );
}
```

### 2. Implement Payment Screen

```tsx
import { useCheckout } from 'dodopayments-sdk-react-native';

const PaymentScreen = () => {
  const { initPaymentSession, presentPaymentSheet } = useCheckout();

  const handlePayment = async () => {
    try {
      const { clientSecret } = await fetchPaymentParams();
      const params = await initPaymentSession({ clientSecret });
      const result = await presentPaymentSheet(params);

      if (result?.status === 'succeeded') {
        // Handle successful payment
      }
    } catch (error) {
      // Handle error
    }
  };

  return (
    // Your payment UI
  );
};
```

## Customization

### Appearance Configuration

```tsx
const appearance = {
  colors: {
    light: {
      primary: '#F8F8F2',
      background: '#ffffff',
      // ... other colors
    },
    dark: {
      primary: '#00ff0099',
      background: '#ff0000',
      // ... other colors
    },
  },
  shapes: {
    borderRadius: 10,
    borderWidth: 1,
  },
};
```

## Testing

Use test card numbers in development:

- Test Card Number: 4242 4242 4242 4242
- Expiry: Any future date
- CVC: Any 3 digits

## Error Handling

```tsx
const handlePaymentResult = paymentSheetResponse => {
  switch (paymentSheetResponse?.status) {
    case 'cancelled':
      // Handle cancellation
      break;
    case 'succeeded':
      // Handle success
      break;
    case 'failed':
      // Handle failure
      break;
  }
};
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

For support, email support@dodopayments.com or visit our [documentation](https://docs.dodopayments.com).
