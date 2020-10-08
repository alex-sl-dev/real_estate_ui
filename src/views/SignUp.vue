<template>

  <v-card class="elevation-12">
    <v-toolbar
      color="black"
      dark
      flat
    >
      <v-toolbar-title>Регистрация</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
      <v-form @submit.prevent="onSubmitHandler">

        <v-text-field
          label="Имя"
          name="firstName"
          prepend-icon="mdi-account"
          type="text"
          v-model="firstName"
          :error="$v.firstName.$invalid"
          :error-messages="firstNameErrorMessages"
        ></v-text-field>

        <v-text-field
          label="Фамилия"
          name="lastName"
          prepend-icon="mdi-account"
          type="text"
          v-model="lastName"
          :error="$v.lastName.$invalid"
          :error-messages="lastNameErrorMessages"
        ></v-text-field>

        <v-text-field
          label="Телефон"
          name="phone"
          prepend-icon="mdi-phone"
          type="text"
          v-model="phone"
          :error="$v.phone.$invalid"
          :error-messages="phoneErrorMessages"
        ></v-text-field>

        <v-text-field
          label="Почта"
          name="email"
          prepend-icon="mdi-mail"
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
          v-model="password"
          :error="$v.password.$invalid"
          :error-messages="passwordErrorMessages"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="black"
        dark
        @click="submitHandler"
      >Зарегистрироваться</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { required, email, numeric, minLength } from 'vuelidate/lib/validators'
import axios from 'axios'

export default {
  name: 'sigup',
  data: () => ({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    firstNameErrorMessages: [],
    lastNameErrorMessages: [],
    phoneErrorMessages: [],
    emailErrorMessages: [],
    passwordErrorMessages: [],
    showPassword: false
  }),
  computed: {
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
    firstName: { required, minLength: minLength(3) },
    lastName: { required, minLength: minLength(2) },
    phone: { required, numeric, minLength: minLength(10) },
    email: { email, required },
    password: { required, minLength: minLength(6) }
  },
  methods: {
    async  submitHandler() {
      if (this.$v.$invalid) {
        return
      }

      const formData = {
        first_name: this.firstName,
        last_name: this.lastName,
        phone: parseInt(this.phone),
        email: this.email,
        password: this.password,
        role: 1
      }

      try {
        await axios
          .post('http://localhost:8084/sign-up', formData)
          .then(response => {
            //localStorage.setItem("auth-token", response.token);
            //axios.defaults.headers.common['Authorization'] = resp.token

            if (response.status === 400 || response.status === 500){
              console.log('Error')
              return
            }

            if (response.data.includes('duplicate key')) {
              this.emailErrorMessages.push('В системе зарегистрирован пользователь с таким адресом почты')
              return
            }

            this.$router.push('/dashboard')
          })
      } catch (e) {
        console.log(e)
      }

    }
  }
}
</script>

