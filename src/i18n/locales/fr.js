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
import label from '../translations/common/labels.json'
import global from '../translations/common/global.json'
import validation from '../translations/validation/required.json'

import auth_page from '../translations/pages/auth_page.json'
import builder from '../translations/pages/builder.json'
import profil from '../translations/pages/profil.json'
import select_model from '../translations/pages/select_model.json'
import visualisation from '../translations/pages/visualisation.json'


export default{
  ...person_info.fr,
  ...feature.fr,
  ...footer.fr,
  ...hero.fr,
  ...nav.fr,
  ...side_bar_progress.fr,
  ...login.fr,
  ...register.fr,
  ...competence.fr,
  "langue": { ...langue.fr },
  "button":{...button.fr},
  "label":{...label.fr},
  "validation":{...validation.fr},
  ...global.fr,
  ...resume.fr,
  ...template1.fr,...template2.fr,...template3.fr,...template4.fr,...template5.fr,...template6.fr,...template7.fr,...template8.fr,...template9.fr,...template10.fr,
  ...auth_page.fr,...builder.fr,...profil.fr,...select_model.fr,...visualisation.fr,
  ...education.fr,
  ...experience.fr,
  

}