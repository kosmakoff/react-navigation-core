import createReactContext from 'create-react-context';

export const NavigationContext =
  createReactContext<import('../screens').NavigationScreenProp<any>>(undefined as any);
