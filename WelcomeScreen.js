import React from 'react'; 
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Animatable.Text animation="fadeInDown" style={styles.title}>
        Your favourite italian Resturaunt!!
      </Animatable.Text>
      <Animatable.Text animation="fadeInUp" style={styles.subtitle}>
        Experience the authentic flavors of Italy. From our handmade pasta to
        wood-fired pizzas, every dish is crafted with passion and tradition.
      </Animatable.Text>
      <Image
        source={{ uri: 'https://cdn4.tuscanynowandmore.com/storage/app/media/discover-italy/italian-restaurant-img.jpg' }} 
        style={styles.image}
      />
      <Animatable.View animation="bounceIn" delay={500}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ChefScreen')} // Navigating to ChefScreen
        >
          <Text style={styles.buttonText}>Explore Menu</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
    padding: 20,
  },
  title: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    color: '#e63946',
    textAlign: 'center',
    marginVertical: 20,
  },
  image: {
    width: '80%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#e63946', 
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
