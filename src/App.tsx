import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { CssBaseline } from '@material-ui/core';
import './App.css';
import { queryClient } from './common/config';
import Home, { TopBar } from './pages/home';
import Detail from './pages/detail';
import Cart from './pages/cart';
import { SnakbarMessages } from './common/modules/messages';
import PrivateRoute from './common/components/PrivateRoute';
import Profile from './pages/profile';
import SignIn from './pages/profile/signin';

const Empty = () => null;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <CssBaseline />
        <Router>
          <Switch>
            <Route path="/signin" component={Empty} />
            <Route path="/" component={TopBar} />
          </Switch>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/items" component={Home} />
            <Route path="/cart" component={Cart} />
            <PrivateRoute path="/profile" component={Profile} preventRedirect />
            <Route path="/signin" component={SignIn} />
          </Switch>
          <Switch>
            <Route path="/items/:id" component={Detail} />
          </Switch>
        </Router>

        <SnakbarMessages />
      </div>
    </QueryClientProvider>
  );
}

export default App;
