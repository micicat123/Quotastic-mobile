import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Theme, customStyles } from '../../../config/theme.config';
import Header from '../../../components/common/header';
import { Formik } from 'formik';
import {
  editInfoSchema,
  editInfoValues,
  editPassSchema,
  editPassValues,
} from '../../../assets/schemas/edit-user';
import { router } from 'expo-router';
import { Input } from '@rneui/base';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UpdateUserStore } from '../../../api/user/edit_user';

export default function ChangePasswordSettings() {
  const [errorMessage, setErrorMessage] = useState(null);

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
          Change your profile settings
        </Text>

        <Formik
          initialValues={{
            oldPassword: '',
            newPassword: '',
            newPasswordConfirm: '',
          }}
          validationSchema={editPassSchema}
          onSubmit={async (values: editPassValues) => {
            const updateUserStore = new UpdateUserStore();
            try {
              await updateUserStore.updateUserPassword(
                values.oldPassword,
                values.newPassword,
                values.newPasswordConfirm
              );
              router.replace('/');
            } catch (error) {
              if (error.response.data.message) {
                setErrorMessage(error.response.data.message);
                console.log('didnt update password');
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
                label='Current password'
                value={values.oldPassword}
                onChangeText={handleChange('oldPassword')}
                onBlur={handleBlur('oldPassword')}
                secureTextEntry={true}
                autoCapitalize='none'
                style={customStyles.customInput}
                inputContainerStyle={{
                  borderBottomWidth: 0,
                }}
                labelStyle={customStyles.customLabel}
                errorMessage={
                  errors.oldPassword && touched.oldPassword
                    ? errors.oldPassword
                    : !errors.oldPassword && errorMessage
                    ? errorMessage
                    : null
                }
              />
              <Input
                label='New password'
                value={values.newPassword}
                onChangeText={handleChange('newPassword')}
                onBlur={handleBlur('newPassword')}
                secureTextEntry={true}
                autoCapitalize='none'
                style={customStyles.customInput}
                inputContainerStyle={{
                  borderBottomWidth: 0,
                }}
                labelStyle={customStyles.customLabel}
                errorMessage={
                  errors.newPassword && touched.newPassword
                    ? errors.newPassword
                    : null
                }
              />
              <Input
                label='Confirm new password'
                value={values.newPasswordConfirm}
                onChangeText={handleChange('newPasswordConfirm')}
                onBlur={handleBlur('newPasswordConfirm')}
                secureTextEntry={true}
                autoCapitalize='none'
                style={customStyles.customInput}
                inputContainerStyle={{
                  borderBottomWidth: 0,
                }}
                labelStyle={customStyles.customLabel}
                errorMessage={
                  errors.newPasswordConfirm && touched.newPasswordConfirm
                    ? errors.newPasswordConfirm
                    : null
                }
              />
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
