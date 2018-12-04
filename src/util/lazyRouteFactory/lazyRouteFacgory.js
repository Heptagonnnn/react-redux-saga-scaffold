import React from 'react';
import Loadable from "react-loadable";
import Loading from "../../component/Loading/index";


export default function lazyRouteFactory (fn) {
  return  Loadable({
    loader: () => fn,
    loading: () => <Loading/>
  });
}