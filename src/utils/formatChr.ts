import { formatUnits } from "viem"

const formatChr = (value: bigint) => formatUnits(value, 6)

export default formatChr
