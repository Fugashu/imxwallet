export const CojodiNetworkSwitcher = {

    switchToChain: async (chainprops:any) =>{
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: chainprops.chainId }],
            });
        } catch (switchError:any) {
            if (switchError.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainId: chainprops.chainId,
                                chainName: chainprops.chainName,
                                rpcUrls: [chainprops.rpcUrls],
                                nativeCurrency: {
                                    name: chainprops.currencyName,
                                    symbol: chainprops.symbol,
                                    decimals: chainprops.decimals
                                },
                                blockExplorerUrls: [chainprops.blockExplorerUrls]
                            },
                        ],
                    });
                } catch (addError) {
                    console.log('Chain switch failed:' + addError);
                }
                return;
            }
            console.log('Unknown error during chain switch.')

        }
    },

}


