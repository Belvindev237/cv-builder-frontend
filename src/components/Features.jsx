//import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Features() {
  const Navigate = useNavigate();
  return (
    <section className="bg-white py-20">
      <h2 className="text-4xl font-bold text-center text-blue-600 mb-14">
        Un CV efficace, prêt à impressionner en quelques minutes.
      </h2>

      <div className="max-w-6xl mx-auto px-2 sm:px-4 lg:px-0 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="bg-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-lg transition">
          <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
            {/*<span className="text-blue-600 text-2xl">⚡</span>*/}
            <i className="fa-solid fa-bolt text-blue-600 text-3xl"></i>
          </div>
          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            Facile à utiliser
          </h3>
          <p className="text-gray-600">
            Un éditeur intuitif pour créer votre CV rapidement et sans effort.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-lg transition">
          <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
            <i class="fa-regular fa-file-lines text-blue-600 text-3xl"></i>
          </div>
          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            Modèles professionnels
          </h3>
          <p className="text-gray-600">
            Des modèles modernes et professionnels adaptés à tous les métiers.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-lg transition">
          <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
            <i className="fa-solid fa-share-nodes text-blue-600 text-3xl"></i>
          </div>
          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            Partage rapide
          </h3>
          <p className="text-gray-600">
            Téléchargez ou partagez votre CV en un clic.
          </p>
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <button
          className="bg-black hover:bg-gray-500 text-white font-bold px-8 py-4 rounded-lg shadow-lg transition-all transform hover:-translate-y-1"
          onClick={() => Navigate("/builder")}
        >
          COMMENCER MAINTENANT
        </button>
      </div>
    </section>
  );
}
