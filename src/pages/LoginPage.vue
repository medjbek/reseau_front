<script setup>
import { ref } from 'vue'
import { api, setAuthToken } from 'boot/axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const loading = ref(false)
const errorMessage = ref('')

const form = ref({
  email: '',
  password: '',
})

const login = async () => {
  errorMessage.value = ''
  loading.value = true

  try {
    const response = await api.post('/login', form.value)

    const token = response.data.token

    // Enregistre le token
    setAuthToken(token)

    // Redirection après connexion
    router.push('/annonces')
  } catch (error) {
    console.error(error)
    errorMessage.value = 'Email ou mot de passe incorrect.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <q-page padding>
    <div class="app-container">
      <div class="title q-mb-lg">Se connecter</div>

      <q-card class="card">
        <q-card-section>
          <q-form @submit.prevent="login" class="q-gutter-md">
            <q-input v-model="form.email" label="Email" type="email" outlined dense />

            <q-input v-model="form.password" label="Mot de passe" type="password" outlined dense />

            <div v-if="errorMessage" class="text-negative">
              {{ errorMessage }}
            </div>

            <q-btn label="Se connecter" color="primary" type="submit" :loading="loading" />

            <div class="q-mt-md text-center">
              Pas encore de compte ?
              <router-link to="/register" class="text-primary"> Créer un compte </router-link>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>
