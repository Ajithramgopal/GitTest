import useApi from "./useApi";

export default function FetchBlock({ blockId }) {
  const { data: blockData = [] } = useApi("block");

  const block = blockData.find((item) => item.blockId === blockId);

  // Fallback if not found
  const blockName = block ? block.blockName : "N/A";

  return <input type="text" value={blockName} readOnly />;
}
