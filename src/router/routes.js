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
      {
        path: 'publier',
        component: () => import('pages/PublierAnnoncePage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'login',
        component: () => import('pages/LoginPage.vue'),
      },
      {
        path: 'register',
        component: () => import('pages/RegisterPage.vue'),
      },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
