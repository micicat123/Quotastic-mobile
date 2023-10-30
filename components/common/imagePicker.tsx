import React from 'react';
import { Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ImageSelect({ image, setImage }) {
  const pickImage = async () => {
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View>
      {image ? (
        <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={{ uri: image }}
              style={{
                width: 64,
                height: 64,
                resizeMode: 'cover',
                borderRadius: 50,
                marginBottom: 16,
              }}
              alt='Uploaded image'
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={require('../../assets/images/unset-profile.png')}
              style={{
                width: 64,
                height: 64,
                resizeMode: 'cover',
                marginBottom: 16,
              }}
              alt='Upload image'
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
