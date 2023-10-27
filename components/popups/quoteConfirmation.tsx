import { View, StyleSheet, Modal, Text, TouchableOpacity } from 'react-native';
import { Theme, customStyles } from '../../config/theme.config';
import { router } from 'expo-router';

const EditQuoteConfirmation = ({ modalVisible, setModalVisible, edit }) => {
  return (
    <Modal animationType='slide' transparent={true} visible={modalVisible}>
      <View style={styles.container}>
        {edit ? (
          <Text
            style={[customStyles.h4, { textAlign: 'center', marginBottom: 32 }]}
          >
            Your{' '}
            <Text style={{ color: Theme.lightColors.primary }}>quote </Text>
            was edited.
          </Text>
        ) : (
          <Text
            style={[customStyles.h4, { textAlign: 'center', marginBottom: 32 }]}
          >
            Your{' '}
            <Text style={{ color: Theme.lightColors.primary }}>quote </Text>
            was deleted.
          </Text>
        )}

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            style={customStyles.filledButton}
            onPress={() => {
              setModalVisible(false);
              router.replace('/');
            }}
          >
            <Text style={[customStyles.buttonText, { width: 135 }]}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    top: '45%',
    left: '25%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    width: 320,
    height: 225,
    padding: 32,
    borderRadius: 16,
    elevation: 4,
    zIndex: 1,
  },
});

export default EditQuoteConfirmation;
