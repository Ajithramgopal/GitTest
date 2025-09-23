import useApi from "./useApi";

export default function FetchFlat({ flatId }) {
  const { data: flatData = [] } = useApi("flat");

  const flat = flatData.find((item) => item.flatId === flatId);

  return <input type="text" value={flat ? flat.flatName : "N/A"} readOnly />;
}
