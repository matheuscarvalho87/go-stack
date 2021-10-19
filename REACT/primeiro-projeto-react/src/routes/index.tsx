import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Repository from '../pages/Repository';

//Se tirar o Switch todas as rotas são mostradas ao mesmo tempo
const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard}/>
    <Route path="/repositories/:repository+" component={Repository}/>
  </Switch>
);

export default Routes;
