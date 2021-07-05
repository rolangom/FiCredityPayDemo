
import React from "react";
import { RouteProps, Route, Redirect } from 'react-router-dom';
import { LocationDescriptor } from 'history';
import firebase from "firebase";
import { useUser } from "../utils";

type IProps = RouteProps & { preventRedirect?: boolean }

function PrivateRoute(props: IProps) {
  const user = useUser();
  const { preventRedirect, ...rest } = props;
  if (user == null) {
    const to: LocationDescriptor<{ redirectTo?: string }> = {
      pathname: '/signin',
      state: {
        redirectTo: preventRedirect ? undefined : props.path as string,
      },
    }
    return <Redirect to={to} />
  }

  return <Route {...rest} />;
}

export default PrivateRoute;
