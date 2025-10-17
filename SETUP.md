# 🚀 Dodo Payments React Native Demo - Complete Setup Guide

This guide will walk you through setting up the Dodo Payments demo app from scratch.

---

## 📋 Prerequisites

Before starting, make sure you have:

- ✅ Node.js (v18 or higher)
- ✅ React Native development environment setup
- ✅ For iOS: Xcode and CocoaPods installed
- ✅ For Android: Android Studio and Android SDK installed
- ✅ **Dodo Payments account** - [Sign up here](https://app.dodopayments.com)

---

## 🎯 Step 1: Clone and Install Dependencies

```bash
# Clone the repository
git clone https://github.com/dodopayments/dodopayments-react-native-demo.git
cd dodopayments-react-native-demo

# Install frontend dependencies
npm install

# Install iOS dependencies (Mac only)
cd ios && pod install && cd ..

# Install backend server dependencies
cd server && npm install && cd ..
```

---

## 🔑 Step 2: Get Your Dodo Payments Credentials

### 2.1 Get API Keys

1. Go to [Dodo Payments Dashboard]
2. Copy your **Test Mode API Key**  (https://app.dodopayments.com/developer/api-keys)
3. Copy your **Test Mode Publishable Key** (starts with `pk_test_...`) (https://app.dodopayments.com/developer/others)

### 2.2 Create a Product

1. Go to [Dodo Payments Products](https://app.dodopayments.com/products)
2. Click **"Create Product"**
3. Fill in:
   - Product Name: e.g., "Test Product"
   - Price: e.g., $12.75 (or any amount you want)
   - Description: Optional
4. Click **Save**
5. Copy the **Product ID** (format: `pdt_xxxxxxxxxxxxx`)

---

## ⚙️ Step 3: Configure Backend Server

### 3.1 Create Environment File

```bash
cd server
cp .env.example .env
```

### 3.2 Edit `server/.env`

Open `server/.env` and replace the placeholder values:

```env
# Replace these with your actual values from Step 2
DODOPAYMENTS_TEST_API_KEY=key_test_abc123xyz...
DODO_PUBLISHABLE_KEY=pk_test_xyz789abc...
DODO_PRODUCT_ID=pdt_abc123xyz...
```

## 📱 Step 4: Configure Frontend App

### 4.1 Update Publishable Key (Optional)

If you want to use YOUR publishable key instead of the demo one:

1. Open `App.tsx`
2. Find line 19: `const PUBLISHABLE_KEY = '...'`
3. Replace with your publishable key from Step 2.1

### 4.2 Configure Network Settings

Open `src/config.ts` and configure based on your setup:

#### For Android Emulator:
```typescript
export const IS_ANDROID_EMULATOR = true; // Set to true
export const YOUR_COMPUTER_IP = '192.168.1.100'; // Not used for emulator
```

#### For Physical Android Device:
```typescript
export const IS_ANDROID_EMULATOR = false; // Set to false
export const YOUR_COMPUTER_IP = '192.168.1.100'; // Replace with YOUR IP
```

#### How to Find Your Computer's IP Address:

**Windows:**
```bash
ipconfig
```
Look for "IPv4 Address" under your active Wi-Fi/Ethernet adapter
Example: `192.168.1.100`

**Mac/Linux:**
```bash
ifconfig | grep "inet "
```
Look for an IP that's NOT `127.0.0.1`
Example: `192.168.1.100`

#### For iOS:
No changes needed! iOS Simulator always uses `localhost` automatically.

---

## 🏃 Step 5: Run the Application

### 5.1 Start Backend Server (First!)

Open a terminal and run:

```bash
cd server
npm start
```

You should see:
```
Server is running on port 5252
```

**Keep this terminal open!** The server must run while testing the app.

### 5.2 Start Metro Bundler (Second!)

Open a **new terminal** and run:

```bash
npm start
```

**Keep this terminal open too!**

### 5.3 Launch the App (Third!)

Open a **third terminal** and run:

#### For Android:
```bash
npx react-native run-android
```

#### For iOS:
```bash
npx react-native run-ios
```

The app will build and launch automatically.

---

## ✅ Step 6: Test the Payment Flow

1. **Launch the app** - You should see the payment screen with product items
2. **Click "Checkout" button** - The Dodo payment sheet should appear
3. **Use test card:**
   - Card Number: `4242 4242 4242 4242`
   - Expiry: Any future date (e.g., `12/25`)
   - CVC: Any 3 digits (e.g., `123`)
   - ZIP: Any valid ZIP (e.g., `12345`)
4. **Complete payment** - You should see a success animation! 🎉

---

## 🐛 Troubleshooting

### App Crashes Immediately

**Check 1:** Make sure you ran `npx react-native run-android` (not just Metro bundler reload)
- Native modules need a full rebuild, not just a hot reload

**Check 2:** Check if permissions are in `android/app/src/main/AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

### "Unable to connect to payment server"

**For Physical Device:**
1. Make sure your phone and computer are on the **same Wi-Fi network**
2. Update `YOUR_COMPUTER_IP` in `src/config.ts`
3. Set `IS_ANDROID_EMULATOR = false`
4. Reload the app (press `r` twice in Metro terminal)

**For Emulator:**
1. Set `IS_ANDROID_EMULATOR = true` in `src/config.ts`
2. Reload the app

**For Both:**
- Make sure backend server is running (`cd server && npm start`)
- Check if you can access `http://localhost:5252/create-payment-intent` in your browser

### Backend Returns Empty Response {}

1. Check `server/.env` has all three keys filled in:
   - `DODOPAYMENTS_TEST_API_KEY`
   - `DODO_PUBLISHABLE_KEY`
   - `DODO_PRODUCT_ID`
2. Verify the product ID exists in your Dodo dashboard
3. Restart the server: `Ctrl+C` then `npm start`

### Metro Bundler Port 8081 Already in Use

**Windows:**
```bash
netstat -ano | findstr :8081
taskkill /PID <process_id> /F
```

**Mac/Linux:**
```bash
lsof -ti:8081 | xargs kill -9
```

Then restart: `npm start`

### Payment Works in Test But Not Live Mode

1. Get your **live mode** keys from dashboard
2. Update `server/.env` with live keys:
   ```env
   DODOPAYMENTS_LIVE_API_KEY=your_live_key
   DODO_LIVE_PUBLISHABLE_KEY=your_live_pub_key
   ```
3. Update `src/PaymentScreen.tsx` line 95:
   ```typescript
   mode: 'live', // Change from 'test' to 'live'
   ```
4. Use **real credit cards** (test cards won't work in live mode)

---

## 📁 Project Structure

```
dodopayments-react-native-demo/
├── src/
│   ├── Components/          # Reusable UI components
│   │   ├── Banner.tsx
│   │   ├── Button.tsx
│   │   ├── OrderSummary.tsx
│   │   ├── PaymentButtons.tsx
│   │   ├── PaymentSuccessScreen.tsx
│   │   ├── PolicyInfo.tsx
│   │   └── ProductItem.tsx
│   ├── utils/               # Utility functions
│   │   └── fetchPaymentParams.tsx
│   ├── config.ts           # ⚙️ Network configuration (UPDATE THIS!)
│   └── PaymentScreen.tsx    # Main payment screen
├── server/                  # Backend server
│   ├── server.js           # Express server
│   ├── .env                # ⚙️ Your API keys (CREATE THIS!)
│   └── .env.example        # Template for .env
├── android/                # Android native code
├── ios/                    # iOS native code
├── App.tsx                 # ⚙️ Main app entry (Update publishable key)
└── package.json            # Dependencies
```

**📝 Files you need to configure:**
- `server/.env` - Your API keys and product ID
- `src/config.ts` - Network settings (IP address, emulator toggle)
- `App.tsx` - (Optional) Your publishable key

---

## 🎓 Next Steps

### For Development:
- Customize the UI components in `src/Components/`
- Modify product data in `src/PaymentScreen.tsx`
- Test different payment scenarios

### For Production:
1. Switch to **live mode** keys in `server/.env`
2. Update `mode: 'live'` in `PaymentScreen.tsx`
3. Test with real cards
4. Deploy backend server to a cloud service (Heroku, AWS, etc.)
5. Update frontend to use production server URL

---

## 📞 Need Help?

- 📚 [Dodo Payments Documentation](https://docs.dodopayments.com)
- 💬 [Support Email](mailto:support@dodopayments.com)
- 🐛 [GitHub Issues](https://github.com/dodopayments/dodopayments-react-native-demo/issues)

---

## 🔐 Security Reminders

✅ **DO:**
- Keep API keys in `.env` files
- Use test mode for development
- Validate payments on the backend

❌ **DON'T:**
- Commit API keys to git
- Hardcode sensitive keys in code
- Use test cards in live mode
- Skip backend validation

---

## ✨ Congratulations!

You've successfully set up the Dodo Payments React Native demo! 🎉

If you encounter any issues not covered here, please check the main [README.md](./README.md) or open an issue.

Happy coding! 🚀

