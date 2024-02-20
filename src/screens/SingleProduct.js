import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, removeFromCart} from '../redux/features/CartSlice';
import MyBackButton from '../../components/MyBackButton';
import {useNavigation, useRoute} from '@react-navigation/native';  
import MyButton from '../../components/MyButton';


const SingleProduct = () => {
  const [currentItem, setcurrentItem] = useState({});
  const {
    params: {Product},
  } = useRoute();
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const {cartData, totalAmount} = useSelector(state => state.cartItems);
  console.log('🚀 ~ cartData , totalAmount:', cartData, totalAmount);

  useEffect(() => {
    const itemChecking = () => {
      const itemAvailable = cartData.find(value => value.id === Product.id);
      if (itemAvailable) {
        setcurrentItem(itemAvailable);
      } else {
        setcurrentItem({});
      }
    };
    itemChecking();
  }, [cartData]);
  return (
    <View style={styles.container}>
      <MyBackButton />
      {/* Card */}
      <View style={styles.cardBox}>
        <Image source={{uri: Product.thumbnail}} style={styles.img} />
        <View style={styles.textBox}>
          <Text style={styles.title}>{Product.title}</Text>
          <Text style={styles.price}>${Product.price}</Text>
        </View>
        {/* body */}
        <View style={styles.body}>
          <Text style={styles.label}>
            Category: <Text style={styles.value}>{Product.category}</Text>
          </Text>
          <Text style={styles.label}>
            Brand: <Text style={styles.value}>{Product.brand}</Text>
          </Text>
          <Text style={styles.label}>
            Description: <Text style={styles.value}>{Product.description}</Text>
          </Text>
          <Text style={styles.label}>
            Rating: <Text style={styles.value}>{Product.rating}⭐️</Text>
          </Text>
          <Text style={styles.label}>
            Stock: <Text style={styles.value}>{Product.stock}</Text>
          </Text>
        </View>
        <View style={styles.footer}>
          {currentItem.quantity > 0 ? (
            <View style={styles.twoBtn}>
              <Pressable
                style={styles.btnBox}
                onPress={() => dispatch(removeFromCart(Product.id))}>
                <Text style={styles.btn}>-</Text>
              </Pressable>
              <Pressable>
                <Text style={styles.btn}>{currentItem.quantity}</Text>
              </Pressable>
              <Pressable
                style={styles.btnBox}
                onPress={() => dispatch(addToCart(Product))}>
                <Text style={styles.btn}>+</Text>
              </Pressable>
            </View>
          ) : (
            <MyButton
              onPress={() => dispatch(addToCart(Product))}
              title="Add to Cart"
            />
          )}
          <MyButton onPress={() => navigate('Cart')} title="View Cart" />
        </View>
      </View>
    </View>
  );
};

export default SingleProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '5%',
  },
  img: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
  },
  cardBox: {
    marginBottom: 30,
  },
  textBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  body: {
    marginTop: 30,
    gap: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  value: {
    fontSize: 16,
    fontWeight: '400',
  },
  footer: {
    marginTop: 50,
    gap: 10,
  },
  twoBtn: {
    columnGap: 20,
    flexDirection: 'row',
    marginVertical: 22,
    alignItems: 'center',
    alignSelf: 'center',
  },
  btnBox: {
    width: 40,
    height: 40,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  btn: {
    fontSize: 30,
  },
});
