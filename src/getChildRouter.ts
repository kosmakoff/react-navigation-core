export default function getChildRouter(
  router: import('./routers').NavigationRouter<any>,
  routeName: string
): import('./routers').NavigationRouter<any> | null | undefined {
  if (router.childRouters && router.childRouters[routeName]) {
    return router.childRouters[routeName];
  }

  const Component = router.getComponentForRouteName(routeName);
  return 'router' in Component ? Component.router : undefined;
};
