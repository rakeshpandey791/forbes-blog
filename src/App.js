import React from 'react';
import './App.scss';
import BlogList from "./component/BlogList";
import BlogDetail from "./component/BlogDetail";
import {BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
      <Router>
          <Route path='/' exact strict render={() => {
              return (<BlogList/>)
          }}/>
          <Route  path='/blog-detail/:id' exact strict render={(props) => {
              return (<BlogDetail {...props} />)
          }}/>
      </Router>
    </React.Fragment>
  );
}

export default App;
