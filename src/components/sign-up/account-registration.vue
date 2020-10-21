<template>

  <v-card class="elevation-12">

    <v-toolbar color="black" dark flat>
      <v-toolbar-title>Регистрация</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-card-text>

      <v-form v-if="currentFormStage===FILL_EMAIL">

        <v-text-field
          label="Почта"
          name="email"
          prepend-icon="mdi-mail"
          type="text"
          v-model="email"
          :error="$v.email.$invalid"
          :error-messages="emailErrorMessages"
        ></v-text-field>

      </v-form>

      <v-form v-if="currentFormStage===FILL_EMAIL_VERIFICATION_CODE">
        <p>
          Мы отправили вам письмо с кодом, пожалуйста, проверьте свой почтовый ящик.
        </p>

        <v-text-field
          id="code"
          label="Код подтверждения"
          name="verification-code"
          prepend-icon="mdi-lock"
          v-model="verificationCode"
          :error="$v.verificationCode.$invalid"
          :error-messages="verificationErrorMessages"
        ></v-text-field>

      </v-form>

      <v-form v-if="currentFormStage===FILL_PROFILE">

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
          readonly
          v-model="email"
          :error="$v.email.$invalid || emailInUse"
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
        :disabled="submitActionRestriction"
        @click="submitHandler"
      >{{submitActionLabel}}</v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
import {required, email, numeric, minLength, integer} from 'vuelidate/lib/validators'
import axios from 'axios'
import {API_HOST} from '@/config'
import {FILL_EMAIL, FILL_PROFILE, FILL_EMAIL_VERIFICATION_CODE } from  "@/store/sign-up"

export default {
  name: 'account-registration-component',
  data: () => ({
    FILL_EMAIL_VERIFICATION_CODE: FILL_EMAIL_VERIFICATION_CODE,
    FILL_PROFILE: FILL_PROFILE,
    FILL_EMAIL: FILL_EMAIL,

    emailErrorMessages: [],

    verificationErrorMessages: [],

    firstNameErrorMessages: [],
    lastNameErrorMessages: [],
    phoneErrorMessages: [],
    passwordErrorMessages: [],

    showPassword: false
  }),
  computed: {
    submitActionRestriction () { return this.$v.$invalid },
    currentFormStage () { return this.$store.getters["signUp/formStep"]},
    submitActionLabel (){
      if (this.currentFormStage === FILL_PROFILE) {
        return 'Зарегистрироваться'
      }

      return 'Подтвердить'
    },
    // identity
    email: {
      get () {return this.$store.state.account.identity.email},
      set (value) { this.$store.commit('account/updateEmail', value) }
    },
    password: {
      get () { return this.$store.state.account.identity.password},
      set (value) { this.$store.commit('account/updatePassword', value)}
    },
    // signUp
    emailInUse: {
      get () { return this.$store.state.signUp.emailInUse },
      set (value) { this.$store.commit('signUp/updateEmailInUse', value) }
    },
    verificationCode: {
      get () { return this.$store.state.signUp.verificationCode},
      set (value) { this.$store.commit('signUp/updateVerificationCode', value)}
    },
    // profile
    firstName: {
      get () { return this.$store.state.account.profile.firstName},
      set (value) { this.$store.commit('account/updateFirstName', value)}
    },
    lastName: {
      get () { return this.$store.state.account.profile.lastName},
      set (value) { this.$store.commit('account/updateLastName', value)}
    },
    phone: {
      get () { return this.$store.state.account.profile.phone},
      set (value) { this.$store.commit('account/updatePhone', value)}
    },
  },
  created() {
  },
  watch: {
    emailInUse: function (){
      console.log('this')
      this.emailErrorMessages = []
      if (this.emailInUse ){
        this.emailErrorMessages.push('этот адрес электронной почты уже зарегистрирован')
      }
    },
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
  validations: function (){
    if (this.currentFormStage === FILL_PROFILE) {
      return {
        firstName: {required, minLength: minLength(3)},
        lastName: {required, minLength: minLength(2)},
        phone: {required, numeric, minLength: minLength(10)},
        email: {email, required},
        password: {required, minLength: minLength(6)}
      }
    }
    if (this.currentFormStage === FILL_EMAIL) {
      return {
        email: {email, required},
      }
    }
    if (this.currentFormStage === FILL_EMAIL_VERIFICATION_CODE) {
      return {
        verificationCode: {required, integer},
      }
    }
  },
  methods: {
    submitHandler() {
      // first step
      if (this.$v.$invalid) {
        return
      }

      switch (this.currentFormStage) {
        case FILL_EMAIL:
          this.$store.dispatch('signUp/postValidateEmailRequest')
          break;
        case FILL_EMAIL_VERIFICATION_CODE:
          this.$store.dispatch('signUp/verifyEmailCode')
          break;
        case FILL_PROFILE:
          this.$store.dispatch('signUp/postSignUpRequest').then( function () {
            this.$router.push('/dashboard')
          })
          break;
      }
    }
  }
}
</script>

