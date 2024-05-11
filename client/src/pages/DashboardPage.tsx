import { Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList } from "react-icons/hi";
import { HiUserCircle } from "react-icons/hi2";
import { MdDashboard } from "react-icons/md";
import Profile from "../components/Dashboard/Profile";
import { useSelector } from "react-redux";
import ManageTours from "../components/Dashboard/ManageTours";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function DashboardPage() {
    const { currentUser } = useSelector(state => state.user)

    const path = useLocation()
    const [tab, setTab] = useState(path.pathname)

    useEffect(() => {
        const urlParams = new URLSearchParams(path.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [path.search]);

    return (
        <section>
            <Tabs>
                <Tabs.Item title="Profile" icon={HiUserCircle}>
                    <Profile />
                </Tabs.Item>

                {currentUser && currentUser.isAdmin ? <Tabs.Item active title="Tours" icon={MdDashboard}>
                    <ManageTours />
                </Tabs.Item> : <></>}

                <Tabs.Item title="Settings" icon={HiAdjustments}>
                    This is <span className="font-medium text-gray-800 dark:text-white">Settings tab's associated content</span>.
                    Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
                    control the content visibility and styling.
                </Tabs.Item>
            </Tabs>
        </section>
    )
}
