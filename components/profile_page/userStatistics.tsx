import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';

import { Theme, customStyles } from '../../config/theme.config';
import { GetUserStore } from '../../api/user/get_user';
const UserStatistics = ({ userId }) => {
  const [karma, setKarma] = useState<number>(null);
  const [numberOfQuotes, setNumberOfQuotes] = useState<number>(null);
  const getUserStore = new GetUserStore();

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const statistics = await getUserStore.getUserStatistics(userId);
      setNumberOfQuotes(parseInt(statistics[0][0].count));
      setKarma(parseInt(statistics[1][0].count));
    } catch (err) {
      console.error(err);
    }
  };

  if (karma === null || userId === 0) {
    return <></>;
  } else {
    return (
      <View
        style={[
          statisticsStyles.nameView,
          {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            elevation: 4,
          },
        ]}
      >
        <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
          <Text style={[customStyles.body, { textAlign: 'center' }]}>
            Quotes
          </Text>
          <Text
            style={[
              customStyles.h5,
              {
                color: Theme.lightColors.primary,
                textAlign: 'center',
                fontSize: 20,
              },
            ]}
          >
            {numberOfQuotes}
          </Text>
        </View>
        <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
          <Text style={[customStyles.body, { textAlign: 'center' }]}>
            Quotastic karma
          </Text>
          <Text
            style={[customStyles.h5, { textAlign: 'center', fontSize: 20 }]}
          >
            {karma}
          </Text>
        </View>
      </View>
    );
  }
};

const statisticsStyles: any = {
  nameView: {
    width: '75%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 16,
  },
};

export default UserStatistics;
