import {connect} from 'react-redux';

import SignIn from '../components/SignIn';

import * as UserActions from '../store/actions/userActions';

const actionTypes = {
    ...UserActions
};

const mapStateToProps = (state) => ({
    ...state.app
});

const mapDispatchToProps = (dispatch) => ({
    onSignIn: (email, password) => dispatch(actionTypes.userSignInAction(email, password)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn);