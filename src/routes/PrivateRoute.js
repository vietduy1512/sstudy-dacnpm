import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useToasts} from 'react-toast-notifications';
import {AppState} from 'constants/app';
import {connect} from 'react-redux';

function PrivateRoute({appState, children, ...rest}) {
  const {addToast} = useToasts();

  return (
    <Route
      {...rest}
      render={({location}) => {
        switch (appState) {
          case AppState.AUTHENTICATED:
            return children;

          default:
            addToast('Unauthorized! You need to login.', {
              appearance: 'error',
              autoDismiss: true,
            });
            break;
        }
        return (
          <Redirect
            to={{
              pathname: '/login',
              state: {from: location},
            }}
          />
        );
      }}
    />
  );
}

const mapStateToProps = (state) => ({
  appState: state.app.state,
  currentUser: state.app.user,
});

export default connect(mapStateToProps, {})(PrivateRoute);
