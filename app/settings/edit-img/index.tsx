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
import { LoginRegisterStore } from '../../../api/user/login_register';
import UserSettingsChanged from '../../../components/popups/userSettingsChanged';

export default function ChangeInfoSettings() {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [email, setEmail] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const mimeType = {
    jpg: 'image/jpeg',
    peg: 'image/jpeg',
    png: 'image/png',
  };

  useEffect(() => {
    getUsersPicture();
  }, []);

  const getUsersPicture = async () => {
    const getUserStore = new GetUserStore();
    const userId = await AsyncStorage.getItem('userId');
    const fetchedEmail = await AsyncStorage.getItem('email');
    setEmail(fetchedEmail);
    const picture = await getUserStore.getUserPicture(Number(userId));
    setFile(picture);
  };

  const updateImage = async () => {
    if (file) {
      try {
        setErrorMessage('');
        const formData: any = new FormData();
        const fileExtension = file.slice(-3).toLowerCase();
        const fileType = mimeType[fileExtension] || 'application/octet-stream';
        formData.append('image', {
          uri: file,
          type: fileType,
          name: 'image.jpg',
        });

        const loginRegisterStore = new LoginRegisterStore();
        await loginRegisterStore.postUserPicture(formData, email);
        setModalVisible(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      setErrorMessage('You need to upload an image file.');
    }
  };

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
        <Text style={[customStyles.body, { marginTop: 16, marginBottom: 60 }]}>
          Change your profile photo
        </Text>

        <ImageSelect image={file} setImage={setFile} />
        <View style={{ alignItems: 'center', marginBottom: 40 }}>
          {errorMessage ? (
            <Text
              style={[
                customStyles.body,
                { fontSize: 14, textAlign: 'center', color: 'red' },
              ]}
            >
              {errorMessage}
            </Text>
          ) : (
            <Text
              style={[customStyles.body, { fontSize: 12, textAlign: 'center' }]}
            >
              To update your profile image, simply click on the current image.
            </Text>
          )}
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <TouchableOpacity
            style={[customStyles.filledButton, { width: '40%' }]}
            onPress={() => {
              updateImage();
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
      <UserSettingsChanged
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
}
