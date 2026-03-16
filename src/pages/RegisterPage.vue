<script setup>
import { ref } from 'vue'
import { api } from 'boot/axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const loading = ref(false)
const errorMessage = ref('')

const form = ref({
  name: '',
  email: '',
  password: '',
})

const register = async () => {
  errorMessage.value = ''
  loading.value = true

  try {
    const response = await api.post('/register', form.value)

    const token = response.data.token

    localStorage.setItem('token', token)

    router.push('/annonces')
  } catch (error) {
    console.error(error)

    if (error.response?.status === 422) {
      errorMessage.value = 'Certains champs sont invalides ou déjà utilisés.'
    } else {
      errorMessage.value = 'La création du compte a échoué.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <q-page padding>
    <div class="app-container">
      <div class="title q-mb-lg">Créer un compte</div>

      <q-card class="card">
        <q-card-section>
          <q-form @submit.prevent="register" class="q-gutter-md">
            <q-input v-model="form.name" label="Nom" outlined dense />

            <q-input v-model="form.email" label="Email" type="email" outlined dense />

            <q-input v-model="form.password" label="Mot de passe" type="password" outlined dense />

            <div v-if="errorMessage" class="text-negative">
              {{ errorMessage }}
            </div>

            <q-btn label="Créer un compte" color="primary" type="submit" :loading="loading" />

            <div class="q-mt-md text-center">
              Déjà inscrit ?
              <router-link to="/login" class="text-primary"> Se connecter </router-link>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>
