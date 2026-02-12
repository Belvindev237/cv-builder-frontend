import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-white border-t-4 border-blue-600">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-5">
            <div className="text-3xl font-black text-blue-400">
              {t('footer.brand.name')}
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('footer.brand.description')}
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-12 h-12 bg-gray-800 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-all transform hover:scale-110 shadow-lg"
              >
                <i className="fab fa-facebook-f text-xl"></i>
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-gray-800 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-all transform hover:scale-110 shadow-lg"
              >
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-gray-800 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-all transform hover:scale-110 shadow-lg"
              >
                <i className="fab fa-linkedin-in text-xl"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-5 text-white text-lg">
              {t('footer.sections.product.title')}
            </h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-blue-400 transition hover:translate-x-1 inline-block"
                >
                  → {t('footer.sections.product.links.templates')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-400 transition hover:translate-x-1 inline-block"
                >
                  → {t('footer.sections.product.links.examples')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-400 transition hover:translate-x-1 inline-block"
                >
                  → {t('footer.sections.product.links.pricing')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-5 text-white text-lg">
              {t('footer.sections.resources.title')}
            </h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-blue-400 transition hover:translate-x-1 inline-block"
                >
                  → {t('footer.sections.resources.links.blog')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-400 transition hover:translate-x-1 inline-block"
                >
                  → {t('footer.sections.resources.links.guides')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-400 transition hover:translate-x-1 inline-block"
                >
                  → {t('footer.sections.resources.links.support')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-5 text-white text-lg">
              {t('footer.sections.company.title')}
            </h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-blue-400 transition hover:translate-x-1 inline-block"
                >
                  → {t('footer.sections.company.links.about')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-400 transition hover:translate-x-1 inline-block"
                >
                  → {t('footer.sections.company.links.contact')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-400 transition hover:translate-x-1 inline-block"
                >
                  → {t('footer.sections.company.links.careers')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t-2 border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} {t('footer.brand.name')}. {t('footer.legal.copyright')}
          </p>
          <div className="flex gap-8 text-sm text-gray-400">
            <a href="#" className="hover:text-blue-400 transition">
              {t('footer.legal.links.legal')}
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              {t('footer.legal.links.privacy')}
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              {t('footer.legal.links.terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}