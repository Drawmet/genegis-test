import {connect} from 'react-redux';

import Shunter from '../components/Shunter';

const mapStateToProps = (state) => ({
    ...state.app,
    ...state.user,
});

export default connect(
    mapStateToProps
)(Shunter);