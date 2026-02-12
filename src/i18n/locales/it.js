import feature from '../translations/common/features.json'
import footer from '../translations/common/footer.json'
import hero from '../translations/common/hero.json'
import nav from '../translations/common/nav.json'

import side_bar_progress from '../translations/common/side_bar_progress.json'
import login from '../translations/feautures/auth/login.json'
import register from '../translations/feautures/auth/register.json'
import competence from '../translations/feautures/cv_form/competence.json'
import education from '../translations/feautures/cv_form/education.json'
import experience from '../translations/feautures/cv_form/experience.json'
import person_info from '../translations/feautures/cv_form/person_info.json'
import resume from '../translations/feautures/cv_form/resume.json'
import langue from '../translations/feautures/cv_form/langue.json'
import label from '../translations/common/labels.json'
import global from '../translations/common/global.json'

import template1 from '../translations/feautures/template/template1.json'
import template2 from '../translations/feautures/template/template2.json'
import template3 from '../translations/feautures/template/template3.json'
import template4 from '../translations/feautures/template/template4.json'
import template5 from '../translations/feautures/template/template5.json'
import template6 from '../translations/feautures/template/template6.json'
import template7 from '../translations/feautures/template/template7.json'
import template8 from '../translations/feautures/template/template8.json'
import template9 from '../translations/feautures/template/template9.json'
import template10 from '../translations/feautures/template/template10.json'
import button from '../translations/common/buttons.json'
import validation from '../translations/validation/required.json'

import auth_page from '../translations/pages/auth_page.json'
import builder from '../translations/pages/builder.json'
import profil from '../translations/pages/profil.json'
import select_model from '../translations/pages/select_model.json'
import visualisation from '../translations/pages/visualisation.json'

export default{
  ...person_info.it,
  ...feature.it,
  ...footer.it,
  ...hero.it,
  ...nav.it,
  ...side_bar_progress.it,
  ...login.it,
  ...register.it,
  "button":{...button.it},
  "label":{...label.it},
  "validation":{...validation.it},
  ...global.it,
  ...template1.it,...template2.it,...template3.it,...template4.it,...template5.it,...template6.it,...template7.it,...template8.it,...template9.it,
  ...auth_page.it,...builder.it,...profil.it,...select_model.it,...visualisation.it,...template10.it,
  ...competence.it,
  ...resume.it,
  
  ...education.it,
  ...experience.it,
   "langue": { ...langue.it },

}