import { Alert } from "react-native";

export const showAlert=(data)=>{
    Alert.alert(
      '',
      data,
      
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') }
      ],
      { cancelable: false }
    );
  }