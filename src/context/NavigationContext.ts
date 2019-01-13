import createReactContext from 'create-react-context';
import { NavigationScreenPropBase } from '../screens';

export const NavigationContext =
  createReactContext<NavigationScreenPropBase<any>>(undefined as any);
