import { number } from 'yup';
import customAxios from '../../config/axios.config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../../common/functions/user';

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

  getUserStatistics = (userId: number) => {
    try {
      return getUserStatistics(userId);
    } catch (e) {
      return null;
    }
  };

  getUserMostLikedQuotes = (page: number, userId: number) => {
    try {
      return getUserMostLikedQuotes(page, userId);
    } catch (e) {
      return null;
    }
  };

  getUserLikes = (page: number, userId: number) => {
    try {
      return getUserLikes(page, userId);
    } catch (e) {
      return null;
    }
  };

  getUserQuotes = (page: number, userId: number) => {
    try {
      return getUserQuotes(page, userId);
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
    try {
      const response = await customAxios.get(
        `/quote/user-decisions/${Number(userId)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      logout();
    }
  } else {
    return null;
  }
};

const getUserStatistics = async (userId: number) => {
  const response = await customAxios.get(`user/statistics/${Number(userId)}`);
  return response.data;
};

const getUserMostLikedQuotes = async (page: number, userId: number) => {
  const response = await customAxios.get(
    `user/most-liked-quotes/${page}/${Number(userId)}`
  );
  return response;
};

const getUserLikes = async (page: number, userId: number) => {
  const response = await customAxios.get(
    `user/quotes-liked/${page}/${Number(userId)}`
  );
  return response;
};

const getUserQuotes = async (page: number, userId: number) => {
  const response = await customAxios.get(
    `user/quotes/${page}/${Number(userId)}`
  );
  return response;
};
