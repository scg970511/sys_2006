let dynamicRoutes = [
  {
    path: "/",
    name: "home",
    component: () => import(/**webpackChunkName: "home" */ "../pages/Home"),
    children: []
  },
  {
    path: "*",
    component: () =>
      import(/**webpackChunkName: 'Page404' */ "../pages/Page404")
  }
];

export default dynamicRoutes;
