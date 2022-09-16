import HomePage from "pages/HomePage.vue";
import ContactPage from "pages/ContactPage.vue";

const routes = [
  {
    //homePage, listar os contatos
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: HomePage}
    ]
  },
  {
    //contactPage, mostrar os números de um contato
    path: '/contact/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: ContactPage, props:true}
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
