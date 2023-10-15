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

export default function ChangeInfoSettings() {
  const [email, setEmail] = useState<string>(null);
  const [firstName, setFirstName] = useState<string>(null);
  const [lastName, setLastName] = useState<string>(null);

  useEffect(() => {
    fetchAsyncUserValues();
  }, []);

  const fetchAsyncUserValues = async () => {
    const fetchedEmail = await AsyncStorage.getItem('email');
    const fetchedFirstName = await AsyncStorage.getItem('firstName');
    const fetchedLastName = await AsyncStorage.getItem('lastName');
    setEmail(fetchedEmail);
    setFirstName(fetchedFirstName);
    setLastName(fetchedLastName);
  };

  if (!email || !firstName || !lastName) {
    return <></>;
  } else {
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
          <Text
            style={[customStyles.body, { marginTop: 16, marginBottom: 40 }]}
          >
            Change your profile settings
          </Text>

          <Formik
            initialValues={{
              email: email,
              firstName: firstName,
              lastName: lastName,
            }}
            validationSchema={editInfoSchema}
            onSubmit={async (values: editInfoValues) => {
              const updateUserStore = new UpdateUserStore();
              try {
                await updateUserStore.updateUserInfo(
                  values.firstName,
                  values.lastName,
                  values.email
                );
                await AsyncStorage.setItem('firstName', values.firstName);
                await AsyncStorage.setItem('lastName', values.lastName);
                await AsyncStorage.setItem('email', values.email);
                router.replace('/');
              } catch (error) {
                console.error(error);
              }
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              errors,
              touched,
            }) => (
              <View>
                <Input
                  label='Email'
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  keyboardType='email-address'
                  autoCapitalize='none'
                  style={customStyles.customInput}
                  inputContainerStyle={{
                    borderBottomWidth: 0,
                  }}
                  labelStyle={customStyles.customLabel}
                  errorMessage={
                    errors.email && touched.email ? errors.email : null
                  }
                />

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={{ width: '50%' }}>
                    <Input
                      label='First Name'
                      value={values.firstName}
                      onChangeText={handleChange('firstName')}
                      onBlur={handleBlur('firstName')}
                      autoCapitalize='words'
                      style={customStyles.customInput}
                      inputContainerStyle={{
                        borderBottomWidth: 0,
                      }}
                      labelStyle={customStyles.customLabel}
                      errorMessage={
                        errors.firstName && touched.firstName
                          ? errors.firstName
                          : null
                      }
                    />
                  </View>
                  <View style={{ width: '50%' }}>
                    <Input
                      label='Last Name'
                      value={values.lastName}
                      onChangeText={handleChange('lastName')}
                      onBlur={handleBlur('lastName')}
                      autoCapitalize='words'
                      style={customStyles.customInput}
                      inputContainerStyle={{
                        borderBottomWidth: 0,
                      }}
                      labelStyle={customStyles.customLabel}
                      errorMessage={
                        errors.lastName && touched.lastName
                          ? errors.lastName
                          : null
                      }
                    />
                  </View>
                </View>
                <TouchableOpacity
                  style={customStyles.filledButton}
                  onPress={() => {
                    handleSubmit();
                  }}
                >
                  <Text style={[customStyles.buttonText]}>Submit</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </ScrollView>
      </>
    );
  }
}

const infoSettingsStyles: any = {
  profileSettings: {
    backgroundColor: Theme.lightColors.primary,
  },
};
