import {
  View,
  StyleSheet,
  Alert,
  Modal,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { useState } from 'react';
import { Formik } from 'formik';
import { Theme, customStyles } from '../../config/theme.config';
import {
  manageQuoteSchema,
  manageQuoteValues,
} from '../../assets/schemas/manage-quote';
import { Input } from '@rneui/base';
import { ManageQuoteStore } from '../../api/quotes/manage_quote';
import { EditQuoteProps } from '../../common/interface';
import EditQuoteConfirmation from './quoteConfirmation';

const EditQuote: React.FC<EditQuoteProps> = ({
  modalVisible,
  setModalVisible,
  quoteId,
  initialQuote,
}) => {
  const [confirmPopupVisible, setConfirmPopupVisible] = useState(false);

  return (
    <>
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
              Edit your{' '}
              <Text style={{ color: Theme.lightColors.primary }}>quote.</Text>
            </Text>
          </View>

          <View
            style={{
              paddingLeft: 32,
              paddingRight: 38,
              width: '80%',
              top: '-21%',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <Formik
              initialValues={{
                quote: initialQuote,
              }}
              validationSchema={manageQuoteSchema}
              onSubmit={async (values: manageQuoteValues) => {
                const manageQuoteStore = new ManageQuoteStore();
                try {
                  await manageQuoteStore.editQuote(values.quote, quoteId);
                  setModalVisible(false);
                  setConfirmPopupVisible(true);
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
                        Submit
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
      <EditQuoteConfirmation
        setModalVisible={setConfirmPopupVisible}
        modalVisible={confirmPopupVisible}
        edit={true}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    top: '30%',
    left: '25%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    width: 320,
    height: 375,
    padding: 32,
    borderRadius: 16,
    zIndex: 1,

    elevation: 4,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});

export default EditQuote;
