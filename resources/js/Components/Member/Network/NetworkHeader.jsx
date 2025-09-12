import NetworkAll from "./Partials/NetworkAll";
import NetworkReferral from "./Partials/NetworkReferral";
import Referrer from "./Partials/Referrer";

export default function NetworkHeader() {
    return (
        <div className="col-span-12 grid grid-cols-1 sm:grid-cols-3 gap-4 px-2">
            <Referrer />
            <NetworkReferral />
            <NetworkAll />
        </div>
    );
}
