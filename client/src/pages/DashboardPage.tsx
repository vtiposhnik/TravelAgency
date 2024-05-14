import { Tabs } from "flowbite-react";
import { HiAdjustments } from "react-icons/hi";
import { HiUserCircle } from "react-icons/hi2";
import { MdDashboard } from "react-icons/md";
import Profile from "../components/Dashboard/Profile";
import { useSelector } from "react-redux";
import ManageTours from "../components/Dashboard/ManageTours";
import { RootState } from "../redux/store/store";

export default function DashboardPage() {
    const { currentUser } = useSelector((state: RootState) => state.user)

    return (
        <section>
            <Tabs>
                <Tabs.Item title="Профиль" icon={HiUserCircle}>
                    <Profile />
                </Tabs.Item>

                {currentUser && currentUser.isAdmin ? <Tabs.Item active title="Туры" icon={MdDashboard}>
                    <ManageTours />
                </Tabs.Item> : <></>}

                <Tabs.Item title="Настройки" icon={HiAdjustments}>
                    This is <span className="font-medium text-gray-800 dark:text-white">Settings tab's associated content</span>.
                    Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
                    control the content visibility and styling.
                </Tabs.Item>
            </Tabs>
        </section>
    )
}
