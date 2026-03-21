<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { removeAuthToken, api } from 'boot/axios'

const router = useRouter()
const route = useRoute()

const isAuthenticated = ref(false)
const isAdmin = ref(false)

const checkAuth = async () => {
  isAuthenticated.value = !!localStorage.getItem('token')

  if (!isAuthenticated.value) {
    isAdmin.value = false
    return
  }

  try {
    const response = await api.get('/me')
    isAdmin.value = !!response.data.user?.is_admin
  } catch (error) {
    console.error('Erreur récupération utilisateur', error)
    isAdmin.value = false
  }
}

const logout = () => {
  removeAuthToken()
  isAuthenticated.value = false
  isAdmin.value = false
  router.push('/login')
}

onMounted(async () => {
  await checkAuth()
})

watch(
  () => route.fullPath,
  async () => {
    await checkAuth()
  },
)
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-dark app-header">
      <q-toolbar class="app-toolbar">
        <q-toolbar-title class="title app-logo">ANNONCENET</q-toolbar-title>

        <q-space />

        <q-btn flat no-caps label="Annonces" to="/annonces" />

        <q-btn v-if="isAuthenticated" flat no-caps label="Publier une annonce" to="/publier" />

        <q-btn v-if="isAdmin" flat no-caps label="Statistiques" to="/admin/stats" />

        <q-btn v-if="!isAuthenticated" flat no-caps label="Se connecter" to="/login" />

        <q-btn v-if="isAuthenticated" flat no-caps label="Se déconnecter" @click="logout" />
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
