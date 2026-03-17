<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'boot/axios'

const loading = ref(false)
const loadingCategories = ref(false)
const successMessage = ref('')
const errorMessage = ref('')
const categoryOptions = ref([])

const getInitialForm = () => ({
  title: '',
  description: '',
  category_id: null,
  organisation_name: '',
  organisation_address: '',
  city: '',
  contact_email: '',
  contact_phone: '',
  status: 'active',
})

const form = ref(getInitialForm())

const loadCategories = async () => {
  loadingCategories.value = true

  try {
    const response = await api.get('/categories')

    categoryOptions.value = response.data.map((category) => ({
      label: category.name,
      value: category.id,
    }))
  } catch (error) {
    console.error('Erreur chargement catégories', error)
    errorMessage.value = 'Impossible de charger les catégories.'
  } finally {
    loadingCategories.value = false
  }
}

const submitAnnonce = async () => {
  successMessage.value = ''
  errorMessage.value = ''
  loading.value = true

  try {
    await api.post('/annonces', form.value)

    successMessage.value = 'Annonce publiée avec succès.'
    form.value = getInitialForm()
  } catch (error) {
    console.error('Erreur API', error)

    if (error.response?.status === 401) {
      errorMessage.value = 'Tu dois être connecté pour publier une annonce.'
    } else if (error.response?.status === 422) {
      errorMessage.value = 'Certains champs sont invalides ou manquants.'
    } else {
      errorMessage.value = "La publication de l'annonce a échoué."
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadCategories()
})
</script>

<template>
  <q-page padding>
    <div class="app-container">
      <div class="title q-mb-lg">Publier une annonce</div>

      <q-card class="card">
        <q-card-section>
          <q-form @submit.prevent="submitAnnonce" class="q-gutter-md">
            <q-input v-model="form.title" label="Titre" outlined dense />

            <q-input v-model="form.description" label="Description" type="textarea" outlined />

            <q-select
              v-model="form.category_id"
              :options="categoryOptions"
              option-label="label"
              option-value="value"
              emit-value
              map-options
              label="Catégorie"
              outlined
              dense
              :loading="loadingCategories"
            />

            <q-input
              v-model="form.organisation_name"
              label="Nom de l'organisation"
              outlined
              dense
            />

            <q-input v-model="form.organisation_address" label="Adresse" outlined dense />

            <q-input v-model="form.city" label="Ville" outlined dense />

            <q-input
              v-model="form.contact_email"
              label="Email de contact"
              type="email"
              outlined
              dense
            />

            <q-input v-model="form.contact_phone" label="Téléphone" outlined dense />

            <div v-if="successMessage" class="text-positive">
              {{ successMessage }}
            </div>

            <div v-if="errorMessage" class="text-negative">
              {{ errorMessage }}
            </div>

            <q-btn label="Publier l'annonce" color="primary" type="submit" :loading="loading" />
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>
