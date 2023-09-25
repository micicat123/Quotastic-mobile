import { Input } from '@rneui/base';
import { Formik } from 'formik';
import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Theme, customStyles } from '../../config/theme.config';
import ImageSelect from '../../components/common/imagePicker';
import Header from '../../components/common/header';
import { LoginRegisterStore } from '../../api/user/login_register';
import { router } from 'expo-router';
import { registerSchema, registerValues } from '../../assets/schemas/register';

export default function LoginScreen() {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const mimeType = {
    jpg: 'image/jpeg',
    peg: 'image/jpeg',
    png: 'image/png',
  };

  return (
    <>
      <Header />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ marginLeft: 30, marginRight: 30 }}>
          <View>
            <View>
              <Text style={[customStyles.h4, { textAlign: 'center' }]}>
                What is your{' '}
                <Text style={{ color: Theme.lightColors.primary }}>name</Text>
              </Text>
            </View>
            <Text
              style={[
                customStyles.body,
                { textAlign: 'center', marginTop: 8, marginBottom: 16 },
              ]}
            >
              Your name will appear on quotes and your public profle.
            </Text>
          </View>
          <View>
            <Formik
              initialValues={{
                email: '',
                firstName: '',
                lastName: '',
                password: '',
                passwordConfirm: '',
              }}
              validationSchema={registerSchema}
              onSubmit={async (values: registerValues) => {
                const loginRegisterStore = new LoginRegisterStore();
                try {
                  await loginRegisterStore.register(
                    values.email,
                    values.firstName,
                    values.lastName,
                    values.password,
                    values.passwordConfirm
                  );

                  //upload image
                  if (file) {
                    const formData: any = new FormData();
                    const fileExtension = file.slice(-3).toLowerCase();
                    const fileType =
                      mimeType[fileExtension] || 'application/octet-stream';
                    formData.append('image', {
                      uri: file,
                      type: fileType,
                      name: 'image.jpg',
                    });

                    await loginRegisterStore.postUserPicture(
                      formData,
                      values.email
                    );
                  }

                  router.replace('/login');
                } catch (error) {
                  if (error.response.data.message) {
                    setErrorMessage(error.response.data.message);
                  } else {
                    console.log(error);
                  }
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
                  <ImageSelect image={file} setImage={setFile} />

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
                      errors.email && touched.email
                        ? errors.email
                        : !errors.email && errorMessage
                        ? errorMessage
                        : null
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

                  <Input
                    label='Password'
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    secureTextEntry={true}
                    autoCapitalize='none'
                    style={customStyles.customInput}
                    inputContainerStyle={{
                      borderBottomWidth: 0,
                    }}
                    labelStyle={customStyles.customLabel}
                    errorMessage={
                      errors.password && touched.password
                        ? errors.password
                        : null
                    }
                  />
                  <Input
                    label='Password Confirm'
                    value={values.passwordConfirm}
                    onChangeText={handleChange('passwordConfirm')}
                    onBlur={handleBlur('passwordConfirm')}
                    secureTextEntry={true}
                    autoCapitalize='none'
                    style={customStyles.customInput}
                    inputContainerStyle={{
                      borderBottomWidth: 0,
                    }}
                    labelStyle={customStyles.customLabel}
                    errorMessage={
                      errors.passwordConfirm && touched.passwordConfirm
                        ? errors.passwordConfirm
                        : null
                    }
                  />
                  <TouchableOpacity
                    style={customStyles.filledButton}
                    onPress={() => {
                      handleSubmit();
                    }}
                  >
                    <Text style={[customStyles.buttonText]}>Sign up</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                marginTop: 16,
              }}
            >
              <Text style={customStyles.body}>Already have an account</Text>
              <Text
                style={[
                  customStyles.body,
                  { color: Theme.lightColors.primary },
                ]}
              >
                Sign in
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
