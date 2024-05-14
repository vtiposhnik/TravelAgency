import { Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { logout } from "../../constants/fetch";
import { logOutSuccess } from "../../redux/userSlice";

export default function Profile() {
    const { currentUser } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()

    const handleSignout = () => {
        logout()
            .then(data => {
                console.log(data)
                dispatch(logOutSuccess())
            })
            .catch(error => {
                console.error(error)
            })
    }

    return (
        <section className="px-14 py-8">
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
                <Button onClick={handleSignout}>
                    Выйти
                </Button>
            </div>
        </section>
    )
}
