import { Sidebar, SidebarItem, SidebarItemGroup } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Profile() {
    const path = useLocation()
    const [tab, setTab] = useState('')

    useEffect(() => {
        const urlParams = new URLSearchParams(path.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [path.search]);

    return (
        <section>
            <Sidebar>
            </Sidebar>
        </section>
    )
}
