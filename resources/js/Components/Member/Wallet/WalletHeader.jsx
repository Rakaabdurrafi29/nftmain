import WalletBalance from "./Partials/WalletBalance";
import WithdrawalForm from "./Partials/WithdrawalForm";

export default function WalletHeader({
    wrongAccount,
    offset,
    setOffset,
    withdrawalProcess,
    setWithdrawalProcess,
    myWalletBalance,
    setMyWalletBalance,
}) {
    return (
        <div className="col-span-12 grid grid-cols-1 sm:grid-cols-2 gap-4 px-2">
            <WalletBalance
                myWalletBalance={myWalletBalance}
                setMyWalletBalance={setMyWalletBalance}
            />
            <WithdrawalForm
                withdrawalProcess={withdrawalProcess}
                setWithdrawalProcess={setWithdrawalProcess}
                wrongAccount={wrongAccount}
                offset={offset}
                setOffset={setOffset}
                myWalletBalance={myWalletBalance}
                setMyWalletBalance={setMyWalletBalance}
            />
        </div>
    );
}
