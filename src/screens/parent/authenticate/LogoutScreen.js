import React, {useEffect} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {logout} from 'actions/appAction';

const LogoutScreen = props => {
  useEffect(() => {
    const logoutListener = props.navigation.addListener('focus', () => {
      axios
        .post('/auth/logout')
        .then(response => {
          if (response.status === 200) {
            props.logout();
          }
        })
        .catch(error => {
          console.log(error);
        });
    });
    return logoutListener;
  }, [props]);

  return <></>;
};

export default connect(
  null,
  {logout},
)(LogoutScreen);
