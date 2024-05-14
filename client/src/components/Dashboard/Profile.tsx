import { Button, Sidebar, SidebarItem, SidebarItemGroup } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootState } from "../../redux/store/store";

export default function Profile() {
    const path = useLocation()
    const [tab, setTab] = useState('')
    const {currentUser} = useSelector((state: RootState) => state.user)

    useEffect(() => {
        const urlParams = new URLSearchParams(path.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [path.search]);

    return (
        <section className="px-14 py-6">
            <div className="flex flex-col items-center gap-6 border text-center py-4 bg-cyan-500 rounded-lg">
                <figure className="relative top-[-5rem] w-[150px]" >
                    <img className="border-[4px] rounded-[50%] w-[100%]" src="https://firebasestorage.googleapis.com/v0/b/travel-69aa2.appspot.com/o/user-3.jpg?alt=media&token=0f31e7e3-bedb-43e3-b939-64b5b84cdf8e" alt="user-img" />
                </figure>
                <div className="flex flex-wrap sm:grid sm:grid-cols-2 border rounded-lg p-4 mt-[-4rem] bg-white">
                    <span>Имя пользователя: </span>{currentUser?.username}
                    <span>Электронная почта: </span>{currentUser?.email}
                    <span>Зарегестрирован с </span>{currentUser?.createdAt}
                </div>
                <p className="px-4 py-2 w-[50%] border rounded-lg p-4 bg-white">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa laudantium similique molestias atque quidem eius mollitia at ex saepe reprehenderit nesciunt dolore accusantium quo, dolorum asperiores quae vero fuga eos?
                </p>
                <Button>
                    Выйти
                </Button>
            </div>
        </section>
    )
}
