import createReactContext from 'create-react-context';
import { NavigationScreenProp } from '../screens';

export const NavigationContext =
  createReactContext<NavigationScreenProp<any>>(undefined as any);
