import { Formik } from 'formik';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { loginSchema, loginValues } from '../../assets/schemas/login';
import { LoginRegisterStore } from '../../api/user/login_register';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Input } from '@rneui/base';
import { Theme, customStyles } from '../../config/theme.config';
import Header from '../../components/common/header';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const [errorMessage, setErrorMessage] = useState(null);

  return (
    <>
      <Header back={true} />
      <ScrollView contentContainerStyle={{ flexGrow: 1, marginTop: '20%' }}>
        <View style={{ marginLeft: 30, marginRight: 30 }}>
          <Text style={[customStyles.h4, { textAlign: 'center' }]}>
            Welcome{' '}
            <Text style={{ color: Theme.lightColors.primary }}>back!</Text>
          </Text>

          <Text
            style={[
              customStyles.body,
              { textAlign: 'center', marginTop: 8, marginBottom: 40 },
            ]}
          >
            Thank you for coming back. Hope you have a good day and inspire
            others.
          </Text>
          <View>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={loginSchema}
              onSubmit={async (values: loginValues) => {
                const loginRegisterStore = new LoginRegisterStore();
                try {
                  const response = await loginRegisterStore.login(
                    values.email,
                    values.password
                  );
                  await AsyncStorage.setItem('jwt', response.data.jwt);
                  await AsyncStorage.setItem(
                    'firstName',
                    response.data.user.firstName
                  );
                  await AsyncStorage.setItem(
                    'lastName',
                    response.data.user.lastName
                  );
                  await AsyncStorage.setItem(
                    'userId',
                    response.data.user.userId
                  );
                  await AsyncStorage.setItem('email', values.email);
                  router.replace('/');
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
                        : !errors.password && errorMessage
                        ? errorMessage
                        : null
                    }
                  />

                  <TouchableOpacity
                    style={customStyles.filledButton}
                    onPress={() => {
                      handleSubmit();
                    }}
                  >
                    <Text style={[customStyles.buttonText]}>Login</Text>
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
              <Text style={customStyles.body}>Don't have an account</Text>
              <Link href={'/register'}>
                <Text
                  style={[
                    customStyles.body,
                    { color: Theme.lightColors.primary },
                  ]}
                >
                  Sign up
                </Text>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
