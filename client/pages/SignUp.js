import React from 'react';
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useContractWrite } from 'wagmi';
import memberContractABI from "../contracts/member.json";

export default function Example() {
    const { write } = useContractWrite({
        address: '0xcd3EAf02914169fE4D6cBf19Ce6494e2c0160E40', // Replace with your contract address
        abi: memberContractABI, // Use the ABI you've provided
        functionName: 'registerSelf', // Use the function you want to interact with
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        try {
            // Call the contract function
            await write({
                args: [
                    formData.get('name'),
                    formData.get('phoneNumber'),
                    formData.get('image'),
                    formData.get('maritalStatus'),
                    formData.get('emailAddress'),
                    formData.get('houseAddress'),
                    formData.get('sex'),
                    formData.get('dateOfBirth'),
                    Number(formData.get('validIdNumber'))
                ],
                from: '0x6faC4708fFb8BB4ccfF3149AF2A59f59E4Ef8F16', // Replace with your wallet address
            });
            console.log('Transaction successful');
        } catch (error) {
            console.error('Transaction failed', error);
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
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-white">
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-white">
                                Phone Number
                            </label>
                            <div className="mt-2">
                                <input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="text"
                                    autoComplete="phoneNumber"
                                    required
                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {/* Image */}
                        <div>
                            <label htmlFor="image" className="block text-sm font-medium leading-6 text-white">
                                Image
                            </label>
                            <div className="mt-2">
                                <input
                                    id="image"
                                    name="image"
                                    type="url"
                                    autoComplete="url"
                                    required
                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {/* Marital Status */}
                        <div>
                            <label htmlFor="maritalStatus" className="block text-sm font-medium leading-6 text-white">
                                Marital Status
                            </label>
                            <div className="mt-2">
                                <input
                                    id="maritalStatus"
                                    name="maritalStatus"
                                    type="text"
                                    autoComplete="maritalStatus"
                                    required
                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {/* Email Address */}
                        <div>
                            <label htmlFor="emailAddress" className="block text-sm font-medium leading-6 text-white">
                                Email Address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="emailAddress"
                                    name="emailAddress"
                                    type="text"
                                    autoComplete="emailAddress"
                                    required
                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {/* House Address */}
                        <div>
                            <label htmlFor="houseAddress" className="block text-sm font-medium leading-6 text-white">
                                House Address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="houseAddress"
                                    name="houseAddress"
                                    type="text"
                                    autoComplete="houseAddress"
                                    required
                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {/* Sex */}
                        <div>
                            <label htmlFor="sex" className="block text-sm font-medium leading-6 text-white">
                                Sex
                            </label>
                            <div className="mt-2">
                                <input
                                    id="sex"
                                    name="sex"
                                    type="text"
                                    autoComplete="sex"
                                    required
                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {/* Date of Birth */}
                        <div>
                            <label htmlFor="dateOfBirth" className="block text-sm font-medium leading-6 text-white">
                                Date of Birth
                            </label>
                            <div className="mt-2">
                                <input
                                    id="dateOfBirth"
                                    name="dateOfBirth"
                                    type="date"
                                    autoComplete="dateOfBirth"
                                    required
                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {/* Valid ID Number */}
                        <div>
                            <label htmlFor="validIdNumber" className="block text-sm font-medium leading-6 text-white">
                                Valid Government Issued ID number
                            </label>
                            <div className="mt-2">
                                <input
                                    id="validIdNumber"
                                    name="validIdNumber"
                                    type="number"
                                    autoComplete="number"
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
    );
}