import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import RendererWrapper0 from '/Users/skjin/CMPE_Folder/285_final_git/front_end/src/pages/.umi/LocaleWrapper.jsx'

let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/",
    "component": require('../../layouts/index.js').default,
    "routes": [
      {
        "path": "/",
        "exact": true,
        "component": require('../index.js').default,
        "_title": "final-proj",
        "_title_default": "final-proj"
      },
      {
        "path": "/LineChart",
        "exact": true,
        "component": require('../LineChart.js').default,
        "_title": "final-proj",
        "_title_default": "final-proj"
      },
      {
        "path": "/MoneyDis",
        "exact": true,
        "component": require('../MoneyDis.js').default,
        "_title": "final-proj",
        "_title_default": "final-proj"
      },
      {
        "path": "/MyTag",
        "exact": true,
        "component": require('../MyTag.js').default,
        "_title": "final-proj",
        "_title_default": "final-proj"
      },
      {
        "component": () => React.createElement(require('/Users/skjin/CMPE_Folder/285_final_git/front_end/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false }),
        "_title": "final-proj",
        "_title_default": "final-proj"
      }
    ],
    "_title": "final-proj",
    "_title_default": "final-proj"
  },
  {
    "component": () => React.createElement(require('/Users/skjin/CMPE_Folder/285_final_git/front_end/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false }),
    "_title": "final-proj",
    "_title_default": "final-proj"
  }
];
window.g_routes = routes;
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

// route change handler
function routeChangeHandler(location, action) {
  window.g_plugins.applyForEach('onRouteChange', {
    initialValue: {
      routes,
      location,
      action,
    },
  });
}
window.g_history.listen(routeChangeHandler);
routeChangeHandler(window.g_history.location);

export default function RouterWrapper() {
  return (
<RendererWrapper0>
          <Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
        </RendererWrapper0>
  );
}
