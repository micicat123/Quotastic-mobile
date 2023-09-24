import { Formik } from 'formik';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { loginSchema, loginValues } from '../../assets/schemas/login';
import { LoginRegisterStore } from '../../api/user/login_register';
import { router } from 'expo-router';
import { useState } from 'react';
import { Input } from '@rneui/base';
import { customStyles } from '../../config/theme.config';

export default function LoginScreen() {
  const [errorMessage, setErrorMessage] = useState(null);

  return (
    <View>
      <View>
        <View>
          <Text>Welcome</Text>
        </View>
        <Text>back!</Text>
        <Text>
          Thank you for coming back. Hope you have a good day and inspire
          others.
        </Text>
      </View>
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
              /*
              await loginRegisterStore.login(
                values.email,
                values.password,
              );*/

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
                  errors.email && touched.email
                    ? errors.email
                    : !errors.email && errorMessage
                    ? errorMessage
                    : null
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
                <Text style={[customStyles.buttonText, customStyles.body]}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
}
