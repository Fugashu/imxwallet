import React from 'react';
import { Link, ETHTokenType } from '@imtbl/imx-sdk';

async function sdkExample() {
    const link = new Link('https://link.ropsten.x.immutable.com');

    // Register user, you can persist address to local storage etc.
    const { address } = await link.setup({});
    localStorage.setItem('address', address);

    // Deposit ETH into IMX
    link.deposit({
        type: ETHTokenType.ETH,
        amount: '0.01',
    });

    // View transaction history
    link.history({});

    // Create a sell order for token id 123 for 0.01 ETH
    link.sell({
        amount: '0.01',
        tokenId: '123',
        tokenAddress: '0x2ca7e3fa937cae708c32bc2713c20740f3c4fc3b',
    });

    // Cancel a sell order
    link.cancel({
        orderId: '1'
    });

    // Create a buy flow:
    link.buy({
        orderIds: ['1', '2', '3'],
    });

    // Prepare withdrawal, you will need to wait some time before completing the withdrawal
    link.prepareWithdrawal({
        type: ETHTokenType.ETH,
        amount: '0.01',
    });

    // Complete withdrawal
    link.completeWithdrawal({
        type: ETHTokenType.ETH,
    });
}
const WalletConnection = () => {
    return (
        <div>
        <button onClick={sdkExample}>Connect to IMX</button>
        </div>
    );
};

export default WalletConnection;
