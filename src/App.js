import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import UserPage from './pages/usertemppage.jsx';

import NewCustomPage from './pages/NewCustomPage.jsx';
import ViewCustomPage from './pages/ViewCustomPage.jsx';
import EditCustomPage from './pages/EditCustomPage.jsx';

import NotFoundPage from './pages/NotFoundPage.jsx';


function App () {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={UserPage} />
                <Route exact path='/new' component={NewCustomPage} />
                <Route exact path='/view/:id' component={ViewCustomPage} />
                <Route exact path='/edit/:id' component={EditCustomPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
