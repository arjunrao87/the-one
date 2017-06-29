import { createRouter } from '@expo/ex-navigation';

import App from '../components/App';
import RootNavigation from './RootNavigation';

export default createRouter(() => ({
  home: () => App,
  rootNavigation: () => RootNavigation,
}));
