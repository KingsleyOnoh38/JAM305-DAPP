import React, { useState } from 'react';

import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Navbar from "../components/navbar";
import Footer from "../components/footer";

import memberContractABI from "../contracts/member.json"
import { usePrepareContractWrite, useContractWrite } from 'wagmi'


export default function Example() {
    const { config } = usePrepareContractWrite({
        address: '0xcd3EAf02914169fE4D6cBf19Ce6494e2c0160E40',
        abi: memberContractABI.abi,
        functionName: 'registerSelf',
    })

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [data, setData] = useState(null);

    const { write } = useContractWrite(config)

    // Assuming this is within a functional component...

    // Declare state at the top level of your functional component
    const [form, setForm] = useState({
        name: '',
        phoneNumber: '',
        image: '',
        maritalStatus: '',
        emailAddress: '',
        houseAddress: '',
        sex: '',
        dateOfBirth: '',
        validIdNumber: '',
    });


    const handleFormSubmit = async (e) => {
        e.preventDefault();

        checkIfImage(form.image, async (exists) => {
            if (exists) {
                setIsLoading(true)
                await registerSelf({ ...form, target: ethers.utils.parseUnits(form, 18) })
                setIsLoading(false);
                navigate('/');
            } else {
                alert('Provide valid image URL')
                setForm({ ...form, patientImage: '' });
            }
        })

        setIsLoading(true); // Set the loading state

        try {
            const transactionResponse = await write(form);
            if (transactionResponse) {
                setIsLoading(false); // Unset the loading state
                setIsSuccess(true); // You can set the success state here
                setData(transactionResponse); // If you want to display the transaction data

                // Redirect to the member dashboard
                window.location.href = "/dashboard";
            } else {
                setIsLoading(false); // Unset the loading state
                console.error("Transaction failed");
            }
        } catch (error) {
            setIsLoading(false); // Unset the loading state in case of an error
            console.error("Error submitting transaction:", error);
        }
    };



    return (
        <>
            <Navbar />
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                        Register
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleFormSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                Name
                            </label>
                            <div className="mt-2">
                                <input className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    id="name"
                                    autoComplete="name"
                                    required
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                Phone Number
                            </label>
                            <div className="mt-2">
                                <input className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    id="phoneNumber"
                                    autoComplete="phoneNumber"
                                    required
                                    type="text"
                                    value={form.phoneNumber}
                                    onChange={(e) => setForm(prev => ({ ...prev, phoneNumber: e.target.value }))}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                Image
                            </label>
                            <div className="mt-2">
                                <input className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    id="image"
                                    autoComplete="url"
                                    required
                                    type="url"
                                    value={form.image}
                                    onChange={(e) => setForm(prev => ({ ...prev, image: e.target.value }))}
                                />
                            </div>
                        </div>


                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                Marital Status
                            </label>
                            <div className="mt-2">
                                <input className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    id="maritalStatus"
                                    autoComplete="maritalStatus"
                                    required
                                    type="text"
                                    value={form.maritalStatus}
                                    onChange={(e) => setForm(prev => ({ ...prev, maritalStatus: e.target.value }))}                                
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                Email Address
                            </label>
                            <div className="mt-2">
                                <input className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    id="emailAddress"
                                    autoComplete="emailAddress"
                                    required
                                    type="text"
                                    value={form.emailAddress}
                                    onChange={(e) => setForm(prev => ({ ...prev, emailAddress: e.target.value }))}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                House Address
                            </label>
                            <div className="mt-2">
                                <input className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    id="houseAddress"
                                    autoComplete="houseAddress"
                                    required
                                    type="text"
                                    value={form.houseAddress}
                                    onChange={(e) => setForm(prev => ({ ...prev, houseAddress: e.target.value }))}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                Sex
                            </label>
                            <div className="mt-2">
                                <input className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    id="sex"
                                    autoComplete="sex"
                                    required
                                    type="text"
                                    value={form.sex}
                                    onChange={(e) => setForm(prev => ({ ...prev, sex: e.target.value }))}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                Date of Birth
                            </label>
                            <div className="mt-2">
                                <input className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    id="dateOfBirth"
                                    autoComplete="dateOfBirth"
                                    required
                                    type="date"
                                    value={form.dateOfBirth}
                                    onChange={(e) => setForm(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                Valid Government Issued ID number
                            </label>
                            <div className="mt-2">
                                <input className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    id="validIdNumber"
                                    autoComplete="number"
                                    required
                                    type="number"
                                    value={form.validIdNumber}
                                    onChange={(e) => setForm(prev => ({ ...prev, validIdNumber: e.target.value }))}
                                />
                            </div>
                        </div>

                        <div>
                            <button disabled={!write} onClick={() => write?.()}
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                                Register
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-400">
                        Already a member?{' '}
                        <a href="#" className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300">
                            Sign In
                        </a>
                    </p>
                </div>
            </div>
            <Footer />
        </>
    )
}