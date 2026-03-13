const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
      },

      {
        path: 'annonces',
        component: () => import('pages/AnnoncesPage.vue'),
      },

      {
        path: 'annonces/:id',
        component: () => import('pages/AnnonceDetailPage.vue'),
      },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
