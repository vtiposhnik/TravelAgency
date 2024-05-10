import { useSelector } from "react-redux"
import Unauthorized from "./Unauthorized"
import { Outlet } from "react-router-dom"
import { RootState } from "../redux/store/store"

export default function AdminOnly() {
    const { currentUser } = useSelector((state: RootState) => state.user)
    return currentUser && currentUser.isAdmin ? <Outlet /> : <Unauthorized />
}
