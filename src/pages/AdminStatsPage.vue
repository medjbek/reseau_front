<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { api } from 'boot/axios'

const router = useRouter()

const loading = ref(true)
const isAdmin = ref(false)
const stats = ref([])

const checkAdmin = async () => {
  const response = await api.get('/me')
  isAdmin.value = !!response.data.user?.is_admin

  if (!isAdmin.value) {
    router.push('/')
  }
}

const fetchStats = async () => {
  const annoncesResponse = await api.get('/annonces')
  const annonces = annoncesResponse.data.data || []

  const statsData = []

  for (const annonce of annonces) {
    try {
      const viewsResponse = await api.get(`/annonces/${annonce.id}/views`)

      statsData.push({
        id: annonce.id,
        title: annonce.title,
        city: annonce.city,
        category: annonce.category?.name || 'Non renseignée',
        views: viewsResponse.data.views,
      })
    } catch {
      statsData.push({
        id: annonce.id,
        title: annonce.title,
        city: annonce.city,
        category: annonce.category?.name || 'Non renseignée',
        views: 0,
      })
    }
  }

  stats.value = statsData
}

onMounted(async () => {
  try {
    await checkAdmin()
    if (isAdmin.value) {
      await fetchStats()
    }
  } catch (error) {
    console.error('Erreur page admin stats', error)
    router.push('/login')
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <q-page padding>
    <div class="text-h4 q-mb-md">Statistiques des annonces</div>

    <q-spinner v-if="loading" size="40px" />

    <div v-else>
      <q-table
        title="Vues par annonce"
        :rows="stats"
        :columns="[
          { name: 'title', label: 'Annonce', field: 'title', align: 'left' },
          { name: 'city', label: 'Ville', field: 'city', align: 'left' },
          { name: 'category', label: 'Catégorie', field: 'category', align: 'left' },
          { name: 'views', label: 'Vues', field: 'views', align: 'center' },
        ]"
        row-key="id"
        flat
        bordered
      />
    </div>
  </q-page>
</template>
