import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Navbar from "../components/navbar";
import Footer from "../components/footer";

import adminContractABI from "../contracts/admin.json"
import { usePrepareContractWrite, useContractWrite } from 'wagmi'


export default function Example() {
    const { config } = usePrepareContractWrite({
        address: '0xcd3EAf02914169fE4D6cBf19Ce6494e2c0160E40',
        abi: adminContractABI.abi,
        functionName: 'registerSelf',
    })

    const { write } = useContractWrite(config)


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
                    <form className="space-y-6" action="#
                    " method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="name"
                                    autoComplete="name"
                                    required
                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                Phone Number
                            </label>
                            <div className="mt-2">
                                <input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="phoneNumber"
                                    autoComplete="phoneNumber"
                                    required
                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="photo" className="block text-sm font-medium leading-6 text-white">
                                Photo
                            </label>
                            <div className="mt-2 flex items-center gap-x-3">
                                <UserCircleIcon className="h-12 w-12 text-gray-500" aria-hidden="true" />
                                <button
                                    type="button"
                                    className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
                                >
                                    Change
                                </button>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-white">
                                Cover photo
                            </label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
                                <div className="text-center">
                                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-500" aria-hidden="true" />
                                    <div className="mt-4 flex text-sm leading-6 text-gray-400">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer rounded-md bg-gray-900 font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-indigo-500"
                                        >
                                            <span>Upload a file</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-400">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                Marital Status
                            </label>
                            <div className="mt-2">
                                <input
                                    id="status"
                                    name="status"
                                    type="status"
                                    autoComplete="status"
                                    required
                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                Email Address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                House Address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="address"
                                    name="address"
                                    type="address"
                                    autoComplete="address"
                                    required
                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                Sex
                            </label>
                            <div className="mt-2">
                                <input
                                    id="gender"
                                    name="gender"
                                    type="gender"
                                    autoComplete="gender"
                                    required
                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                Date of Birth
                            </label>
                            <div className="mt-2">
                                <input
                                    id="date"
                                    name="date"
                                    type="date"
                                    autoComplete="date"
                                    required
                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                Valid Government Issued ID number
                            </label>
                            <div className="mt-2">
                                <input
                                    id="number"
                                    name="number"
                                    type="number"
                                    autoComplete="number"
                                    required
                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                disabled={!write} onClick={() => write?.()}
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                                Register
                            </button>
                            {isLoading && <div>Check Wallet</div>}
                            {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
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