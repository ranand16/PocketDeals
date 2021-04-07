import React from 'react';
import classes from './App.module.scss';
import AppRoutes from './AppRoutes';
import classnames from 'classnames'
import { BrowserRouter as Router } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { RootState } from '../../store/reducers';

// const mapDispatchToProps = (state: RootState) => ({})
// const mapStateToProps: any = {};

// type StateProps = ReturnType<typeof mapStateToProps>;
// type DispatchProps = typeof mapDispatchToProps;

// interface Props extends StateProps, DispatchProps {}

const App: React.FC = () => {
  return (
    <div className={classnames(classes.app)}>
        <Router>
         <AppRoutes />        
        </Router>
    </div>
  );
};

export default (App);
// export default connect(mapStateToProps, mapDispatchToProps)(App);
