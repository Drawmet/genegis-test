import {connect} from 'react-redux';

import Home from '../components/Home';

import * as reposActions from '../store/actions/reposActions';
import * as appActions from '../store/actions/appActions';

const actionTypes = {
    ...reposActions,
    ...appActions
};

const mapStateToProps = (state) => ({
    ...state.app,
    ...state.repos
});

const mapDispatchToProps = (dispatch) => ({
    getData: () => dispatch(actionTypes.getReposAction()),
    getSearchData: (sort, search) => dispatch(actionTypes.getReposAction(0, sort, search)),
    getNewData: (page, sort, search) => dispatch(actionTypes.getNewReposAction(page, sort, search)),
    checkConnection: () => dispatch(actionTypes.checkConnectionAction())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);