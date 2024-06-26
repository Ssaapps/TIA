/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import React, { Fragment, useEffect, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  Bars3BottomLeftIcon,
  CogIcon,
  HeartIcon,
  HomeIcon,
  MoonIcon,
  PhotoIcon,
  PlusIcon as PlusIconOutline,
  RectangleStackIcon,
  Squares2X2Icon as Squares2X2IconOutline,
  SunIcon,
  UserGroupIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import {
  MagnifyingGlassIcon, RectangleGroupIcon, ShoppingCartIcon,
} from '@heroicons/react/20/solid'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import Logo from "../../Shared/Component/Icons/Logo";
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../Auth/duck/action'
import Avatar from '../../Shared/Component/Profile/Avatar'
import useLocalStorage from '../../Shared/utils/hooks/localStorage'

const navigation = [
  { name: 'Home', href: '/admin', icon: HomeIcon, current: false },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCartIcon, current: false },
  { name: 'Photos', href: '/admin/photos', icon: PhotoIcon, current: true },
  // { name: 'Groups', href: '/admin/groups', icon: RectangleGroupIcon, current: false },
  { name: 'Albums', href: '/admin/albums', icon: RectangleStackIcon, current: false },
  { name: 'Settings', href: '/admin/settings', icon: CogIcon, current: false },
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Admin() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const user = useSelector((state) => state.login.login.user)


  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    document.body.classList.add("h-full")
    document.body.classList.add("overflow-hidden")
  }, [])
  const [theme, setTheme] = useLocalStorage("theme");
  const handleThemeToggle = () => {
    if (theme !== "dark" || (!('theme' in localStorage))) {
      document.documentElement.classList.add('dark')
      setTheme("dark")
    } else {
      document.documentElement.classList.remove('dark')
      setTheme(undefined)
    }

  }


  useEffect(() => {
    handleThemeToggle()

  }, [])

  const userNavigation = [
    { name: 'Your profile', href: '#', onClick: () => { } },
    {
      name: 'Sign out', href: '#', onClick: () => {
        dispatch(logout())
        window.location.replace("/")
      }
    },
  ]
  return (

    < React.Fragment >

      <div className="flex h-screen overflow-auto">
        {/* Narrow sidebar */}
        <div className="hidden w-28 overflow-y-auto bg-indigo-700 md:block">
          <div className="flex w-full flex-col items-center py-6">
            <div className="flex flex-shrink-0 items-center">
              <Link to={"/"}>
                <Logo className={"h-10 fill-white"} />
              </Link>
            </div>
            <div className="mt-6 w-full flex-1 space-y-1 px-2">
              {navigation.map((item) => {
                const current = window.location.pathname === item.href
                return <Link
                  key={item.name}
                  to={item.href}
                  href={item.href}
                  className={classNames(
                    current ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-800 hover:text-white',
                    'group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  <item.icon
                    className={classNames(
                      current ? 'text-white' : 'text-indigo-300 group-hover:text-white',
                      'h-6 w-6'
                    )}
                    aria-hidden="true"
                  />
                  <span className="mt-2">{item.name}</span>
                </Link>
              })}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <Transition.Root show={mobileMenuOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 md:hidden" onClose={setMobileMenuOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-indigo-700 pt-5 pb-4">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-1 right-0 -mr-14 p-1">
                      <button
                        type="button"
                        className="flex h-12 w-12 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                        <span className="sr-only">Close sidebar</span>
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex flex-shrink-0 items-center px-4">
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=white"
                      alt="Your Company"
                    />
                  </div>
                  <div className="mt-5 h-0 flex-1 overflow-y-auto px-2">
                    <nav className="flex h-full flex-col">
                      <div className="space-y-1">
                        {navigation.map((item) => {
                          const current = window.location.pathname === item.href

                          return <Link
                            to={item.href}
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              current
                                ? 'bg-indigo-800 text-white'
                                : 'text-indigo-100 hover:bg-indigo-800 hover:text-white',
                              'group py-2 px-3 rounded-md flex items-center text-sm font-medium'
                            )}
                            aria-current={current ? 'page' : undefined}
                          >
                            <item.icon
                              className={classNames(
                                current ? 'text-white' : 'text-indigo-300 group-hover:text-white',
                                'mr-3 h-6 w-6'
                              )}
                              aria-hidden="true"
                            />
                            <span>{item.name}</span>
                          </Link>
                        })}
                      </div>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Content area */}
        <div className="flex flex-1 bg-gray-50 dark:bg-gray-900 transition duration-300   flex-col overflow-hidden">
          <header className="w-full">
            <div className="relative z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white dark:bg-gray-900 transition duration-300 duration-300  dark:shadow-none dark:border-white/10 shadow-sm">
              <button
                type="button"
                className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="flex flex-1 justify-between px-4 sm:px-6">
                <div className="flex flex-1">
                </div>
                <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative flex-shrink-0">
                    <div>
                      <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <span className="sr-only">Open user menu</span>
                        {/* <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                          alt=""
                        /> */}
                        <Avatar alt={user?.name} />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name} onClick={item.onClick}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>

                  <button
                    type="button"
                    onClick={() => { navigate("/admin/upload") }}
                    className="flex items-center justify-center rounded-full bg-indigo-600 p-1 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <PlusIconOutline className="h-6 w-6" aria-hidden="true" />
                    <span className="sr-only">Add file</span>
                  </button>

                  <div className="w-[1px] bg-gray-300 dark:bg-gray-400 h-7"></div>
                  <button className="rounded-full shadow w-9 h-9 flex items-center justify-center dark:bg-white/10" type="button" onClick={handleThemeToggle}>
                    {/* {<MoonIcon className="h-6 w-6 text-gray-600" aria-hidden="true" />} */}
                    {theme == "dark" ? <MoonIcon className="h-5 w-5 text-zinc-400 hover:text-zinc-400" aria-hidden="true" /> :
                      <SunIcon className="h-5 w-5 text-teal-600 hover:text-teal-400" aria-hidden="true" />}
                  </button>
                </div>
              </div>
            </div>
          </header>
          <Outlet />
        </div>
      </div>
    </React.Fragment>
  )
}
