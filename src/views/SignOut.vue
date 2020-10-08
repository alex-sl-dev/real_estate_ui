<template>

</template>

<script>
export default {
  name: 'SignOut',
  async mounted () {
    await this.$store.dispatch('auth/sign_out')
    this.$router.push('/')
  }
}
</script>
