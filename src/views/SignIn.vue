<template>
  <v-card class="elevation-12">
    <v-toolbar
      color="black"
      dark
      flat
    >
      <v-toolbar-title>Авторизация</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
      <v-form @submit.prevent="onSubmitHandler">
        <v-text-field
          label="Почта"
          name="email"
          prepend-icon="mdi-account"
          type="text"
          v-model="email"
          :error="$v.email.$invalid"
          :error-messages="emailErrorMessages"
        ></v-text-field>

        <v-text-field
          id="password"
          label="Пароль"
          name="password"
          prepend-icon="mdi-lock"
          type="password"
          v-model="password"
          :error="$v.password.$invalid"
          :error-messages="passwordErrorMessages"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="black"
        dark
        @click="submitHandler"
      >Войти</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  data: () => ({
    emailErrorMessages: [],
    passwordErrorMessages: []
  }),
  computed: {
    email: {
      get () {return this.$store.state.account.identity.email},
      set (value) { this.$store.commit('account/updateEmail', value) }
    },
    password: {
      get () { return this.$store.state.account.identity.password},
      set (value) { this.$store.commit('account/updatePassword', value)}
    },
  },
  watch: {
    email: function() {
      this.emailErrorMessages = []
      if (!this.$v.email.required) {
        this.emailErrorMessages.push('Поле объязательно для заполнения')
      }
      if (!this.$v.email.email) {
        this.emailErrorMessages.push('Поле должно содержать корректный адрес електронной почты')
      }
    },
    password: function() {
      this.passwordErrorMessages = []
      if (!this.$v.password.required) {
        this.passwordErrorMessages.push('Поле объязательно для заполнения')
      }
      if (!this.$v.password.minLength) {
        this.passwordErrorMessages.push(`Поле должно состоять из ${this.$v.password.$params.minLength.min} символов`)
      }
    }
  },
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6)}
  },
  methods: {
    async  submitHandler() {
      if (this.$v.$invalid) {
        return
      }

      try {
        await this.$store.dispatch('signIn/postSignInRequest')
        await this.$router.push('/dashboard')
      } catch (e) {
        console.log(e)
        throw e
      }

    }
  }
}
</script>
