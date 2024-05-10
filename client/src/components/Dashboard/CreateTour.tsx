import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Button, FileInput, Alert, Select, Spinner, TextInput } from 'flowbite-react'
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { storage } from '../../firebase';

export default function CreateTour() {
    const [file, setFile] = useState<File | null>(null)
    const [imageUploadProgress, setImageUploadProgress] = useState('');
    const [imageUploadError, setImageUploadError] = useState('');
    const [loading, setLoading] = useState(false)
    const [downloadURL, setDownloadURL] = useState('')
    const navigate = useNavigate()
    console.log('sldkfjsldkfj')

    const onSubmit = async (formData) => {
        try {
            const res = await fetch('/api/post/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await res.json()
            console.log(data)

            const slug = data.post.slug
            navigate(`posts/${slug}`)

        } catch (error) {
            console.error(error)
        }

    }

    const handleUploadImg = async () => {

        try {
            setLoading(true)
            if (!file) {
                console.log('salkfdj;aslkdfj;')
                setImageUploadError('Загрузите изображение');
                setLoading(false)
                return;
            }
            setImageUploadError('');
            const fileName = new Date().getTime() + '-' + file.name;

            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    setLoading(true)
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageUploadProgress(progress.toFixed(0));
                },
                (error: Error) => {
                    console.log(error)
                    setImageUploadError('Image upload failed');
                    setImageUploadProgress('');
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUploadProgress('');
                        setLoading(false)
                        setImageUploadError('');
                        setDownloadURL(downloadURL)
                    });
                }
            );
            
        } catch (error) {
            setImageUploadError('Image upload failed');
            setImageUploadProgress('');
            console.log(error);
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    return (
        <form className="space-y-6 p-6" onSubmit={handleSubmit(onSubmit)}>
            <TextInput
                id='title'
                type='text'
                placeholder='Добавьте заголовок...'
                required />
            <Select>
                <option value="uncategorized">Выберите категорию</option>
                <option value="it">IT</option>
                <option value="math">Математика</option>
                <option value="culture">Культура</option>
                <option value="language">Языки</option>
            </Select>
            <div className='flex items-center justify-between'>
                <FileInput id="file-upload" accept='image/*' onChange={(e) => { if (e.target.files) { setFile(e.target.files[0]) } }} />
                <Button gradientDuoTone='purpleToBlue' outline onClick={handleUploadImg} >
                    {loading ? (
                        <>
                            <Spinner size='sm' />
                            <span className='pl-3'>{imageUploadProgress}%</span>
                        </>
                    ) : (
                        'Загрузите изображение'
                    )}
                </Button>
            </div>
            {imageUploadError !== '' ? <Alert>{imageUploadError}</Alert> : <></>}
            {downloadURL !== '' && (
                <img
                    src={downloadURL}
                    alt='ваше изображение'
                    className='w-full h-72 object-cover'
                />
            )}
            <textarea name="description" id="description">
                content...
            </textarea>
        </form>
    )
}
