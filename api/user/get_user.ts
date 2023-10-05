import customAxios from '../../config/axios.config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class GetUserStore {
  getUserPicture = (id: number) => {
    try {
      return getUserPicture(id);
    } catch (e) {
      return null;
    }
  };

  getUserVotes = () => {
    try {
      return getUserVotes();
    } catch (e) {
      return null;
    }
  };
}

const getUserPicture = async (id: number) => {
  const response = await customAxios.get(`/uploads/picture/${id}`, {
    responseType: 'blob',
  });

  return new Promise<string>((resolve, reject) => {
    const fileReaderInstance = new FileReader();

    fileReaderInstance.onload = () => {
      const base64data = fileReaderInstance.result as string;
      resolve(base64data);
    };

    fileReaderInstance.onerror = (error) => {
      reject(error);
    };

    fileReaderInstance.readAsDataURL(response.data);
  });
};

const getUserVotes = async () => {
  const token = await AsyncStorage.getItem('jwt');
  const userId = await AsyncStorage.getItem('userId');

  if (token) {
    const response = await customAxios.get(
      `/quote/user-decisions/${Number(userId)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } else {
    return null;
  }
};
