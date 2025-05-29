import StatCards from "./StatCards";
import ActivityGraph from "./ActivityGraph";
import RecentTransactions from "./RecentTransactions";
import BarGraph from "./BarGraph";
import PieGraph from "./PieGraph";

export default function Grid() {
    return (
        <div className="px-4 grid gap-3 grid-cols-12">
            <StatCards />
            <ActivityGraph />
            <BarGraph />
            <RecentTransactions />
            <PieGraph />
        </div>
    )
}