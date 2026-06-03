import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import './style.css'

import UploadHelpPage from './components/upload/UploadHelpPage.vue'
import SuiteUploadPage from './components/upload/SuiteUploadPage.vue'
import MySekaiUploadPage from './components/upload/MySekaiUploadPage.vue'
import MsrPage from './components/upload/MsrPage.vue'
import ApplyPage from './components/apply/ApplyPage.vue'
import ReviewPage from './components/apply/ReviewPage.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('UploadHelpPage', UploadHelpPage)
    app.component('SuiteUploadPage', SuiteUploadPage)
    app.component('MySekaiUploadPage', MySekaiUploadPage)
    app.component('MsrPage', MsrPage)
    app.component('ApplyPage', ApplyPage)
    app.component('ReviewPage', ReviewPage)
  }
}
