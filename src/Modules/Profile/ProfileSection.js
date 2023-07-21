import React from 'react'
import { useSelector } from 'react-redux'

function ProfileSection() {
    const user = useSelector((state) => state.login.login.user)
    return (
        <div className=" divide-y divide-gray-200">
            <div className="space-y-1">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
                {/* <p className="max-w-2xl text-sm text-gray-500">This information will be displayed publicly so be careful what you share.</p> */}
            </div>
            <div className="mt-6">
                <dl className="divide-y divide-gray-200">
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                        <dt className="text-sm font-medium text-gray-500">Name</dt>
                        <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            <span className="flex-grow">{user?.name}</span>

                        </dd>
                    </div>

                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                        <dt className="text-sm font-medium text-gray-500">Email</dt>
                        <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            <span className="flex-grow">{user?.email}</span>

                        </dd>
                    </div>

                </dl>
            </div>
        </div>
    )
}

export default ProfileSection