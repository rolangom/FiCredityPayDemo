import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { CssBaseline } from '@material-ui/core';
import './App.css';
import { queryClient } from './common/config';
import Home, { TopBar } from './pages/home';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <CssBaseline />
        <Router>
          <Switch>
            <Route path="/" component={TopBar} />
          </Switch>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;
