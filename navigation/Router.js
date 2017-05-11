import { createRouter } from '@expo/ex-navigation';

import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import RootNavigation from './RootNavigation';

export default createRouter(() => ({
  home: () => HomeScreen,
  settings: () => SettingsScreen,
  rootNavigation: () => RootNavigation,
}));
