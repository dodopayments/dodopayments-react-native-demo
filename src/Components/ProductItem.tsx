import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';

interface ProductItemProps {
  id: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
  image: string | number; // Can be a URL string or require() result
}

const ProductItem: React.FC<ProductItemProps> = ({
  name,
  size,
  price,
  quantity,
  image,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = isDarkMode ? darkStyles : lightStyles;

  return (
    <View style={[defaultStyles.container, styles.container]}>
      <View style={defaultStyles.imageContainer}>
        <Image 
          source={typeof image === 'string' ? { uri: image } : image} 
          style={defaultStyles.image} 
        />
        <View style={[defaultStyles.quantityBadge, styles.quantityBadge]}>
          <Text style={[defaultStyles.quantityText, styles.quantityText]}>
            {quantity}
          </Text>
        </View>
      </View>
      
      <View style={defaultStyles.details}>
        <Text style={[defaultStyles.productName, styles.productName]} numberOfLines={2}>
          {name}
        </Text>
        <Text style={[defaultStyles.productSize, styles.productSize]}>
          Size: {size}
        </Text>
        <Text style={[defaultStyles.productPrice, styles.productPrice]}>
          ${price.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 16,
    alignItems: 'flex-start',
  },
  imageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  quantityBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 12,
    fontWeight: '600',
  },
  details: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    lineHeight: 20,
  },
  productSize: {
    fontSize: 14,
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '600',
  },
});

const lightStyles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
  quantityBadge: {
    backgroundColor: '#666666',
  },
  quantityText: {
    color: '#ffffff',
  },
  productName: {
    color: '#000000',
  },
  productSize: {
    color: '#666666',
  },
  productPrice: {
    color: '#000000',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
  },
  quantityBadge: {
    backgroundColor: '#666666',
  },
  quantityText: {
    color: '#ffffff',
  },
  productName: {
    color: '#ffffff',
  },
  productSize: {
    color: '#cccccc',
  },
  productPrice: {
    color: '#ffffff',
  },
});

export default ProductItem; 