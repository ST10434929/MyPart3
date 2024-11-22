import React, { useState, useEffect } from "react"; 
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Picker, Alert, Image } from "react-native";

export default function ChefAndHomeScreen() {
  const [category, setCategory] = useState("");
  const [dishName, setDishName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [view, setView] = useState("home");

  const initialMenuItems = [
    { category: "Starters", dishName: "Bruschetta", description: "Toasted bread with tomatoes and garlic", price: 5.99, imageUrl: "https://th.bing.com/th/id/R.e3e68342b530c8ce81eafc5366b5c024?rik=4zAzpgjgqBQNFA&pid=ImgRaw&r=0", id: "1" },
    { category: "Starters", dishName: "Garlic Bread", description: "Warm bread with garlic butter", price: 3.99, imageUrl: "https://bing.com/th?id=OSK.9b898441e31e150ce2c53a9c07412a03", id: "2" },
    { category: "Mains", dishName: "Grilled Chicken", description: "Succulent grilled chicken breast", price: 12.99, imageUrl: "https://bing.com/th?id=OSK.cb9a5547bd4b675a63d5ae8deb6e0aeb", id: "3" },
    { category: "Mains", dishName: "Pasta Carbonara", description: "Pasta with creamy bacon sauce", price: 9.99, imageUrl: "https://bing.com/th?id=OSK.c8741fc3c4a4ca1f95a86b748a7843ce", id: "4" },
    { category: "Desserts", dishName: "Tiramisu", description: "Classic Italian dessert with coffee", price: 6.99, imageUrl: "https://bing.com/th?id=OSK.6c7358df46d8d5ff0f6b3967701cacbe", id: "5" },
    { category: "Desserts", dishName: "Cheesecake", description: "Delicious New York-style cheesecake", price: 7.99, imageUrl: "https://th.bing.com/th/id/R.1dea35923bc72aae0bdb819862ab33fc?rik=BkdXgjs4Z7AXyg&pid=ImgRaw&r=0", id: "6" }
  ];

  useEffect(() => {
    setMenuItems(initialMenuItems);
  }, []);

  const handleAddItem = () => {
    if (dishName && description && price && category && imageUrl) {
      const newItem = {
        category,
        dishName,
        description,
        price: parseFloat(price),
        imageUrl,
        id: String(menuItems.length + 1),
      };
      setMenuItems([...menuItems, newItem]);
      setDishName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setImageUrl("");
    } else {
      alert("Please fill in all fields");
    }
  };

  const handleQuantityChange = (itemId, quantity) => {
    setQuantities({
      ...quantities,
      [itemId]: quantity,
    });
  };

  const handleSelectItem = (item) => {
    if (!selectedItems.find((selected) => selected.id === item.id)) {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    }
  };

  const handleRemoveItem = (item) => {
    setSelectedItems(selectedItems.filter((selected) => selected.id !== item.id));
  };

  const calculateTotal = () => {
    return selectedItems.reduce(
      (total, item) =>
        total + item.price * (quantities[item.id] || item.quantity || 1),
      0
    );
  };

  const handleCheckout = () => {
    Alert.alert("Thank You", "Your order has been placed!");
    setView("home");
    setSelectedItems([]);
    setQuantities({});
  };

  const renderMenuItem = ({ item }) => (
    <View style={styles.menuItem}>
      <Text style={styles.dishName}>{item.dishName}</Text>
      <Text>{item.description}</Text>
      <Text>Price: ${item.price.toFixed(2)}</Text>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <Text>Category: {item.category}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Quantity"
        keyboardType="numeric"
        value={quantities[item.id]?.toString() || ""}
        onChangeText={(text) => handleQuantityChange(item.id, text)}
      />
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => handleSelectItem(item)}
      >
        <Text style={styles.selectButtonText}>Add to Order</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {view === "home" && (
        <>
          <Text style={styles.title}>Add Menu Item</Text>
          <Picker
            selectedValue={category}
            style={styles.picker}
            onValueChange={(itemValue) => setCategory(itemValue)}
          >
            <Picker.Item label="Select Category" value="" />
            <Picker.Item label="Starters" value="Starters" />
            <Picker.Item label="Mains" value="Mains" />
            <Picker.Item label="Desserts" value="Desserts" />
          </Picker>
          <TextInput
            style={styles.input}
            placeholder="Dish Name"
            value={dishName}
            onChangeText={setDishName}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            style={styles.input}
            placeholder="Price"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Image URL"
            value={imageUrl}
            onChangeText={setImageUrl}
          />
          <TouchableOpacity style={styles.button} onPress={handleAddItem}>
            <Text style={styles.buttonText}>Add Item</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setView("menu")}>
            <Text style={styles.buttonText}>Go to Menu</Text>
          </TouchableOpacity>
        </>
      )}

      {view === "menu" && (
        <>
          <Text style={styles.title}>Menu</Text>
          <FlatList
            data={menuItems}
            keyExtractor={(item) => item.id}
            renderItem={renderMenuItem}
          />
          <TouchableOpacity style={styles.button} onPress={() => setView("checkout")}>
            <Text style={styles.buttonText}>Go to Checkout</Text>
          </TouchableOpacity>
        </>
      )}

      {view === "checkout" && (
        <>
          <Text style={styles.title}>Checkout</Text>
          <FlatList
            data={selectedItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.menuItem}>
                <Text style={styles.dishName}>{item.dishName}</Text>
                <Text>Price: ${item.price.toFixed(2)}</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Quantity"
                  keyboardType="numeric"
                  value={quantities[item.id]?.toString() || ""}
                  onChangeText={(text) => handleQuantityChange(item.id, text)}
                />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveItem(item)}
                >
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <Text style={styles.totalText}>Total: ${calculateTotal().toFixed(2)}</Text>
          <TouchableOpacity style={styles.button} onPress={handleCheckout}>
            <Text style={styles.buttonText}>Place Order</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F9E1F1" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { height: 40, borderColor: "#F06292", borderWidth: 1, marginBottom: 10 },
  button: { backgroundColor: "#F06292", padding: 10, borderRadius: 5, marginBottom: 10 },
  buttonText: { color: "#FFF", textAlign: "center" },
  menuItem: { padding: 10, borderRadius: 5, backgroundColor: "#FFF", marginBottom: 10 },
  selectButton: { backgroundColor: "#FF4081", padding: 10, marginTop: 5 },
  removeButton: { backgroundColor: "#D81B60", padding: 10, marginTop: 5 },
  totalText: { fontSize: 18, fontWeight: "bold", marginTop: 20, textAlign: "center" },
  image: { width: 100, height: 100, borderRadius: 5, marginTop: 10 },
});
