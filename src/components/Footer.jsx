export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="max-w-6xl mx-auto px-4 py-6 text-center">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Mon Application de CV. Tous droits
          réservés.
        </p>
      </div>
    </footer>
  );
}
