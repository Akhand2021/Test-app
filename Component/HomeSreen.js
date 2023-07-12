import React, { useState } from "react";
import { Text, View, TextInput, Button } from "react-native";

function HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Go to Profile"
          onPress={() => navigation.navigate('Profile')}
        />
      </View>
    );
  }
export default HomeScreen;
