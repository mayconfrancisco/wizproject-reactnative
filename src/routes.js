import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Main from '~/pages/Main';
import SignIn from '~/pages/SignIn';

export default function createNavigator(isLoggedin) {
  return createAppContainer(
    createSwitchNavigator(
      {
        SignIn,
        Main,
      },
      {
        initialRouteName: isLoggedin ? 'Main' : 'SignIn',
      },
    ),
  );
}
