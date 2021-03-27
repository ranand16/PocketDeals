import React from 'react';
import classes from './App.module.scss';
import AppRoutes from './AppRoutes';
import classnames from 'classnames'

const App: React.FC = () => {
  return (
    <div className={classnames(classes.app)}>
      <AppRoutes />
    </div>
  );
};

export default App;
