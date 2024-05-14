import { useForm } from "react-hook-form";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signUpApi } from "../constants/fetch";
import { IUserSignUp } from "../constants/interfaces";

export default function SignUpPage() {
    const [errorMsg, setErrorMsg] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IUserSignUp>();
    const password = watch('password', '')

    const onSubmit = async (formData: IUserSignUp) => {
        console.log(formData);  
        setLoading(true)

        signUpApi(formData)
            .then(data => {
                console.log("successfull", data.message)
                navigate('/login');
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                setErrorMsg(error)
            })
    };

    return (
        <div className='min-h-screen mt-20'>
            <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
                <div className='flex-1'>
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <Label value='Имя пользователя' />
                            <TextInput
                                required
                                type='text'
                                placeholder='Имя пользователя'
                                id='username'
                                {...register('username', {
                                    maxLength: 40
                                })}
                            />
                        </div>
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
                                placeholder='***********'
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
                            Пароль должен содержать как минимум одну заглавную букву, цифру и специальный символ!.</span>}
                        {errors.password?.type === 'minLength' && <span className="error">  Пароль должен содержать как минимум 6 символов!</span>}

                        <div>
                            <Label value='Подтвердите пароль' />
                            <TextInput
                                required
                                type='password'
                                placeholder='***********'
                                id='password'
                                {...register(('passwordConfirm'), {
                                    maxLength: 60,
                                    minLength: {
                                        value: 6,
                                        message: "  Пароль должен содержать как минимум 6 символов!"
                                    },
                                    validate: (value) => value === password || "Пароли не совпадают"
                                })}
                            />
                        </div>
                        {errors.passwordConfirm && <span className="error"> {errors.passwordConfirm.message?.toString()} </span>}

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
                                'Регистрация'
                            )}
                        </Button>
                    </form>
                    <div className='flex gap-2 text-sm mt-5'>
                        <span>Есть аккаунт?</span>
                        <Link to='/login' className='text-blue-500'>
                            Войти
                        </Link>
                    </div>
                    {errorMsg && (
                        <Alert className='mt-5' color='failure'>
                            {errorMsg.toString()}
                        </Alert>
                    )}
                </div>
            </div>
        </div>
    );
}
