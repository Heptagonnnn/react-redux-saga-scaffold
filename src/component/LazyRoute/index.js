import React from 'react';
import {Route} from "react-router-dom";
import lazyRouteFactory from "../../util/lazyRouteFactory/lazyRouteFacgory";




export default class LazyRoute extends React.PureComponent {
  render() {
    const {component, ...props} = this.props;
    return (
      <Route {...props} component={lazyRouteFactory(component)}/>
    )
  }
}