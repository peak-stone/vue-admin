import Vue from 'vue'
import VueI18n from 'vue-i18n'
import assigndeep from 'assign-deep'
import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'
import enLocale from './en'
import zhLocale from './zh'

const defaults = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  }
}

let i18n

export function i18nInit (userConfigs = {}) {
  Vue.use(VueI18n)

  const messages = assigndeep({}, defaults, userConfigs)

  i18n = new VueI18n({
    // set locale
    // options: en or zh
    locale: localStorage.getItem('language') || 'zh',
    // fallback localization
    fallbackLocale: 'zh',
    // set locale messages
    messages
  })

  return i18n
}

export function i18nUpdate (userConfigs = {}) {
  const messages = assigndeep({}, defaults, userConfigs)

  for (let lang of Object.keys(messages)) {
    i18n.setLocaleMessage(lang, messages[lang])
  }

  // 刷新本地语言
  const lang = localStorage.getItem('language')
  const langs = Object.keys(i18n.messages)
  const tmpLang = langs.find(item => item !== lang) || ''
  i18n.locale = tmpLang
  i18n.locale = lang

  return i18n
}
