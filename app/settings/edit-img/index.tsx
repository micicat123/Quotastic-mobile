import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Theme, customStyles } from '../../../config/theme.config';
import Header from '../../../components/common/header';
import { Formik } from 'formik';
import {
  editInfoSchema,
  editInfoValues,
} from '../../../assets/schemas/edit-user';
import { router } from 'expo-router';
import { Input } from '@rneui/base';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UpdateUserStore } from '../../../api/user/edit_user';
import { GetUserStore } from '../../../api/user/get_user';
import ImageSelect from '../../../components/common/imagePicker';

export default function ChangeInfoSettings() {
  const [file, setFile] = useState(null);

  useEffect(() => {
    getUsersPicture();
  }, []);

  const getUsersPicture = async () => {
    const getUserStore = new GetUserStore();
    const userId = await AsyncStorage.getItem('userId');
    const picture = await getUserStore.getUserPicture(Number(userId));
    setFile(picture);
  };

  const updateImage = async () => {};

  return (
    <>
      <Header />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          marginLeft: 30,
          marginRight: 30,
        }}
      >
        <Text
          style={[
            customStyles.h4,
            { color: Theme.lightColors.primary, marginTop: '10%' },
          ]}
        >
          Profile <Text style={customStyles.h4}>Settings</Text>
        </Text>
        <Text style={[customStyles.body, { marginTop: 16, marginBottom: 40 }]}>
          Change your profile photo
        </Text>

        <ImageSelect image={file} setImage={setFile} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <TouchableOpacity
            style={[customStyles.filledButton, { width: '40%' }]}
            onPress={() => {
              console.log('upload image');
            }}
          >
            <Text style={[customStyles.buttonText]}>Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[customStyles.filledButton, { width: '40%' }]}
            onPress={() => {
              setFile(null);
            }}
          >
            <Text style={[customStyles.buttonText]}>Remove</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}
