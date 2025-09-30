export default function SelectList({
  SelectListData = [],
  valueKey,
  labelKey,
  onChange,
  value,
  name,
}) {
  console.log("SelectListData", SelectListData);
  console.log("value", value);
  console.log("name", name);
  return (
    <select name={name} value={value} onChange={onChange}>
      <option value="">-- Select --</option>
      {SelectListData.map((item, index) => (
        <option key={index} value={item[valueKey]}>
          {item[labelKey]}
        </option>
      ))}
    </select>
  );
}
