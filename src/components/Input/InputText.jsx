import { useState } from "react";

function InputText({
  labelTitle,
  type,
  containerStyle,
  defaultValue,
  placeholder,
  updateFormValue,
  updateType,
}) {
  const [value, setValue] = useState(defaultValue);

  const updateInputValue = (val) => {
    setValue(val);
    updateFormValue({ updateType, value: val });
  };

  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <label className="label">
        <span className={"label-text text-base-content text-lg"}>
          {labelTitle}
        </span>
      </label>
      <input
        type={type || "text"}
        value={value || ""}
        placeholder={placeholder || ""}
        onChange={(e) => updateInputValue(e.target.value)}
        className="input input-bordered w-full border bg-transparent px-4 py-3.5 pr-8 rounded-lg "
      />
    </div>
  );
}

export default InputText;
