<template>
  <button class="btn btn-primary" @click="openModal('new')">
      建立新的產品
  </button>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    openModal (isNew) {
      this.$emit('openNewModal', isNew)
    }
  }
}
</script>
