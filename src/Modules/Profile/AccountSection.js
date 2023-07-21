import React from 'react'

function AccountSection() {
    return (
        <section aria-labelledby="payment-details-heading">
            <form action="#" method="POST">
                <div className=" sm:overflow-hidden sm:rounded-md">
                    <div className="bg-white py-6 px-4 sm:p-6">
                        <div>
                            <h2 id="payment-details-heading" className="text-lg font-medium leading-6 text-gray-900">
                                Account Details
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Update your login information
                            </p>
                        </div>

                        <div className="mt-6 grid grid-cols-4 gap-6">
                            <div className="col-span-4 sm:col-span-2">
                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    type="text"
                                    name="password"
                                    id="password"
                                    autoComplete="cc-given-name"
                                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 -sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                                />
                            </div>

                            <div className="col-span-4 sm:col-span-2">
                                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                    Confirm Password
                                </label>
                                <input
                                    type="text"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    autoComplete="cc-family-name"
                                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 -sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                                />
                            </div>

                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                        <button
                            type="submit"
                            className="inline-flex justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white -sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </section>
    )
}

export default AccountSection