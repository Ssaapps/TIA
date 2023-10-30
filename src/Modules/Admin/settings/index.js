import React, { useState } from 'react'

import { RadioGroup } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


function Settings() {
  const [status, setStatus] = useState("alert")

  return (

    <main className=" grid grid-cols-2 px-4 pt-10 pb-12 space-x-10 lg:pb-16">
      <div>
        <div>
          <h1 className="text-lg font-medium leading-6 text-gray-900">Featured Images</h1>

        </div>
      </div>
      <form>
        <div className="space-y-6">
          <div>
            <h1 className="text-lg font-medium leading-6 text-gray-900">Home Banner</h1>
            <p className="mt-1 text-sm text-gray-500">
              Set the text that should appear at the top of the home page
            </p>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Body
            </label>
            <div className="mt-1">
              <textarea
                id="description"
                name="description"
                rows={3}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                defaultValue={''}
              />
            </div>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <div className="mt-1">
              <RadioGroup value={status} onChange={setStatus} className="mt-2">
                <RadioGroup.Label className="sr-only">Choose a status</RadioGroup.Label>
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                  <RadioGroup.Option
                    value={"alert"}
                    className={({ active, checked }) =>
                      classNames(
                        active ? 'ring-2 ring-red-600 ring-offset-2' : '',
                        checked
                          ? 'bg-red-500 ring-red-700 ring-2 ring-offset-2 text-white hover:bg-red-500'
                          : 'ring-1 ring-inset ring-red-300 bg-white text-red-600 hover:bg-gray-50',
                        'flex items-center justify-center rounded-3xl py-3 px-3 text-sm font-semibold uppercase sm:flex-1'
                      )
                    }
                  // disabled={!option.inStock}
                  >
                    <RadioGroup.Label as="span">{"Alert"}</RadioGroup.Label>
                  </RadioGroup.Option>
                  <RadioGroup.Option
                    value={"warning"}
                    className={({ active, checked }) =>
                      classNames(
                        active ? 'ring-2 ring-yellow-600  ring-offset-2' : '',
                        checked
                          ? 'bg-yellow-500 text-black ring-yellow-700 ring-2 ring-offset-2 hover:bg-yellow-500'
                          : 'ring-1 ring-inset ring-yellow-300 bg-white text-yellow-600 hover:bg-gray-50',
                        'flex items-center justify-center rounded-3xl py-3 px-3 text-sm font-semibold uppercase sm:flex-1'
                      )
                    }
                  // disabled={!option.inStock}
                  >
                    <RadioGroup.Label as="span">{"Warning"}</RadioGroup.Label>
                  </RadioGroup.Option>
                  <RadioGroup.Option
                    value={"info"}
                    className={({ active, checked }) =>
                      classNames(
                        active ? 'ring-2 ring-blue-600 ring-offset-2' : '',
                        checked
                          ? 'bg-blue-500 text-white ring-blue-700 ring-2 ring-offset-2 hover:bg-blue-500'
                          : 'ring-1 ring-inset ring-blue-300 bg-white text-blue-600 hover:bg-gray-50',
                        'flex items-center justify-center rounded-3xl py-3 px-3 text-sm font-semibold uppercase sm:flex-1'
                      )
                    }
                  // disabled={!option.inStock}
                  >
                    <RadioGroup.Label as="span">{"Info"}</RadioGroup.Label>
                  </RadioGroup.Option>

                </div>
              </RadioGroup>
            </div>
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
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save
            </button>
          </div>
        </div>

      </form >
    </main >
  )
}

export default Settings