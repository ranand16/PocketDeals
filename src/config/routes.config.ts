import RouteLoader from "../shared/Loader";
import Lodable from "react-loadable";


const LoadableConfig = {
    delay: 300,
    timeout: 10000,
  };
  
export const ROUTES = [
    // {
    //   key: "Product",
    //   routeProps: {
    //     path: "/product",
    //     component: Lodable({
    //       loader: () =>
    //         import("../components/Product"),
    //       loading: RouteLoader,
    //       ...LoadableConfig,
    //     }),
    //   },
    // },
    // {
    //   key: "Product Details",
    //   routeProps: {
    //     path: "/productDet",
    //     component: Lodable({
    //       loader: () =>
    //         import("../components/Product"),
    //       loading: RouteLoader,
    //       ...LoadableConfig,
    //     }),
    //   },
    // },
    // {
    //   key: "Register",
    //   routeProps: {
    //     path: "/",
    //     component: Lodable({
    //       loader: () =>
    //         import("../shared/Register"),
    //       loading: RouteLoader,
    //       ...LoadableConfig,
    //     }),
    //   }
    // },
    {
      key: "Products",
      routeProps: {
        path: "/",
        component: Lodable({
          loader: () =>
            import("../modules/Products"),
          loading: RouteLoader,
          ...LoadableConfig,
        }),
      }
    },
    {
      key: "Cart",
      routeProps: {
        path: "/cart",
        component: Lodable({
          loader: () =>
            import("../modules/Cart"),
          loading: RouteLoader,
          ...LoadableConfig,
        }),
      }
    },
    {
      key: "Todos",
      routeProps: {
        path: "/todos",
        component: Lodable({
          loader: () =>
            import("../modules/BackendIntegratioCheck"),
          loading: RouteLoader,
          ...LoadableConfig,
        }),
      }
    }
]


// {
//     key: "settings",
//     restrictedRoute: true,
//     routeProps: {
//       path: "/settings",
//       component: Lodable({
//         loader: () =>
//           import("../modules/Profile"),
//         loading: UableRouteLoader,
//         ...LoadableConfig,
//       }),
//       hasAnyAuthorities: [AUTHORITIES.PARENT, AUTHORITIES.STUDENT],
//     },
//   }
    // {
    //   key: "notFound",
    //   restrictedRoute: false,
    //   routeProps: {
    //     path: "/page-not-found",
    //     component: Lodable({
    //       loader: () =>
    //         import("../shared/Components/PageNotFound"),
    //       loading: UableRouteLoader,
    //       ...LoadableConfig,
    //     }),
    //   },
    // },
    // {
    //   key: "maintenance",
    //   restrictedRoute: false,
    //   routeProps: {
    //     path: "/maintenance",
    //     component: Lodable({
    //       loader: () =>
    //         import("../shared/Components/MaintenancePage"),
    //       loading: UableRouteLoader,
    //       ...LoadableConfig,
    //     }),
    //   },
    // },
    // {
    //   key: "signin",
    //   restrictedRoute: false,
    //   routeProps: {
    //     path: "/signin",
    //     component: Lodable({
    //       loader: () =>
    //         import("../modules/Authentication"),
    //       loading: UableRouteLoader,
    //       ...LoadableConfig,
    //     }),
    //   },
    // },