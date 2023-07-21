/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  const colors = require('tailwindcss/colors')
  
  module.exports = {
    // ...
    theme: {
      extend: {
        colors: {
          orange: colors.orange,
        },
      },
    },
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useState } from 'react'
import { Disclosure, Menu, RadioGroup, Switch, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon, QuestionMarkCircleIcon } from '@heroicons/react/20/solid'
import {
    Bars3Icon,
    BellIcon,
    CogIcon,
    CreditCardIcon,
    KeyIcon,
    SquaresPlusIcon,
    UserCircleIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import ProfileSection from './ProfileSection'
import AccountSection from './AccountSection'
import PurchasesSection from './PurchasesSection'



const subNavigation = [
    { name: 'Profile', href: '#', icon: UserCircleIcon, current: true },
    { name: 'Account', href: '#', icon: CogIcon, current: false },
    { name: 'Purchases', href: '#', icon: CreditCardIcon, current: false },
]



const sections = [
    <ProfileSection />,
    <AccountSection />,
    <PurchasesSection />
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Profile() {
    const [currentTab, setCurrentTab] = useState(0)

    return (
        <>
            {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
            <div className="h-full">


                <main className="mx-auto pb-10 lg:py-1 lg:px-8">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
                        <aside className="py-6 px-2 sm:px-6 lg:col-span-3  h-max lg:py-0 lg:px-0  bg-white border shadow rounded">
                            <nav className="sticky top-0">
                                {subNavigation.map((item, index) => {
                                    const isCurrent = currentTab === index
                                    return (<a
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setCurrentTab(index)}
                                        className={classNames(
                                            isCurrent
                                                ? 'bg-gray-50 text-[#1e4570] hover:bg-white'
                                                : 'text-gray-900 hover:text-gray-900 hover:bg-gray-50',
                                            'group rounded-md px-6 py-4 flex items-center text-sm font-medium'
                                        )}
                                        aria-current={isCurrent ? 'page' : undefined}
                                    >
                                        <item.icon
                                            className={classNames(
                                                isCurrent ? 'text-[#1e4570]' : 'text-gray-400 group-hover:text-gray-500',
                                                'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
                                            )}
                                            aria-hidden="true"
                                        />
                                        <span className="truncate">{item.name}</span>
                                    </a>
                                    )
                                }
                                )}
                            </nav>
                        </aside>

                        {/* Payment details */}
                        <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
                            {sections[currentTab]}
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}
