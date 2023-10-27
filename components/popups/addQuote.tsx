import {
  View,
  StyleSheet,
  Alert,
  Modal,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { router } from 'expo-router';
import { Theme, customStyles } from '../../config/theme.config';
import {
  manageQuoteSchema,
  manageQuoteValues,
} from '../../assets/schemas/manage-quote';
import { Input } from '@rneui/base';
import { ManageQuoteStore } from '../../api/quotes/manage_quote';

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
      <KeyboardAvoidingView behavior='padding'>
        <View style={styles.container}>
          <Text style={customStyles.h4}>
            Are you feeling{' '}
            <Text style={{ color: Theme.lightColors.primary }}>inspired?</Text>
          </Text>
          <Text
            style={[customStyles.body, { paddingTop: 16, paddingBottom: 32 }]}
          >
            You can post quotes. You can delete them on your profile.
          </Text>
        </View>

        <View
          style={{
            paddingLeft: 32,
            paddingRight: 38,
            width: '80%',
            top: '-20%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <Formik
            initialValues={{
              quote: '',
            }}
            validationSchema={manageQuoteSchema}
            onSubmit={async (values: manageQuoteValues) => {
              const manageQuoteStore = new ManageQuoteStore();
              try {
                await manageQuoteStore.addQUote(values.quote);
                router.replace('/');
              } catch (error) {
                console.log(error);
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
              <View style={{ zIndex: 1 }}>
                <Input
                  multiline={true}
                  value={values.quote}
                  onChangeText={handleChange('quote')}
                  onBlur={handleBlur('quote')}
                  autoCapitalize='words'
                  style={[customStyles.customInput, { padding: 10 }]}
                  inputContainerStyle={{
                    borderBottomWidth: 0,
                  }}
                  numberOfLines={6}
                  errorMessage={
                    errors.quote && touched.quote ? errors.quote : null
                  }
                  textAlignVertical='top'
                  maxLength={119}
                />

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginLeft: 20,
                  }}
                >
                  <TouchableOpacity
                    style={[customStyles.filledButton, { marginRight: 50 }]}
                    onPress={() => {
                      handleSubmit();
                    }}
                  >
                    <Text style={[customStyles.buttonText, { width: 100 }]}>
                      Submitt
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false);
                    }}
                  >
                    <Text style={{ width: 100 }}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </KeyboardAvoidingView>
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
    padding: 32,
    borderRadius: 16,
    elevation: 4,
    zIndex: 1,
  },
});

export default AddQuote;
