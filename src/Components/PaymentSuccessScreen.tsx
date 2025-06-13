import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';

interface PaymentSuccessScreenProps {
  onContinue: () => void;
  amount: number;
}

const { width, height } = Dimensions.get('window');

const PaymentSuccessScreen: React.FC<PaymentSuccessScreenProps> = ({
  onContinue,
  amount,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = isDarkMode ? darkStyles : lightStyles;
  
  // Animation values
  const slideAnim = useRef(new Animated.Value(height)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const checkmarkScale = useRef(new Animated.Value(0)).current;
  const checkmarkRotate = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  
  // Confetti animations
  const confetti = useRef(
    Array.from({ length: 15 }, () => ({
      translateY: new Animated.Value(-100),
      translateX: new Animated.Value(Math.random() * width),
      rotate: new Animated.Value(0),
      scale: new Animated.Value(Math.random() * 0.5 + 0.5),
    }))
  ).current;

  useEffect(() => {
    // Start animations sequence
    const sequence = Animated.sequence([
      // Slide up the screen
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      // Scale in the circle background
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      // Animate checkmark
      Animated.parallel([
        Animated.spring(checkmarkScale, {
          toValue: 1,
          tension: 100,
          friction: 3,
          useNativeDriver: true,
        }),
        Animated.timing(checkmarkRotate, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      // Fade in text
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]);

    // Start confetti animation
    const confettiAnimations = confetti.map((particle, index) => 
      Animated.parallel([
        Animated.timing(particle.translateY, {
          toValue: height + 100,
          duration: 3000 + Math.random() * 2000,
          delay: index * 100,
          useNativeDriver: true,
        }),
        Animated.timing(particle.rotate, {
          toValue: 1,
          duration: 3000 + Math.random() * 2000,
          delay: index * 100,
          useNativeDriver: true,
        }),
      ])
    );

    // Start pulse animation for button
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    sequence.start();
    Animated.parallel(confettiAnimations).start();
    
    // Start pulse after a delay
    setTimeout(() => {
      pulseAnimation.start();
    }, 1500);

    return () => {
      pulseAnimation.stop();
    };
  }, [slideAnim, scaleAnim, checkmarkScale, checkmarkRotate, fadeAnim, pulseAnim, confetti]);

  const checkmarkRotation = checkmarkRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['-45deg', '0deg'],
  });

  return (
    <Animated.View 
      style={[
        defaultStyles.container, 
        styles.container,
        { transform: [{ translateY: slideAnim }] }
      ]}
    >
      {/* Confetti */}
      {confetti.map((particle, index) => (
        <Animated.View
          key={index}
          style={[
            defaultStyles.confettiPiece,
            styles.confettiPiece,
            {
              transform: [
                { translateY: particle.translateY },
                { translateX: particle.translateX },
                { rotate: particle.rotate.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                })},
                { scale: particle.scale },
              ],
            },
          ]}
        />
      ))}

      {/* Success Circle */}
      <Animated.View 
        style={[
          defaultStyles.successCircle, 
          styles.successCircle,
          { transform: [{ scale: scaleAnim }] }
        ]}
      >
        {/* Checkmark */}
        <Animated.View
          style={[
            defaultStyles.checkmark,
            styles.checkmark,
            {
              transform: [
                { scale: checkmarkScale },
                { rotate: checkmarkRotation },
              ],
            },
          ]}
        >
          <Text style={[defaultStyles.checkmarkText, styles.checkmarkText]}>
            ✓
          </Text>
        </Animated.View>
      </Animated.View>

      {/* Success Content */}
      <Animated.View 
        style={[
          defaultStyles.content,
          { opacity: fadeAnim }
        ]}
      >
        <Text style={[defaultStyles.successTitle, styles.successTitle]}>
          Payment Successful!
        </Text>
        
        <Text style={[defaultStyles.successSubtitle, styles.successSubtitle]}>
          Your payment of ${amount.toFixed(2)} has been processed successfully
        </Text>

        <View style={defaultStyles.detailsContainer}>
          <Text style={[defaultStyles.detailText, styles.detailText]}>
            Transaction completed
          </Text>
          <Text style={[defaultStyles.detailText, styles.detailText]}>
            Receipt sent to your email
          </Text>
        </View>

        {/* Continue Button */}
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <TouchableOpacity
            style={[defaultStyles.continueButton, styles.continueButton]}
            onPress={onContinue}
          >
            <Text style={[defaultStyles.continueButtonText, styles.continueButtonText]}>
              Continue
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

const defaultStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    zIndex: 1000,
  },
  confettiPiece: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  successCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  checkmark: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    fontSize: 60,
    fontWeight: 'bold',
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  successTitle: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  successSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  detailsContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  detailText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 4,
  },
  continueButton: {
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

const lightStyles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  confettiPiece: {
    backgroundColor: '#C6FE1E',
  },
  successCircle: {
    backgroundColor: '#4CAF50',
    shadowColor: '#4CAF50',
  },
  checkmark: {},
  checkmarkText: {
    color: '#ffffff',
  },
  successTitle: {
    color: '#000000',
  },
  successSubtitle: {
    color: '#666666',
  },
  detailText: {
    color: '#888888',
  },
  continueButton: {
    backgroundColor: '#4CAF50',
    shadowColor: '#4CAF50',
  },
  continueButtonText: {
    color: '#ffffff',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(26, 26, 26, 0.95)',
  },
  confettiPiece: {
    backgroundColor: '#C6FE1E',
  },
  successCircle: {
    backgroundColor: '#4CAF50',
    shadowColor: '#4CAF50',
  },
  checkmark: {},
  checkmarkText: {
    color: '#ffffff',
  },
  successTitle: {
    color: '#ffffff',
  },
  successSubtitle: {
    color: '#cccccc',
  },
  detailText: {
    color: '#aaaaaa',
  },
  continueButton: {
    backgroundColor: '#4CAF50',
    shadowColor: '#4CAF50',
  },
  continueButtonText: {
    color: '#ffffff',
  },
});

export default PaymentSuccessScreen; 