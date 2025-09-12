import RoiEarned from "./Partials/RoiEarned";
import RoiScheduleSum from "./Partials/RoiScheduleSum";

export default function RoiHeader() {
    return (
        <div className="col-span-12 grid grid-cols-1 sm:grid-cols-2 gap-4 px-2">
            <RoiEarned />
            <RoiScheduleSum />
        </div>
    );
}
