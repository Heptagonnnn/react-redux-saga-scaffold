import React from 'react';
import {Route, Switch, withRouter, Link} from "react-router-dom";
import {NoLazy} from "../NoLazy";
import LazyRoute from "../../component/LazyRoute";


@withRouter
export class RootPage extends React.Component {
  render() {
    return (
      <div>

        <div>This is Root</div>
        <div>
          <Link to={"/test"}>to lazy page</Link>
          <Link to={"/no-lazy"}>to no lazy page</Link>
        </div>
        <Switch>
          <LazyRoute path={"/test"} component={() => import("../Dashboard")}/>
        </Switch>
      </div>
    )
  }
}