import React from "react";

const routes = [
  {
    path: "/nova-musica",
    component: React.lazy(() => import("../pages/music/Music")),
  },
  {
    path: "/pagina-nao-encontrada",
    component: React.lazy(() => import("../pages/notFound/NotFound")),
  },
];

export default routes;
