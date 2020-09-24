import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Main from './pages/Main';
import AddEdit from './pages/AddEdit';
import NotFound from '../../components/NotFound';

Photo.propTypes = {};

function Photo(props) {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={match.url} component={Main} />

      <Route path={`${match.url}/add`} component={AddEdit} />
      <Route path={`${match.url}/:photoId`} component={AddEdit} />

      <Route component={NotFound} />
    </Switch>
  );
}

export default Photo;