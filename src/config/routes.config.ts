import RouteLoader from "../shared/Loader";
import Lodable from "react-loadable";


const LoadableConfig = {
    delay: 300,
    timeout: 10000,
  };
  
export const ROUTES = [
    {
      key: "Home",
      routeProps: {
        path: "/home",
        component: Lodable({
          loader: () =>
            import("../modules/Home"),
          loading: RouteLoader,
          ...LoadableConfig,
        }),
      }
    },
    {
      key: "Products",
      routeProps: {
        path: "/products",
        component: Lodable({
          loader: () =>
            import("../modules/Products"),
          loading: RouteLoader,
          ...LoadableConfig,
        }),
      }
    },
    {
      key: "cart",
      routeProps: {
        path: "/cart",
        component: Lodable({
          loader: () =>
            import("../modules/Checkout"),
          loading: RouteLoader,
          ...LoadableConfig,
        }),
      }
    },
    {
      key: "todos",
      routeProps: {
        path: "/todos",
        component: Lodable({
          loader: () =>
            import("../modules/BackendIntegratioCheck"),
          loading: RouteLoader,
          ...LoadableConfig,
        }),
      }
    },
    {
      key: "Order",
      routeProps: {
        path: "/orders/:orderid",
        component: Lodable({
          loader: () =>
            import("../modules/Orders"),
          loading: RouteLoader,
          ...LoadableConfig,
        }),
      }
    },
    {
      key: "Orders",
      routeProps: {
        path: "/orders/",
        component: Lodable({
          loader: () =>
            import("../modules/Orders"),
          loading: RouteLoader,
          ...LoadableConfig,
        }),
      }
    }
]

