import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import { Outlet } from "react-router-dom";
import SignInPage from "../pages/SignInPage";

export default function UserOnlyPage() {
    const {currentUser} = useSelector((state: RootState) => state.user)

    return currentUser ? <Outlet /> : <SignInPage />
}
