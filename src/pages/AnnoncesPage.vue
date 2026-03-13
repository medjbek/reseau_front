<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'boot/axios'
import AnnonceCard from 'components/AnnonceCard.vue'

const annonces = ref([])
const loading = ref(true)

const fetchAnnonces = async () => {
  try {
    const response = await api.get('/annonces')

    annonces.value = response.data.data
  } catch (error) {
    console.error('Erreur API', error)
  } finally {
    loading.value = false
  }
}

onMounted(fetchAnnonces)
</script>

<template>
  <q-page padding>
    <div class="text-h4 q-mb-md">Liste des annonces</div>

    <q-spinner v-if="loading" size="40px" />

    <div v-else>
      <AnnonceCard v-for="annonce in annonces" :key="annonce.id" :annonce="annonce" />
    </div>
  </q-page>
</template>
