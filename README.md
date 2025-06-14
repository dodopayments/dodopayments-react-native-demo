# Dodo Payments React Native Demo App

A demonstration application showcasing the integration of Dodo Payments SDK in a React Native application for secure payment processing.

- 📦 Install our SDK from [NPM](https://www.npmjs.com/package/dodopayments-react-native-sdk)
- 📚 Read our [Integration Guide](https://docs.dodopayments.com/api-reference/react-native-integration) for detailed documentation.
- 🎥 Watch our demo video to see the Dodo Payments SDK in action.

<a href="https://youtube.com/shorts/uy4vikrKMPI" target="_blank">
    <img src="https://github.com/dodopayments/dodopayments-react-native-demo/blob/main/images/thumbnail.png?raw=true"
      alt="React Native SDK Demo" />
</a>

## Features

- 🔒 Secure payment processing with PCI compliance
- 💳 Support for multiple payment methods
- 📱 Native UI components for Android and iOS
- 🎨 Customizable payment interface
- 🌓 Light and dark mode support

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

1. Get your publishable key from the [Dodo Payments Dashboard](https://app.dodopayments.com/developer/others)

2. Create a `.env` file in the root directory:

```bash
DODO_PUBLISHABLE_KEY=your_publishable_key_here
```

## Running the App

### iOS

```bash
npm run ios
# or
yarn ios
```

### Android

```bash
npm run android
# or
yarn android
```

## Project Structure

```
dodopaymentdemoapp/
├── src/
│   ├── components/     # Reusable UI components
│   ├── screens/        # Screen components
│   ├── utils/          # Utility functions
│   └── types/          # TypeScript type definitions
├── ios/               # iOS native code
├── android/           # Android native code
└── server/            # Backend server code
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
