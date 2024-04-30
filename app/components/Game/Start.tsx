'use client'
import {
    Formik,
    Form,
    Field,
} from 'formik';
import React, { useState } from 'react';
import { PrimaryUserInterface } from '@/app/page'

const StartQuestions: React.FC<{ initialValues: PrimaryUserInterface, incomingSubmit: (data: PrimaryUserInterface) => void; }> = ({ incomingSubmit, initialValues }) => {

    const [showIntroMessage, setShowIntroMessage] = useState(true)

    const removeIntroMessage = () => {
        setShowIntroMessage(false)
    }
    return (
        <div>
            {showIntroMessage ? (
                <div className='flex flex-col w-full gap-5 text-[color:var(--theme-text)] text-normal md:text-xl rounded-md md:pb-6 font-montserrat align-items justify-center text-chirp-h italic tracking-wide leading-relaxed'>
                    <span className='text-align text-center text-chirp-r '>
                        Hey there!
                    </span>
                    <span>
                        In this game, you are a new user of the social media network, Chirp, where you can explore your interests and maybe even find your best bird friends.
                    </span>
                    <span>
                        Different birds will send you follow requests to be added to your Chirp feed. But be careful when you get follow requests… Not all profiles are made the same, and accepting <span className='text-chirp-c'>untrustworthy</span> follow requests will bring your Trustometer score down.
                    </span>
                    <button onClick={removeIntroMessage} className='hover:text-chirp-r'>
                        Start!
                    </button>
                </div>
            ) : (
                <div className="flex flex-col w-full text-[color:var(--theme-text)] text-lg md:text-xl pb-6 font-montserrat">
                    <div className="flex flex-row justify-center align-items py-5">
                        <span className='text-chirp-i'>
                            Join Chirp Today
                        </span>
                    </div>
                    <div className="w-full h-full pb-3 md:text-lg">
                        <Formik
                            initialValues={initialValues}
                            onSubmit={(values, actions) => {
                                incomingSubmit(values) // callback
                                actions.setSubmitting(false);
                            }}
                            validate={values => {
                                const errors: Partial<PrimaryUserInterface> = {};
                                if (!values.userName) {
                                    errors.userName = 'You must enter a name'; // Add validation error if userName is empty
                                }
                                return errors;
                            }}
                        >
                            {({ values, handleChange }) => (
                                <Form className='flex flex-col justify-center align-items py-3 gap-2 px-10'>
                                    <label htmlFor="userName">Bird Type</label>
                                    <Field
                                        as='select'
                                        className='bg-[var(--theme-accent)] text-chirp-r'
                                        id="userName"
                                        name="userName"
                                        value={values.userName}
                                        onChange={handleChange}
                                    >
                                        <option value="Sparrow">Sparrow</option>
                                        <option value="Robin">Robin</option>
                                        <option value="Pigeon">Pigeon</option>
                                        <option value="Hawk">Hawk</option>
                                        <option value="Owl">Owl</option>
                                        <option value="Hummingbird">Hummingbird</option>
                                    </Field>


                                    <label htmlFor="avatar">Color</label>
                                    <Field
                                        as='select'
                                        className='bg-[var(--theme-accent)] text-chirp-h'
                                        id="avatar"
                                        name="avatar"
                                        value={values.avatar}
                                        onChange={handleChange}
                                    >
                                        <option value="blue">Blue Bird</option>
                                        <option value="green">Green Bird</option>
                                        <option value="light-orange">Light Orange Bird</option>
                                        <option value="orange">Orange Bird</option>
                                        <option value="red">Red Bird</option>
                                        <option value="teal">Teal Bird</option>
                                        <option value="yellow">Yellow Bird</option>
                                    </Field>

                                    <label htmlFor="interest">Theme</label>
                                    <Field
                                        as='select'
                                        className='bg-[var(--theme-accent)] text-chirp-i'
                                        id="interest"
                                        name="interest"
                                        value={values.interest}
                                        onChange={handleChange}
                                    >
                                        <option value="entertainment">Entertainment</option>
                                        <option value="sports">Sports</option>
                                        <option value="fashion">Fashion</option>
                                        <option value="videogames">Video Games</option>
                                        <option value="politics">Politics</option>

                                    </Field>
                                    <div className='flex justify-center align-items pt-3'>
                                        <button className='text-2xl hover:text-chirp-i' type='submit'>Begin</button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            )
            }
        </div>
    )
}

export default StartQuestions;
