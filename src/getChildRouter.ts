// types
import { NavigationRouter } from './routers';

export default function getChildRouter(
  router: NavigationRouter<any>,
  routeName: string
): NavigationRouter<any> | null | undefined {
  if (router.childRouters && router.childRouters[routeName]) {
    return router.childRouters[routeName];
  }

  const Component = router.getComponentForRouteName(routeName);
  return 'router' in Component ? Component.router : undefined;
};
