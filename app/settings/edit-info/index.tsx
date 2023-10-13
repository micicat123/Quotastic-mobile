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

export default function ChangeInfoSettings() {
  return (
    <>
      <Header />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, marginLeft: 30, marginRight: 30 }}
      >
        <Text style={[customStyles.h4, { color: Theme.lightColors.primary }]}>
          Profile <Text style={customStyles.h4}>Settings</Text>
        </Text>
        <Text style={[customStyles.body, { marginTop: 16 }]}>
          Change your profile settings
        </Text>

        <Formik
          initialValues={{
            email: '',
            firstName: '',
            lastName: '',
          }}
          validationSchema={editInfoSchema}
          onSubmit={async (values: editInfoValues) => {
            /*const loginRegisterStore = new LoginRegisterStore();
            try {
              await loginRegisterStore.register(
                values.email,
                values.firstName,
                values.lastName,
                values.password,
                values.passwordConfirm
              );
              router.replace('/settings');
            } catch (error) {
               console.error(error);
            }*/
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

const infoSettingsStyles: any = {
  profileSettings: {
    backgroundColor: Theme.lightColors.primary,
  },
};
