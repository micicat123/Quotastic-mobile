import { Input } from '@rneui/base';
import { Formik } from 'formik';
import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Theme, customStyles } from '../../config/theme.config';
import { object, string } from 'yup';
import ImageSelect from '../../components/common/imagePicker';
import Header from '../../components/common/header';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [file, setFile] = useState(null);

  let registerSchema = object({
    firstName: string().required(),
    lastName: string().required(),
    email: string().email().required(),
    password: string().required(),
    passwordConfirm: string().required(),
  });

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
              onSubmit={(values) => console.log(values)}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View>
                  <ImageSelect image={file} setImage={setFile} />

                  <Input
                    label='Email'
                    onChangeText={(value) => setEmail(value)}
                    keyboardType='email-address'
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={values.email}
                    style={customStyles.customInput}
                    inputContainerStyle={{
                      borderBottomWidth: 0,
                    }}
                    labelStyle={customStyles.customLabel}
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
                        onChangeText={(value) => setFirstName(value)}
                        style={customStyles.customInput}
                        inputContainerStyle={{
                          borderBottomWidth: 0,
                        }}
                        labelStyle={customStyles.customLabel}
                      />
                    </View>
                    <View style={{ width: '50%' }}>
                      <Input
                        label='Last Name'
                        onChangeText={(value) => setLastName(value)}
                        style={customStyles.customInput}
                        inputContainerStyle={{
                          borderBottomWidth: 0,
                        }}
                        labelStyle={customStyles.customLabel}
                      />
                    </View>
                  </View>

                  <Input
                    label='Password'
                    onChangeText={(value) => setPassword(value)}
                    secureTextEntry={true}
                    style={customStyles.customInput}
                    inputContainerStyle={{
                      borderBottomWidth: 0,
                    }}
                    labelStyle={customStyles.customLabel}
                  />
                  <Input
                    label='Password Confirm'
                    onChangeText={(value) => setPasswordConfirm(value)}
                    secureTextEntry={true}
                    style={customStyles.customInput}
                    inputContainerStyle={{
                      borderBottomWidth: 0,
                    }}
                    labelStyle={customStyles.customLabel}
                  />
                  <TouchableOpacity style={customStyles.filledButton}>
                    <Text style={[customStyles.buttonText, customStyles.body]}>
                      Sign up
                    </Text>
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
