import BonusReferral from "./Partials/BonusReferral";
import BonusRoyalty from "./Partials/BonusRoyalty";

export default function BonusHeader() {
    return (
        <div className="col-span-12 grid grid-cols-1 sm:grid-cols-2 gap-4 px-2">
            <BonusReferral />
            <BonusRoyalty />
        </div>
    );
}
