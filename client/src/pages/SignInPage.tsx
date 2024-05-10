import { useForm } from "react-hook-form";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { ErrorBoundary } from 'react-error-boundary'
import { useState } from "react";
import { signInStart, signInFailure, signInSuccess } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store/store";

export default function SignInPage() {
    const [errorMsg, setErrorMsg] = useState('')
    const { loading } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (formData) => {
        console.log("submitted", formData)
        dispatch(signInStart())
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            const data = await res.json()

            if (!res.ok) {
                dispatch(signInFailure(data.message))
                console.error("response not ok")
            }

            console.log(data)
            dispatch(signInSuccess(data.user))
            navigate('/')

        } catch (error) {
            dispatch(signInFailure(error))
            console.error(error)
        }
    }

    return (
        <div className='min-h-screen mt-20'>
            <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
                <div className='flex-1'>
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <Label value='Ваша электронная почта' />
                            <TextInput
                                required
                                type='email'
                                placeholder='name@company.com'
                                id='email'
                                {...register(('email'), {
                                    maxLength: 60,
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: "Invalid Email!"
                                    }
                                })}
                            />
                        </div>
                        {errors.email && (<span className="error"> {errors.email.message?.toString()} </span>)}

                        <div>
                            <Label value='Ваш пароль' />
                            <TextInput
                                required
                                type='password'
                                placeholder='**********'
                                id='password'
                                {...register('password', {
                                    maxLength: 60,
                                    validate: {
                                        matchPattern: (value) =>
                                            /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)/.test(
                                                value
                                            ),
                                        minLength: (value) => value.length > 6
                                    }
                                })}
                            />
                        </div>
                        {errors.password?.type === 'matchPattern' && <span className="error">
                            Пароль должен содержать как минимум одну заглавную букву, цифру и специальный символ!</span>}
                        {errors.password?.type === 'minLength' && <span className="error"> Пароль должен содержать как минимум 6 символов!</span>}

                        <Button
                            gradientDuoTone='greenToBlue'
                            type='submit'
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Spinner size='sm' />
                                    <span className='pl-3'>Загрузка...</span>
                                </>
                            ) : (
                                'Войти'
                            )}
                        </Button>
                    </form>

                    <div className='flex gap-2 text-sm mt-5'>
                        <span>Не авторизованы?</span>
                        <Link to='/register' className='text-blue-500'>
                            Регистрация
                        </Link>
                    </div>

                    <ErrorBoundary fallback={<p>⚠️ The 'errorMsg' is null!</p>}>
                        {errorMsg !== null && (
                            <Alert className='mt-5'>
                                {errorMsg}
                            </Alert>
                        )}
                    </ErrorBoundary>

                </div>
            </div>
        </div>
    );
}
