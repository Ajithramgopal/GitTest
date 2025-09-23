import useApi from "./useApi";

export default function FetchBlk({ blockId }) {
  const { data: blockData = [] } = useApi("block");

  const block = blockData.find((item) => item.blockId === blockId);

  // Fallback if not found
  const blockName = block ? block.blockName : "N/A";

  return { blockName };
}
