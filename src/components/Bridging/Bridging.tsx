import { Link, ImmutableXClient, ImmutableMethodResults, ERC721TokenType, ETHTokenType, ImmutableRollupStatus  } from '@imtbl/imx-sdk';
import { useEffect, useState } from 'react';
require('dotenv').config();

interface BridgingProps {
    imxLink: Link,
    walletAddress: string,
    apiClient: ImmutableXClient
}

const Bridging = (props: BridgingProps) => {
    // withdrawals
    const [preparingWithdrawals, setPreparingWithdrawals] = useState<ImmutableMethodResults.ImmutableGetWithdrawalsResult>(Object);
    const [readyWithdrawals, setReadyWithdrawals] = useState<ImmutableMethodResults.ImmutableGetWithdrawalsResult>(Object);
    const [completedWithdrawals, setCompletedWithdrawals] = useState<ImmutableMethodResults.ImmutableGetWithdrawalsResult>(Object);
    // eth
    const [depositAmount, setDepositAmount] = useState('');
    const [prepareAmount, setPrepareAmount] = useState('');
    // nft
    const [depositTokenId, setDepositTokenId] = useState('');
    const [depositTokenAddress, setDepositTokenAddress] = useState('');
    const [prepareTokenId, setPrepareTokenId] = useState('');
    const [prepareTokenAddress, setPrepareTokenAddress] = useState('');
    const [completeTokenId, setCompleteTokenId] = useState('');
    const [completeTokenAddress, setCompleteTokenAddress] = useState('');

    useEffect(() => {
        load()
    }, [])

    async function load(): Promise<void> {
        setPreparingWithdrawals(await props.apiClient.getWithdrawals({
            user: props.walletAddress,
            rollup_status: ImmutableRollupStatus.included
        })) // included in batch awaiting confirmation
        setReadyWithdrawals(await props.apiClient.getWithdrawals({
            user: props.walletAddress,
            rollup_status: ImmutableRollupStatus.confirmed,
            withdrawn_to_wallet: false
        })) // confirmed on-chain in a batch and ready to be withdrawn
        setCompletedWithdrawals(await props.apiClient.getWithdrawals({
            user: props.walletAddress,
            withdrawn_to_wallet: true
        })) // confirmed on-chain in a batch and already withdrawn to L1 wallet
    };

    // deposit an NFT
    async function depositNFT() {
        try{
        await props.imxLink.deposit({
            type: ERC721TokenType.ERC721,
            tokenId: depositTokenId,
            tokenAddress: depositTokenAddress
        })}
        catch (e){
            console.log(`Error while depositing:${e}`);
        }
    };

    // deposit eth
    async function depositETH() {
        await props.imxLink.deposit({
            type: ETHTokenType.ETH,
            amount: depositAmount,
        })
    };

    // prepare an NFT withdrawal
    async function prepareWithdrawalNFT() {
        await props.imxLink.prepareWithdrawal({
            type: ERC721TokenType.ERC721,
            tokenId: prepareTokenId,
            tokenAddress: prepareTokenAddress
        })
    };

    // prepare an eth withdrawal
    async function prepareWithdrawalETH() {
        await props.imxLink.prepareWithdrawal({
            type: ETHTokenType.ETH,
            amount: prepareAmount,
        })
    };

    // complete an NFT withdrawal
    async function completeWithdrawalNFT() {
        await props.imxLink.completeWithdrawal({
            type: ERC721TokenType.ERC721,
            tokenId: completeTokenId,
            tokenAddress: completeTokenAddress
        })
    };

    // complete an eth withdrawal
    async function completeWithdrawalETH() {
        await props.imxLink.completeWithdrawal({
            type: ETHTokenType.ETH,
        })
    };

    return (
        <div>
            <div>
                ETH:
                <br/><br/>
                <div>
                    Deposit ETH:
                    <br/>
                    <label>
                        Amount (ETH):
                        <input type="text" value={depositAmount} onChange={e => setDepositAmount(e.target.value)} />
                    </label>
                    <button onClick={depositETH}>Deposit ETH</button>
                </div>
                <br/><br/>
                <div>
                    Prepare ETH for withdrawal (submit to be rolled up and confirmed on chain in the next batch):
                    <br/>
                    <label>
                        Amount (ETH):
                        <input type="text" value={prepareAmount} onChange={e => setPrepareAmount(e.target.value)} />
                    </label>
                    <button onClick={prepareWithdrawalETH}>Prepare ETH Withdrawal</button>
                </div>
                <br/><br/>
                <div>
                    Complete ETH withdrawal (withdraws entire eth balance that is ready for withdrawal to L1 wallet):
                    <br/>
                    <button onClick={completeWithdrawalETH}>Complete ETH Withdrawal</button>
                </div>
            </div>
            <br/>
            <div>
                ERC721:
                <br/><br/>
                <div>
                    Deposit NFT:
                    <br/>
                    <label>
                        Token ID:
                        <input type="text" value={depositTokenId} onChange={e => setDepositTokenId(e.target.value)} />
                    </label>
                    <label>
                        Token Address:
                        <input type="text" value={depositTokenAddress} onChange={e => setDepositTokenAddress(e.target.value)} />
                    </label>
                    <button onClick={depositNFT}>Deposit NFT</button>
                </div>
                <br/><br/>
                <div>
                    Prepare NFT for withdrawal (submit to be rolled up and confirmed on chain in the next batch):
                    <br/>
                    <label>
                        Token ID:
                        <input type="text" value={prepareTokenId} onChange={e => setPrepareTokenId(e.target.value)} />
                    </label>
                    <label>
                        Token Address:
                        <input type="text" value={prepareTokenAddress} onChange={e => setPrepareTokenAddress(e.target.value)} />
                    </label>
                    <button onClick={prepareWithdrawalNFT}>Prepare NFT Withdrawal</button>
                </div>
                <br/><br/>
                <div>
                    Complete NFT withdrawal (withdraws single NFT that is ready for withdrawal to L1 wallet):
                    <br/>
                    <label>
                        Token ID:
                        <input type="text" value={completeTokenId} onChange={e => setCompleteTokenId(e.target.value)} />
                    </label>
                    <label>
                        Token Address:
                        <input type="text" value={completeTokenAddress} onChange={e => setCompleteTokenAddress(e.target.value)} />
                    </label>
                    <button onClick={completeWithdrawalNFT}>Complete NFT Withdrawal</button>
                </div>
            </div>
            <br/><br/><br/>
            <div>
                Withdrawals being prepared:
                {JSON.stringify(preparingWithdrawals)}
            </div>
            <br/><br/>
            <div>
                Ready for withdrawal:
                {JSON.stringify(readyWithdrawals)}
            </div>
            <br/><br/>
            <div>
                Withdrawn to wallet:
                {JSON.stringify(completedWithdrawals)}
            </div>
        </div>
    );
}

export default Bridging;