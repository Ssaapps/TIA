import React, { useState } from 'react'
import { Disclosure, Menu, RadioGroup, Transition } from '@headlessui/react'
import { HomeIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
const user = {
    name: 'Floyd Miles',
    email: 'floyd.miles@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  }
  const navigation = [
    { name: 'Dashboard', href: '#' },
    { name: 'Jobs', href: '#' },
    { name: 'Applicants', href: '#' },
    { name: 'Company', href: '#' },
  ]
  const breadcrumbs = [
    { name: 'Projects', href: '#', current: false },
    { name: 'Project Nero', href: '#', current: true },
  ]
  const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
  ]
  const team = [
    {
      name: 'Calvin Hawkins',
      email: 'calvin.hawkins@example.com',
      imageUrl:
        'https://images.unsplash.com/photo-1513910367299-bce8d8a0ebf6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      name: 'Bessie Richards',
      email: 'bessie.richards@example.com',
      imageUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      name: 'Floyd Black',
      email: 'floyd.black@example.com',
      imageUrl:
        'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ]
  const settings = [
    { name: 'Public access', description: 'This project would be available to anyone who has the link' },
    { name: 'Private to Project Members', description: 'Only members of this project would be able to access' },
    { name: 'Private to you', description: 'You are the only one able to access this project' },
  ]
function Settings() {
    const [selected, setSelected] = useState(settings[0])

  return (
    
    <main className="mx-auto max-w-lg px-4 pt-10 pb-12 lg:pb-16">
    <form>
      <div className="space-y-6">
        <div>
          <h1 className="text-lg font-medium leading-6 text-gray-900">Project Settings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Let’s get started by filling in the information below to create your new project.
          </p>
        </div>

        <div>
          <label htmlFor="project-name" className="block text-sm font-medium text-gray-700">
            Project Name
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="project-name"
              id="project-name"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
              defaultValue="Project Nero"
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <div className="mt-1">
            <textarea
              id="description"
              name="description"
              rows={3}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
              defaultValue={''}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="space-y-1">
            <label htmlFor="add-team-members" className="block text-sm font-medium text-gray-700">
              Add Team Members
            </label>
            <p id="add-team-members-helper" className="sr-only">
              Search by email address
            </p>
            <div className="flex">
              <div className="flex-grow">
                <input
                  type="text"
                  name="add-team-members"
                  id="add-team-members"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                  placeholder="Email address"
                  aria-describedby="add-team-members-helper"
                />
              </div>
              <span className="ml-3">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                >
                  <PlusIcon className="-ml-2 mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                  <span>Add</span>
                </button>
              </span>
            </div>
          </div>

          <div className="border-b border-gray-200">
            <ul role="list" className="divide-y divide-gray-200">
              {team.map((person) => (
                <li key={person.email} className="flex py-4">
                  <img className="h-10 w-10 rounded-full" src={person.imageUrl} alt="" />
                  <div className="ml-3 flex flex-col">
                    <span className="text-sm font-medium text-gray-900">{person.name}</span>
                    <span className="text-sm text-gray-500">{person.email}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label className="text-sm font-medium text-gray-900">Privacy</RadioGroup.Label>

          <div className="isolate mt-1 -space-y-px rounded-md bg-white shadow-sm">
            {settings.map((setting, settingIdx) => (
              <RadioGroup.Option
                key={setting.name}
                value={setting}
                className={({ checked }) =>
                  classNames(
                    settingIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                    settingIdx === settings.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
                    checked ? 'bg-sky-50 border-sky-200 z-10' : 'border-gray-200',
                    'relative border p-4 flex cursor-pointer focus:outline-none'
                  )
                }
              >
                {({ active, checked }) => (
                  <>
                    <span
                      className={classNames(
                        checked ? 'bg-sky-600 border-transparent' : 'bg-white border-gray-300',
                        active ? 'ring-2 ring-offset-2 ring-sky-500' : '',
                        'mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center'
                      )}
                      aria-hidden="true"
                    >
                      <span className="rounded-full bg-white w-1.5 h-1.5" />
                    </span>
                    <span className="ml-3 flex flex-col">
                      <RadioGroup.Label
                        as="span"
                        className={classNames(
                          checked ? 'text-sky-900' : 'text-gray-900',
                          'block text-sm font-medium'
                        )}
                      >
                        {setting.name}
                      </RadioGroup.Label>
                      <RadioGroup.Description
                        as="span"
                        className={classNames(checked ? 'text-sky-700' : 'text-gray-500', 'block text-sm')}
                      >
                        {setting.description}
                      </RadioGroup.Description>
                    </span>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
            Tags
          </label>
          <input
            type="text"
            name="tags"
            id="tags"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-sky-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            Create this project
          </button>
        </div>
      </div>
    </form>
  </main>
  )
}

export default Settings