import {
  View,
  StyleSheet,
  Alert,
  Modal,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { router } from 'expo-router';
import { customStyles } from '../../config/theme.config';
import {
  manageQuoteSchema,
  manageQuoteValues,
} from '../../assets/schemas/manage-quote';
import { Input } from '@rneui/base';

const AddQuote = ({ modalVisible, setModalVisible }) => {
  useEffect(() => {}, []);

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.container}>
        <Text>
          Are you feeling <Text>inspired?</Text>
        </Text>
        <Text>You can post quotes. You can delete them on your profile.</Text>
      </View>

      <Formik
        initialValues={{
          quote: '',
        }}
        validationSchema={manageQuoteSchema}
        onSubmit={async (values: manageQuoteValues) => {
          /*
          const loginRegisterStore = new LoginRegisterStore();
          try {
            await loginRegisterStore.register(
              values.email,
              values.firstName,
              values.lastName,
              values.password,
              values.passwordConfirm
            );

            router.replace('/');
          } catch (error) {
            console.log(error);
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
              label='Quote'
              value={values.quote}
              onChangeText={handleChange('quote')}
              onBlur={handleBlur('quote')}
              autoCapitalize='words'
              style={customStyles.customInput}
              inputContainerStyle={{
                borderBottomWidth: 0,
              }}
              labelStyle={customStyles.customLabel}
              errorMessage={errors.quote && touched.quote ? errors.quote : null}
            />

            <View>
              <TouchableOpacity
                style={customStyles.filledButton}
                onPress={() => {
                  handleSubmit();
                }}
              >
                <Text style={[customStyles.buttonText]}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={customStyles.filledButton}
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Text style={[customStyles.buttonText]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    top: '25%',
    left: '25%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    width: 300,
    height: 458,
  },
});

export default AddQuote;
