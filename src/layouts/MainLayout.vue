<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-dark app-header">
      <q-toolbar class="app-toolbar">
        <q-toolbar-title class="title app-logo"> ANNONCENET </q-toolbar-title>

        <q-space />

        <q-btn flat no-caps label="Annonces" to="/annonces" />
        <q-btn flat no-caps label="Publier une annonce" to="/publier" />
        <q-btn flat no-caps label="Se connecter" to="/login" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.app-header {
  border-bottom: 1px solid #e5e7eb;
}

.app-toolbar {
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
  min-height: 72px;
}

.app-logo {
  font-size: 1.2rem;
}
</style>
