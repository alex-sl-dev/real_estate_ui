<template>

  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <v-card :loading="loading">
          <v-card-title class="display-2 font-weight-light">
            Редактирование профиля
          </v-card-title>

          <v-card-subtitle class="subtitle-1 font-weight-light">
            Ваш профайл - ваша визитка в объявлениях
          </v-card-subtitle>

          <v-form v-if="identity">
            <v-container class="py-0">
              <v-row>
                <v-col
                  cols="12"
                  md="12"
                >
                  <v-radio-group
                    row
                    v-model="role"
                  >
                    <v-radio
                      label="Частное лицо"
                      value=1
                      id="a"
                    ></v-radio>
                    <v-radio
                      label="Риелтор"
                      value="2"
                      id="b"
                    ></v-radio>
                    <v-radio
                      label="Юридическое лицо"
                      value="3"
                    ></v-radio>
                  </v-radio-group>
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    label="Имя"
                    class="purple-input"
                    v-model="first_name"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    label="Фамилия"
                    class="purple-input"
                    v-model="last_name"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    label="Телефон"
                    class="purple-input"
                    v-model="phone"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    label="Электронная почта"
                    class="purple-input"
                    v-model="email"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="12"
                >
                  <v-text-field
                    label="Компания"
                    disabled
                    v-model="company"
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    label="Адрес"
                    class="purple-input"
                    v-model="address"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="Город"
                    class="purple-input"
                    v-model="city"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="Страна"
                    class="purple-input"
                    v-model="country"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    class="purple-input"
                    label="Почтовый индекс"
                    type="number"
                    v-model="post_index"
                  />
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    class="purple-input"
                    label="Обо мне"
                    v-model="about_me"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="12"
                >
                  <v-file-input
                    ref="avatar"
                    v-on:change="handleAvatarUpload()"
                    v-model="avatar"
                    truncate-length="25"
                    label="Фото"
                  ></v-file-input>
                </v-col>

                <v-col
                  cols="12"
                  md="12"
                  v-if="avatar"
                >
                  <v-avatar
                    color="primary"
                    size="56"
                  >
                    <img
                      :src="avatarUrl"
                      :alt="firstName"
                    >
                  </v-avatar>
                </v-col>

                <v-col cols="12">
                  <v-checkbox
                    label="Сменить пароль"
                    v-model="want_cange_password"
                  ></v-checkbox>
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    label="Прежний пароль"
                    class="purple-input"
                    v-model="password"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    label="Новый пароль"
                    v-model="newPassword"
                  />
                </v-col>


                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    color="primary"
                    class="mr-0"
                    v-on:click="handleProfileForm()"
                  >
                    Обновить профиль
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        md="4"
      >
        <v-card
          elevation='0'
          class="v-card-profile"
          avatar="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"
        >
          <v-card-text class="text-center">
            <h6 class="display-1 mb-1 grey--text">
              CEO / CO-FOUNDER
            </h6>

            <h4 class="display-2 font-weight-light mb-3 black--text">
              Alec Thompson
            </h4>

            <p class="font-weight-light grey--text">
              Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...
            </p>

            <v-btn
              color="success"
              rounded
              class="mr-0"
            >
              Follow
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { required, email, numeric, minLength } from 'vuelidate/lib/validators'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'Profile',
  data: () => ({
    firstNameErrorMessages: [],
    lastNameErrorMessages: [],
    phoneErrorMessages: [],
    emailErrorMessages: [],
    passwordErrorMessages: [],
    //
    showPassword: false,
  }),
  watch: {
    ['user.role']: function() {
      console.log(this)
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
  validations: {
    firstName: { required, minLength: minLength(3) },
    lastName: { required, minLength: minLength(2) },
    phone: { required, numeric, minLength: minLength(10) },
    email: { email, required },
    password: { required, minLength: minLength(6) }
  },
  computed: {
    ...mapGetters('account', ['identity', 'profile']),
    // identity
    email: {
      get () {return this.$store.state.account.identity.email},
      set (value) { this.$store.commit('account/updateEmail', value) }
    },
    password: {
      get () { return this.$store.state.account.identity.password},
      set (value) { this.$store.commit('account/updatePassword', value)}
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
    ...mapState(['loading']),
    ...mapGetters('account', ['identity', 'profile'])
  },
  mounted () {
    this.getAccountRequest()
    console.log(this.$config)
    this.avatarUrl = this.$config.apiUrl + this.$config.staticPath + '/' + this.profile.avatar
  },
  methods: {
    ...mapActions('account', ['getAccountRequest']),
    handleProfileForm() {
      this.$store.dispatch('profile/SAVE_PROFILE')
    },
    handleAvatarUpload(e){
      this.user.avatar = this.avatar
    }
  },
}
</script>
