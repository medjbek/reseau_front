<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  annonce: Object,
})

const openAnnonce = () => {
  router.push(`/annonces/${props.annonce.id}`)
}
</script>

<template>
  <q-card class="card q-mb-md">
    <q-card-section>
      <div class="card-title">
        {{ annonce.title }}
      </div>

      <div class="card-info">
        <span class="badge">
          {{ annonce.category?.name }}
        </span>

        <span class="card-city">
          {{ annonce.city }}
        </span>
      </div>

      <div class="card-description">
        {{ annonce.description }}
      </div>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn color="primary" label="Voir détails" @click="openAnnonce" />
    </q-card-actions>
  </q-card>
</template>

<style scoped>
.card-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.card-info {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 10px;
}

.card-city {
  color: #6b7280;
}

.card-description {
  margin-top: 6px;
}
.card:hover {
  transform: translateY(-2px);
  transition: 0.2s;
}
</style>
