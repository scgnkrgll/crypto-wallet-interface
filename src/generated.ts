import {
  useNetwork,
  useChainId,
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  Address,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractEvent,
  UseContractEventConfig,
} from 'wagmi'
import {
  ReadContractResult,
  WriteContractMode,
  PrepareWriteContractResult,
} from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CHR
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 */
export const chrABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: 'theTotalSupply', internalType: 'uint256', type: 'uint256' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'refID',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TransferFromNative',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TransferToNative',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'subtractedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'addedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'refID', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'transferFromNative',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'bytes32', type: 'bytes32' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferToNative',
    outputs: [],
  },
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 */
export const chrAddress = {
  1: '0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2',
  97: '0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 */
export const chrConfig = { address: chrAddress, abi: chrABI } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link chrABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 */
export function useChrRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof chrABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof chrABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > & { chainId?: keyof typeof chrAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: chrABI,
    address: chrAddress[chainId as keyof typeof chrAddress],
    ...config,
  } as UseContractReadConfig<typeof chrABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link chrABI}__ and `functionName` set to `"allowance"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 */
export function useChrAllowance<
  TFunctionName extends 'allowance',
  TSelectData = ReadContractResult<typeof chrABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof chrABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof chrAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: chrABI,
    address: chrAddress[chainId as keyof typeof chrAddress],
    functionName: 'allowance',
    ...config,
  } as UseContractReadConfig<typeof chrABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link chrABI}__ and `functionName` set to `"balanceOf"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 */
export function useChrBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof chrABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof chrABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof chrAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: chrABI,
    address: chrAddress[chainId as keyof typeof chrAddress],
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof chrABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link chrABI}__ and `functionName` set to `"decimals"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 */
export function useChrDecimals<
  TFunctionName extends 'decimals',
  TSelectData = ReadContractResult<typeof chrABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof chrABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof chrAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: chrABI,
    address: chrAddress[chainId as keyof typeof chrAddress],
    functionName: 'decimals',
    ...config,
  } as UseContractReadConfig<typeof chrABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link chrABI}__ and `functionName` set to `"getOwner"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 */
export function useChrGetOwner<
  TFunctionName extends 'getOwner',
  TSelectData = ReadContractResult<typeof chrABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof chrABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof chrAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: chrABI,
    address: chrAddress[chainId as keyof typeof chrAddress],
    functionName: 'getOwner',
    ...config,
  } as UseContractReadConfig<typeof chrABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link chrABI}__ and `functionName` set to `"name"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 */
export function useChrName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof chrABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof chrABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof chrAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: chrABI,
    address: chrAddress[chainId as keyof typeof chrAddress],
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof chrABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link chrABI}__ and `functionName` set to `"owner"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 */
export function useChrOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof chrABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof chrABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof chrAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: chrABI,
    address: chrAddress[chainId as keyof typeof chrAddress],
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof chrABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link chrABI}__ and `functionName` set to `"symbol"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 */
export function useChrSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof chrABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof chrABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof chrAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: chrABI,
    address: chrAddress[chainId as keyof typeof chrAddress],
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof chrABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link chrABI}__ and `functionName` set to `"totalSupply"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 */
export function useChrTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof chrABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof chrABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof chrAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: chrABI,
    address: chrAddress[chainId as keyof typeof chrAddress],
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof chrABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link chrABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 */
export function useChrWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof chrAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof chrABI, string>['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<typeof chrABI, TFunctionName, TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof chrABI, TFunctionName, TMode>({
    abi: chrABI,
    address: chrAddress[chainId as keyof typeof chrAddress],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link chrABI}__ and `functionName` set to `"approve"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 */
export function useChrApprove<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof chrAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof chrABI, 'approve'>['request']['abi'],
        'approve',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'approve' }
    : UseContractWriteConfig<typeof chrABI, 'approve', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'approve'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof chrABI, 'approve', TMode>({
    abi: chrABI,
    address: chrAddress[chainId as keyof typeof chrAddress],
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link chrABI}__ and `functionName` set to `"decreaseAllowance"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 */
export function useChrDecreaseAllowance<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof chrAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof chrABI,
          'decreaseAllowance'
        >['request']['abi'],
        'decreaseAllowance',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'decreaseAllowance'
      }
    : UseContractWriteConfig<typeof chrABI, 'decreaseAllowance', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'decreaseAllowance'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof chrABI, 'decreaseAllowance', TMode>({
    abi: chrABI,
    address: chrAddress[chainId as keyof typeof chrAddress],
    functionName: 'decreaseAllowance',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link chrABI}__ and `functionName` set to `"increaseAllowance"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 */
export function useChrIncreaseAllowance<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof chrAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof chrABI,
          'increaseAllowance'
        >['request']['abi'],
        'increaseAllowance',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'increaseAllowance'
      }
    : UseContractWriteConfig<typeof chrABI, 'increaseAllowance', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'increaseAllowance'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof chrABI, 'increaseAllowance', TMode>({
    abi: chrABI,
    address: chrAddress[chainId as keyof typeof chrAddress],
    functionName: 'increaseAllowance',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link chrABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 */
export function useChrRenounceOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof chrAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof chrABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      }
    : UseContractWriteConfig<typeof chrABI, 'renounceOwnership', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof chrABI, 'renounceOwnership', TMode>({
    abi: chrABI,
    address: chrAddress[chainId as keyof typeof chrAddress],
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link chrABI}__ and `functionName` set to `"transfer"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 */
export function useChrTransfer<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof chrAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof chrABI, 'transfer'>['request']['abi'],
        'transfer',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'transfer' }
    : UseContractWriteConfig<typeof chrABI, 'transfer', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transfer'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof chrABI, 'transfer', TMode>({
    abi: chrABI,
    address: chrAddress[chainId as keyof typeof chrAddress],
    functionName: 'transfer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link chrABI}__ and `functionName` set to `"transferFrom"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 */
export function useChrTransferFrom<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof chrAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof chrABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'transferFrom'
      }
    : UseContractWriteConfig<typeof chrABI, 'transferFrom', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferFrom'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof chrABI, 'transferFrom', TMode>({
    abi: chrABI,
    address: chrAddress[chainId as keyof typeof chrAddress],
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link chrABI}__ and `functionName` set to `"transferFromNative"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 */
export function useChrTransferFromNative<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof chrAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof chrABI,
          'transferFromNative'
        >['request']['abi'],
        'transferFromNative',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'transferFromNative'
      }
    : UseContractWriteConfig<typeof chrABI, 'transferFromNative', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferFromNative'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof chrABI, 'transferFromNative', TMode>({
    abi: chrABI,
    address: chrAddress[chainId as keyof typeof chrAddress],
    functionName: 'transferFromNative',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link chrABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 */
export function useChrTransferOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof chrAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof chrABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'transferOwnership'
      }
    : UseContractWriteConfig<typeof chrABI, 'transferOwnership', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof chrABI, 'transferOwnership', TMode>({
    abi: chrABI,
    address: chrAddress[chainId as keyof typeof chrAddress],
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link chrABI}__ and `functionName` set to `"transferToNative"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 */
export function useChrTransferToNative<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof chrAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof chrABI,
          'transferToNative'
        >['request']['abi'],
        'transferToNative',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'transferToNative'
      }
    : UseContractWriteConfig<typeof chrABI, 'transferToNative', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferToNative'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof chrABI, 'transferToNative', TMode>({
    abi: chrABI,
    address: chrAddress[chainId as keyof typeof chrAddress],
    functionName: 'transferToNative',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link chrABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 */
export function usePrepareChrWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof chrABI, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof chrAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: chrABI,
    address: chrAddress[chainId as keyof typeof chrAddress],
    ...config,
  } as UsePrepareContractWriteConfig<typeof chrABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link chrABI}__ and `functionName` set to `"approve"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 */
export function usePrepareChrApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof chrABI, 'approve'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof chrAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: chrABI,
    address: chrAddress[chainId as keyof typeof chrAddress],
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof chrABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link chrABI}__ and `functionName` set to `"decreaseAllowance"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 */
export function usePrepareChrDecreaseAllowance(
  config: Omit<
    UsePrepareContractWriteConfig<typeof chrABI, 'decreaseAllowance'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof chrAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: chrABI,
    address: chrAddress[chainId as keyof typeof chrAddress],
    functionName: 'decreaseAllowance',
    ...config,
  } as UsePrepareContractWriteConfig<typeof chrABI, 'decreaseAllowance'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link chrABI}__ and `functionName` set to `"increaseAllowance"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 */
export function usePrepareChrIncreaseAllowance(
  config: Omit<
    UsePrepareContractWriteConfig<typeof chrABI, 'increaseAllowance'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof chrAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: chrABI,
    address: chrAddress[chainId as keyof typeof chrAddress],
    functionName: 'increaseAllowance',
    ...config,
  } as UsePrepareContractWriteConfig<typeof chrABI, 'increaseAllowance'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link chrABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 */
export function usePrepareChrRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof chrABI, 'renounceOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof chrAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: chrABI,
    address: chrAddress[chainId as keyof typeof chrAddress],
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof chrABI, 'renounceOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link chrABI}__ and `functionName` set to `"transfer"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 */
export function usePrepareChrTransfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof chrABI, 'transfer'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof chrAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: chrABI,
    address: chrAddress[chainId as keyof typeof chrAddress],
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof chrABI, 'transfer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link chrABI}__ and `functionName` set to `"transferFrom"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 */
export function usePrepareChrTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof chrABI, 'transferFrom'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof chrAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: chrABI,
    address: chrAddress[chainId as keyof typeof chrAddress],
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof chrABI, 'transferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link chrABI}__ and `functionName` set to `"transferFromNative"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 */
export function usePrepareChrTransferFromNative(
  config: Omit<
    UsePrepareContractWriteConfig<typeof chrABI, 'transferFromNative'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof chrAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: chrABI,
    address: chrAddress[chainId as keyof typeof chrAddress],
    functionName: 'transferFromNative',
    ...config,
  } as UsePrepareContractWriteConfig<typeof chrABI, 'transferFromNative'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link chrABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 */
export function usePrepareChrTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof chrABI, 'transferOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof chrAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: chrABI,
    address: chrAddress[chainId as keyof typeof chrAddress],
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof chrABI, 'transferOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link chrABI}__ and `functionName` set to `"transferToNative"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 */
export function usePrepareChrTransferToNative(
  config: Omit<
    UsePrepareContractWriteConfig<typeof chrABI, 'transferToNative'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof chrAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: chrABI,
    address: chrAddress[chainId as keyof typeof chrAddress],
    functionName: 'transferToNative',
    ...config,
  } as UsePrepareContractWriteConfig<typeof chrABI, 'transferToNative'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link chrABI}__.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 */
export function useChrEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof chrABI, TEventName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof chrAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: chrABI,
    address: chrAddress[chainId as keyof typeof chrAddress],
    ...config,
  } as UseContractEventConfig<typeof chrABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link chrABI}__ and `eventName` set to `"Approval"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 */
export function useChrApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof chrABI, 'Approval'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof chrAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: chrABI,
    address: chrAddress[chainId as keyof typeof chrAddress],
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof chrABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link chrABI}__ and `eventName` set to `"OwnershipTransferred"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 */
export function useChrOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof chrABI, 'OwnershipTransferred'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof chrAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: chrABI,
    address: chrAddress[chainId as keyof typeof chrAddress],
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof chrABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link chrABI}__ and `eventName` set to `"Transfer"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 */
export function useChrTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof chrABI, 'Transfer'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof chrAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: chrABI,
    address: chrAddress[chainId as keyof typeof chrAddress],
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof chrABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link chrABI}__ and `eventName` set to `"TransferFromNative"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 */
export function useChrTransferFromNativeEvent(
  config: Omit<
    UseContractEventConfig<typeof chrABI, 'TransferFromNative'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof chrAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: chrABI,
    address: chrAddress[chainId as keyof typeof chrAddress],
    eventName: 'TransferFromNative',
    ...config,
  } as UseContractEventConfig<typeof chrABI, 'TransferFromNative'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link chrABI}__ and `eventName` set to `"TransferToNative"`.
 *
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 * - [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2)
 */
export function useChrTransferToNativeEvent(
  config: Omit<
    UseContractEventConfig<typeof chrABI, 'TransferToNative'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof chrAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: chrABI,
    address: chrAddress[chainId as keyof typeof chrAddress],
    eventName: 'TransferToNative',
    ...config,
  } as UseContractEventConfig<typeof chrABI, 'TransferToNative'>)
}
