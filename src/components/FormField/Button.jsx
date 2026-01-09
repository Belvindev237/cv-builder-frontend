export default function Button({
  text,
  onClick,
  variant = "default",
  className = "",
}) {
  // Styles communs à tous les boutons
  const baseStyles =
    "px-6 py-3 rounded-lg font-semibold shadow-lg transition-all transform hover:-translate-y-1";

  // Définir les couleurs selon le variant
  let colorStyles = "";
  switch (variant) {
    case "prev":
      colorStyles = "bg-green-600 text-white hover:bg-green-700";
      break;
    case "next":
      colorStyles = "bg-blue-600 text-white hover:bg-blue-700";
      break;
    default:
      colorStyles = "bg-gray-200 text-black hover:bg-gray-300";
  }

  return (
    <button
      className={`${baseStyles} ${colorStyles} ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
