import { UserValues } from '@/app/page';
import Image from 'next/image';
import {
    Formik,
    FormikHelpers,
    FormikProps,
    Form,
    Field,
    FieldProps,
} from 'formik';
import React, { useState, useEffect } from 'react';

export interface NewPostValues {
    username: string;
    message: string;
}

const ShowNewPostForm: React.FC<{ initialValues: NewPostValues, incomingSubmit: (data: NewPostValues) => void, backButtonHandler: () => void, userValues: UserValues }> = ({ incomingSubmit, initialValues, backButtonHandler, userValues }) => {

    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

    useEffect(() => {
        const getImage = async () => {
            try {
                const imageModule = await import(`@/public/assets/icons/${userValues.avatar}-bird.svg`);
                setAvatarUrl(imageModule.default);
            } catch (error) {
                console.error('Error loading image:', error);
            }
        };

        getImage();
    }, [userValues.avatar]);

    return (
        <div className='fixed inset-x-1/4 flex items-center justify-center z-50 bg-white border border-[var(--theme-accent)] text-[var(--theme-text)] w-1/2 h-1/2 lg:rounded'>
            <div className="flex flex-col w-full h-full  text-[color:var(--theme-text)] justify-center">
                <div className="flex flex-row justify-between items-center py-5 px-10">
                    {userValues.userName}&apos;s New Post
                    {avatarUrl && <Image src={avatarUrl} alt='bird image' width={50} />}
                </div>
                <div className="w-full h-full">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values, actions) => {
                            incomingSubmit(values) // callback
                            actions.setSubmitting(false);
                        }}
                    >
                        <Form className='flex flex-col justify-center align-items py-3 gap-2 px-10'>
                            <label htmlFor="message">Message:</label>
                            <Field className=' grow bg-[var(--theme-accent)] w-full h-auto' id="message" name="message" />

                            <div className='flex justify-center align-items py-3 gap-5'>
                                <button className='hover:text-[color:var(--theme-hover)]' onClick={backButtonHandler}>Back</button>
                                <button className='hover:text-[color:var(--theme-hover)]' type='submit'>Post</button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default ShowNewPostForm;