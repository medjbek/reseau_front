<script setup>
import { ref } from 'vue'
import { api } from 'boot/axios'

const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const categoryOptions = [
  { label: 'Formation', value: 1 },
  { label: 'Emploi - Alternance - Stage', value: 2 },
  { label: 'Loisirs', value: 3 },
  { label: 'Logement', value: 4 },
  { label: 'Restaurant', value: 5 },
]

const form = ref({
  title: '',
  description: '',
  category_id: null,
  organisation_name: '',
  organisation_address: '',
  city: '',
  contact_email: '',
  contact_phone: '',
  status: 'active',
  user_id: 1,
})

const submitAnnonce = async () => {
  successMessage.value = ''
  errorMessage.value = ''
  loading.value = true

  try {
    await api.post('/annonces', form.value)

    successMessage.value = 'Annonce publiée avec succès.'

    form.value = {
      title: '',
      description: '',
      category_id: null,
      organisation_name: '',
      organisation_address: '',
      city: '',
      contact_email: '',
      contact_phone: '',
      status: 'active',
      user_id: 1,
    }
  } catch (error) {
    console.error('Erreur API', error)
    errorMessage.value = "La publication de l'annonce a échoué."
  } finally {
    loading.value = false
  }
}
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
