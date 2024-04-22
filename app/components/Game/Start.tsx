import {
    Formik,
    Form,
    Field,
} from 'formik';
import React from 'react';
import { PrimaryUserInterface } from '@/app/page'

const StartQuestions: React.FC<{ initialValues: PrimaryUserInterface, incomingSubmit: (data: PrimaryUserInterface) => void; }> = ({ incomingSubmit, initialValues }) => {
    return (
        <div className="flex flex-col w-full h-full  text-[color:var(--theme-text)] border border-black rounded-md pb-6">
            <div className="flex flex-row justify-center align-items py-5">
                <span>
                    Create Your Character!
                </span>
            </div>
            <div className="w-full h-full pb-3">
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values, actions) => {
                        incomingSubmit(values) // callback
                        actions.setSubmitting(false);
                    }}
                >
                    {({ values, handleChange }) => (
                        <Form className='flex flex-col justify-center align-items py-3 gap-2 px-10'>
                            <label htmlFor="userName">User Name:</label>
                            <Field className='bg-[var(--theme-accent)]' id="userName" name="userName" />

                            <label htmlFor="bio">Bio:</label>
                            <Field className='bg-[var(--theme-accent)]' id="bio" name="bio" />

                            <label htmlFor="avatar">Avatar:</label>
                            <Field
                                as='select'
                                className='bg-[var(--theme-accent)] '
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

                            <label htmlFor="interests">Interests:</label>
                            <Field
                                as='select'
                                className='bg-[var(--theme-accent)]'
                                id="interests"
                                name="interests"
                                value={values.interests}
                                onChange={handleChange}
                            >
                                <option value="sports">Sports</option>
                                <option value="fashion">Fashion</option>
                                <option value="video games">Video Games</option>
                            </Field>
                            <div className='flex justify-center align-items '>
                                <button className='hover:text-[color:var(--theme-hover)]' type='submit'>Start Game!</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default StartQuestions;
