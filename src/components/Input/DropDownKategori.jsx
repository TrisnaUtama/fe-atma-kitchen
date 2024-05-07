import React from "react";

function CategoryDropdown({
  value,
  onChange,
  options,
  placeholder,
  labelTitle,
}) {
  // Ensure that value is a scalar value when multiple is false
  const selectedValue =
    Array.isArray(value) && !Array.isArray(value[0]) ? value[0] : value;

  return (
    <div className="relative inline-block text-left mt-4 w-full">
      <label className="label">
        <span className={"label-text text-base-content text-lg"}>
          {labelTitle}
        </span>
      </label>
      <select
        value={selectedValue}
        onChange={onChange}
        className="select select-bordered w-full border bg-transparent px-4 py-3 pr-8 rounded-lg g">
        <option value="" className="bg-gray-800 text-lg">
          {placeholder}
        </option>
        {options.map((category, index) => (
          <option className="bg-gray-800 text-lg" key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryDropdown;
