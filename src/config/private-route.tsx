import React from "react";
import { connect } from "react-redux";
import { Route, RouteProps } from "react-router-dom";
// import { RootReducer } from "../reducer";

interface OwnProps extends RouteProps {
  // hasAnyAuthorities?: number[];
  component: any;
}

// export interface PrivateRouteProps extends OwnProps, StateProps {}
export interface PrivateRouteProps extends OwnProps {}

export const PrivateRouteComponent = ({
  component: Component,
  ...rest
}: PrivateRouteProps) => {
  // const checkAuthorities = (props: JSX.IntrinsicAttributes) =>
  //   isAuthorized ? (
  //     <ErrorBoundary>
  //       <Component {...props} />
  //     </ErrorBoundary>
  //   ) : (
  //     <NotAuthorized />
  //   );

  // const renderRedirect = (props: any) => {
  //   return isAuthenticated ? (
  //     checkAuthorities(props)
  //   ) : (
  //     <Redirect
  //       to={{
  //         pathname: "/signin",
  //         search: props.location.search,
  //         state: { from: props.location },
  //       }}
  //     />
  //   );
  // };

  const renderRedirect = (props: any) => <Component {...props} />

  if (!Component) {
    throw new Error(
      `A component needs to be specified for private route for path ${
        (rest as any).path
      }`
    );
  }

  return <Route {...rest} render={renderRedirect} />;
};

// export const hasAnyAuthority = (
//   authorities: number | undefined,
//   hasAnyAuthorities: number[] = []
// ) => {
//   if (authorities) {
//     if (hasAnyAuthorities.length === 0) {
//       return true;
//     }
//     return hasAnyAuthorities.some((auth) => auth === authorities);
//   }
//   return false;
// };

// interface StateProps {
//   isAuthenticated: boolean;
//   isAuthorized: boolean;
// }

// const mapStateToProps = (
//   state: RootReducer,
//   { hasAnyAuthorities = [] }: OwnProps
// ): StateProps => {
//   const { authentication } = state || {};
//   const { userInfo, isLoggedIn } = authentication || {};
//   return {
//     isAuthenticated: isLoggedIn,
//     isAuthorized: hasAnyAuthority(get(userInfo, "type"), hasAnyAuthorities),
//   };
// };

const PrivateRoute = connect(null, null, null, { pure: false })(
  PrivateRouteComponent
);

export default PrivateRoute;
