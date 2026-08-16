function FormInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  icon: Icon,
  required = false,
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        )}

        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full border border-slate-300 rounded-lg py-3 pr-4 outline-none focus:ring-2 focus:ring-blue-500 ${
            Icon ? "pl-10" : "pl-4"
          }`}
        />
      </div>
    </div>
  );
}

export default FormInput;