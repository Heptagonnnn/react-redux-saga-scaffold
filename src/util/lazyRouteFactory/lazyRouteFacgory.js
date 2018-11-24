import React from 'react';
import Loadable from "react-loadable";
import Loading from "../../component/Loading/index";


export default function lazyRouteFactory (uri) {
  console.log(uri);
  return  Loadable({
    loader: () => import(`../../container/Dashboard/index`),
    loading: () => <Loading/>
  });
}