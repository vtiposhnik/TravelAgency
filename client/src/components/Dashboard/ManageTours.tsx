import axios from "axios";
import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store/store";
import { ITours, initialTourState } from "../../constants/interfaces";
import { deleteTour, fetchTours } from "../../constants/fetch";

export default function ManageTours() {
    const { currentUser } = useSelector((state: RootState) => state.user)
    const [errorMsg, setErrorMsg] = useState('')
    const [actionMsg, setActionMsg] = useState('')

    const [tours, setTours] = useState<ITours[]>([initialTourState])

    const [showModal, setShowModal] = useState(false)
    const [deleteTourID, setDeleteTourID] = useState('')

    useEffect(() => {
        console.log('rendered')
        const getTours = async () => {
            fetchTours()
                .then(data => { setTours(data.tours) })
                .catch(error => { setErrorMsg(error) })
        }

        getTours()
    }, [showModal])


    const handleDeletePost = () => {
        console.log(deleteTourID)
        deleteTour(deleteTourID)
            .then(data => {
                setActionMsg(data.message)
                console.log(actionMsg)
                setShowModal(false)
            })
            .catch(error => setErrorMsg(error))
    }

    return (
        <section>
            {currentUser && currentUser.isAdmin && tours.length > 0 ? (
                <>
                    <Table hoverable className='shadow-md'>
                        <Table.Head>
                            <Table.HeadCell>Дата обновления</Table.HeadCell>
                            <Table.HeadCell>Изображение</Table.HeadCell>
                            <Table.HeadCell>Название</Table.HeadCell>
                            <Table.HeadCell>Удалить</Table.HeadCell>
                            <Table.HeadCell>
                                <span>Редактировать</span>
                            </Table.HeadCell>
                        </Table.Head>

                        {tours.map((tour: ITours) => (
                            <Table.Body className='divide-y' key={tour._id}>
                                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                    <Table.Cell>
                                        {new Date(tour.updatedAt).toLocaleDateString()}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link to={`/tours/${tour.slug}`}>
                                            <img
                                                src={tour.coverImg}
                                                alt={tour.name}
                                                className='w-20 h-10 object-cover bg-gray-500'
                                            />
                                        </Link>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <Link
                                            className='font-medium text-gray-900 dark:text-white'
                                            to={`/tours/${tour.slug}`}
                                        >
                                            {tour.name}
                                        </Link>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <span
                                            onClick={() => {
                                                setShowModal(true);
                                                setDeleteTourID(tour._id);
                                            }}
                                            className='font-medium text-red-500 hover:underline cursor-pointer'
                                        >
                                            Delete
                                        </span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link
                                            className='text-teal-500 hover:underline'
                                            to={`/update-tour/${tour._id}`}
                                        >
                                            <span>Edit</span>
                                        </Link>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        ))}
                    </Table>
                </>) : <>No tours yet</>}
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                popup
                size='md'
            >
                <Modal.Header />
                <Modal.Body>
                    <div className='text-center'>
                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                            Вы уверены что хотите удалить пост?
                        </h3>
                        <div className='flex justify-center gap-4'>
                            <Button color='failure' onClick={handleDeletePost}>
                                Да, уверен
                            </Button>
                            <Button color='gray' onClick={() => setShowModal(false)}>
                                Нет, отменить
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </section>
    )
}
