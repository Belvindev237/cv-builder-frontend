export default function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-semibold mb-1" htmlFor={name}>
        {label}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
