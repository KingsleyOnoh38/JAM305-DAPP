import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useContractWrite, useAccount } from 'wagmi';
import memberContractABI from "../contracts/member.json";

export default function Example() {
    const { isConnected } = useAccount()
    const { data, isLoading, isSuccess, write } = useContractWrite({
        address: '0xcd3EAf02914169fE4D6cBf19Ce6494e2c0160E40', // Replace with your contract address
        abi: memberContractABI, // Use the ABI you've provided
        functionName: 'inputRegistrationId', // Use the function you want to interact with
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const registrationId = event.target.elements.code.value; // Get the input value

        try {
            if (!isConnected) { 
                alert("Kindly connect your wallet"); 
                return;
            }
            // Call the contract function
            await write({
                args: [
                    registrationId, // Pass the input value to the function
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
                                    type="text" // Changed to "text" type
                                    autoComplete="off"
                                    required
                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                disabled={!write} onSubmit={() => write?.()}
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                                {isLoading ? 'Please wait...' : 'Proceed to register'}
                            </button>
                            {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
                        </div>
                    </form>

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
    );
}