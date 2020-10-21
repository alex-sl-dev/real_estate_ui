import * as axios from "axios";
import {API_HOST} from "@/config";

export const FILL_EMAIL = 'fill-email';
export const FILL_EMAIL_VERIFICATION_CODE = 'fill-email-verification-code';
export const FILL_PROFILE = 'fill-profile';

const STAGES = [
  FILL_EMAIL,
  FILL_EMAIL_VERIFICATION_CODE,
  FILL_PROFILE,
];

export default {
  namespaced: true,
  state: {
    formStep: FILL_EMAIL,
    verificationCode: 0,
    verificationCodeReference: 0,
    emailInUse: false,
  },
  getters: {
    formStep: (state) => state.formStep,
  },
  setters: {

  },
  actions: {
    nextFormStep({dispatch, commit, getters}) {
      for (let i = 0; i <= STAGES.length; i++) {
        if (getters.formStep === STAGES[i] && getters.formStep !== FILL_PROFILE) {
          commit('updateFormStep', STAGES[i+1])
          return
        }
      }
    },
    async verifyEmailCode(context){
      if (context.state.verificationCode === context.state.verificationCodeReference) {
        await context.dispatch('nextFormStep')
      }
    },
    async postSignUpRequest(context){
      try {
        await context.dispatch('setLoadingStatus', true, {root: true})
        let payload = {
          'first_name': context.rootGetters["account/profile"].lastName,
          'last_name': context.rootGetters["account/profile"].lastName,
          'phone': context.rootGetters["account/profile"].phone,

          'role': context.rootGetters["account/identity"].role,
          'email': context.rootGetters["account/identity"].email,
          'password': context.rootGetters["account/identity"].password,
        }
        await axios.post(`${API_HOST}/account/sign-up`, payload).then(response => {
          if (response.status === 201) {
            context.dispatch('setLoadingStatus', false, {root: true})
            context.dispatch('signIn/postSignInRequest', {}, {root: true})
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    async postValidateEmailRequest(context){
      try {
        context.commit('updateEmailInUse', false)
        await context.dispatch('setLoadingStatus', true, {root: true})
        let payload = {
          'email': context.rootGetters["account/identity"].email
        }
        await axios.post(`${API_HOST}/account/confirm-email`, payload).then(response => {
          // console.log(response)
          context.dispatch('setLoadingStatus', false, {root: true})
          if (response.status === 200 && response.data['email-status'] === "OK") {
            context.dispatch('nextFormStep')
            context.commit('updateVerificationCodeReference', response.data.code)
            context.commit('updateEmailInUse', false)
          }
          if (response.status === 200 && response.data['email-status'] === "Email already registered") {
            context.commit('updateEmailInUse', true)
          }
        })
      } catch (e) {
        await context.dispatch('setLoadingStatus', false, {root: true})
        console.log(e)
        throw e
      }
    },
  },
  mutations: {
    updateFormStep: (state, newStage) => state.formStep = newStage,
    updateEmailInUse: (state, value) => state.emailInUse = value,
    updateVerificationCode: (state, value) => state.verificationCode = value,
    updateVerificationCodeReference: (state, value) => state.verificationCodeReference = value,
  }
}
