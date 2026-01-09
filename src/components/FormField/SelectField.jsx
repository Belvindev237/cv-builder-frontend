export default function SelectField({
  label,
  name,
  value,
  onChange,
  options = [],
}) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-semibold mb-1" htmlFor={name}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Sélectionnez</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
