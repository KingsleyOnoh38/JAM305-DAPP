import Link from "next/link";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import memberContractABI from "../contracts/member.json";
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import React, { useState } from 'react';

export default function Example() {
    const [registrationId, setRegistrationId] = useState('');
    const [transactionStatus, setTransactionStatus] = useState(null); // null | 'success' | 'error'

    const { config: inputRegistrationIdConfig } = usePrepareContractWrite({
        address: '0xcd3EAf02914169fE4D6cBf19Ce6494e2c0160E40',
        abi: memberContractABI.abi,
        functionName: 'inputRegistrationId',
        args: [registrationId],
    });

    const { data: inputRegistrationIdData, write: inputRegistrationId } = useContractWrite(inputRegistrationIdConfig);

    const handleRegistrationIdChange = (event) => {
        setRegistrationId(event.target.value);
        setTransactionStatus(null); // Reset the status when changing the input
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await inputRegistrationId();
            setTransactionStatus('success');
        } catch (error) {
            console.error("Transaction failed:", error);
            setTransactionStatus('error');
        }
    }

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
                        Input Registration ID
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="code" className="block text-sm font-medium leading-6 text-white">
                                Enter registration ID from management.
                            </label>
                            <div className="mt-2">
                                <input
                                    id="code"
                                    name="code"
                                    type="string"
                                    autoComplete="off"
                                    value={registrationId}
                                    onChange={handleRegistrationIdChange}
                                    required
                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                                Proceed to Register
                            </button>
                        </div>
                    </form>

                    {transactionStatus === 'success' && (
                        <div className="mt-5 text-center text-green-500">
                            Registration ID is validated. Please proceed with the registration!
                        </div>
                    )}

                    {transactionStatus === 'error' && (
                        <div className="mt-5 text-center text-red-500">
                            Failed to validate the Registration ID. Please try again or contact support.
                        </div>
                    )}

                    <p className="mt-10 text-center text-sm text-gray-400">
                        Get Registration ID?{' '}
                        <a href="#" className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300">
                            Contact JAM Management
                        </a>
                    </p>
                </div>
            </div>
            <Footer />
        </>
    )
}
