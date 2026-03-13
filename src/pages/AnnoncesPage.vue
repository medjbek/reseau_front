<script setup>
import { ref, onMounted, computed } from 'vue'
import { api } from 'boot/axios'
import AnnonceCard from 'components/AnnonceCard.vue'

const annonces = ref([])
const loading = ref(true)

const search = ref('')
const selectedCategory = ref(null)

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

const categoryOptions = computed(() => {
  const names = annonces.value.map((annonce) => annonce.category?.name).filter(Boolean)

  return [...new Set(names)]
})

const filteredAnnonces = computed(() => {
  return annonces.value.filter((annonce) => {
    const matchSearch =
      annonce.title.toLowerCase().includes(search.value.toLowerCase()) ||
      annonce.description.toLowerCase().includes(search.value.toLowerCase()) ||
      annonce.city.toLowerCase().includes(search.value.toLowerCase())

    const matchCategory =
      !selectedCategory.value || annonce.category?.name === selectedCategory.value

    return matchSearch && matchCategory
  })
})
</script>

<template>
  <q-page padding>
    <div class="app-container">
      <div class="title q-mb-md">Liste des annonces</div>

      <div class="filters-row q-mb-lg">
        <q-input
          v-model="search"
          outlined
          dense
          placeholder="Rechercher une annonce..."
          class="filters-search"
        />

        <q-select
          v-model="selectedCategory"
          :options="categoryOptions"
          label="Filtrer par catégorie"
          outlined
          dense
          clearable
          class="filters-select"
        />
      </div>

      <q-spinner v-if="loading" size="40px" />

      <div v-else>
        <AnnonceCard v-for="annonce in filteredAnnonces" :key="annonce.id" :annonce="annonce" />

        <div v-if="filteredAnnonces.length === 0" class="q-mt-md app-muted">
          Aucune annonce ne correspond à la recherche.
        </div>
      </div>
    </div>
  </q-page>
</template>

<style scoped>
.filters-row {
  display: flex;
  gap: 16px;
  align-items: center;
}

.filters-search {
  flex: 1;
}

.filters-select {
  width: 260px;
}

@media (max-width: 768px) {
  .filters-row {
    flex-direction: column;
    align-items: stretch;
  }

  .filters-select {
    width: 100%;
  }
}
</style>
