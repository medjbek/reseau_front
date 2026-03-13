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
  <q-card class="q-mb-md">
    <q-card-section>
      <div class="text-h6">
        {{ annonce.title }}
      </div>

      <div class="text-caption text-orange">
        {{ annonce.category?.name }}
      </div>

      <div class="text-grey">
        {{ annonce.city }}
      </div>

      <div class="q-mt-sm">
        {{ annonce.description }}
      </div>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn color="primary" label="Voir détails" @click="openAnnonce" />
    </q-card-actions>
  </q-card>
</template>
