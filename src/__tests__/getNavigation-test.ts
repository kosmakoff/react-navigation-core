import { getNavigation } from '../getNavigation';
import { NavigationRouter } from '../routers';

interface CustomActions {
  foo: (bar: any) => {
    type: 'FooBarAction',
    bar: any
  };
}

test('getNavigation provides default action helpers', () => {
  const router = {
    getActionCreators: () => ({}),
    getStateForAction(action: any, lastState: any = {}) {
      return lastState;
    },
  } as NavigationRouter<{}>;

  const dispatch = jest.fn();

  const topNav = getNavigation(
    router,
    {},
    dispatch,
    new Set(),
    () => ({}),
    () => null
  );

  topNav.navigate('GreatRoute');

  expect(dispatch.mock.calls.length).toBe(1);
  expect(dispatch.mock.calls[0][0].type).toBe('Navigation/NAVIGATE');
  expect(dispatch.mock.calls[0][0].routeName).toBe('GreatRoute');
});

test('getNavigation provides router action helpers', () => {
  const router = {
    getActionCreators: () => ({
      foo: bar => ({ bar, type: 'FooBarAction' }),
    }),
    getStateForAction(action: any, lastState: any = {}) {
      return lastState;
    },
  } as NavigationRouter<{}, any, CustomActions>;

  const dispatch = jest.fn();

  const topNav = getNavigation(
    router,
    {},
    dispatch,
    new Set(),
    () => ({}),
    () => null
  );

  topNav.foo('Great');

  expect(dispatch.mock.calls.length).toBe(1);
  expect(dispatch.mock.calls[0][0].type).toBe('FooBarAction');
  expect(dispatch.mock.calls[0][0].bar).toBe('Great');
});

test('getNavigation get child navigation with router', () => {
  const routerA = {
    getActionCreators: () => ({}),
    getStateForAction(action: any, lastState: any = {}) {
      return lastState;
    },
  };
  const router = {
    childRouters: {
      RouteA: routerA,
    } as any,
    getActionCreators: () => ({}),
    getStateForAction(action: any, lastState: any = {}) {
      return lastState;
    },
  } as NavigationRouter<typeof initState>;

  const initState = {
    index: 0,
    routes: [
      {
        key: 'a',
        routeName: 'RouteA',
        routes: [{ key: 'c', routeName: 'RouteC' }],
        index: 0,
      },
      { key: 'b', routeName: 'RouteB' },
    ],
  };

  const topNav = getNavigation(
    router,
    initState,
    () => true,
    new Set(),
    () => ({}),
    () => null
  );

  const childNavA = topNav.getChildNavigation('a');

  expect(childNavA.router).toBe(routerA);
});
