import { View, StyleSheet, Modal, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { customStyles } from '../../config/theme.config';

import { ManageQuoteStore } from '../../api/quotes/manage_quote';
import EditQuoteConfirmation from './quoteConfirmation';

const DeleteQuote = ({ modalVisible, setModalVisible, quoteId }) => {
  const [confirmPopupVisible, setConfirmPopupVisible] = useState(false);

  const submit = async () => {
    const manageQuoteStore = new ManageQuoteStore();
    try {
      await manageQuoteStore.deleteQuote(quoteId);
      setModalVisible(false);
      setConfirmPopupVisible(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal animationType='slide' transparent={true} visible={modalVisible}>
        <View style={styles.container}>
          <Text style={customStyles.h4}>Are you sure?</Text>
          <Text
            style={[customStyles.body, { paddingTop: 32, paddingBottom: 32 }]}
          >
            This quote will be deleted. There is no undo of this action.
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              style={[customStyles.filledButton, { marginRight: 75 }]}
              onPress={() => {
                submit();
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
      </Modal>
      <EditQuoteConfirmation
        setModalVisible={setConfirmPopupVisible}
        modalVisible={confirmPopupVisible}
        edit={false}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    top: '40%',
    left: '25%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    width: 320,
    height: 250,
    padding: 32,
    borderRadius: 16,
    elevation: 4,
    zIndex: 1,
  },
});

export default DeleteQuote;
