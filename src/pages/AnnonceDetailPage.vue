<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { api } from 'boot/axios'

const route = useRoute()

const annonce = ref(null)
const loading = ref(true)

const fetchAnnonce = async () => {
  try {
    const response = await api.get(`/annonces/${route.params.id}`)
    annonce.value = response.data.data
  } catch (error) {
    console.error('Erreur API', error)
  } finally {
    loading.value = false
  }
}

onMounted(fetchAnnonce)
</script>

<template>
  <q-page padding>
    <q-spinner v-if="loading" size="40px" />

    <div v-else-if="annonce">
      <div class="text-h4 q-mb-md">
        {{ annonce.title }}
      </div>

      <div class="text-grey q-mb-sm">Ville : {{ annonce.city }}</div>

      <div class="text-orange q-mb-md">Catégorie : {{ annonce.category?.name }}</div>

      <q-card class="q-mb-md">
        <q-card-section>
          <div class="text-subtitle1 q-mb-sm">Description</div>
          <div>{{ annonce.description }}</div>
        </q-card-section>
      </q-card>

      <q-card>
        <q-card-section>
          <div class="text-subtitle1 q-mb-sm">Contact</div>
          <div>Organisation : {{ annonce.organisation_name }}</div>
          <div>Email : {{ annonce.contact_email }}</div>
          <div>Téléphone : {{ annonce.contact_phone }}</div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>
