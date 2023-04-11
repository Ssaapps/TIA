import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import AlbumTile from './AlbumTile'

export default function EnterAlbumActionPane({open,setOpen}) {
  const [creatingAlbum, setCreatingAlbum] = useState(false)
  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm ">
                <div>

                  <div className="">
                    <Dialog.Title as="h3" className="text-md bg-gray-200 py-3 px-3  sm:pt-2 font-medium leading-6 text-gray-900">
                      {creatingAlbum ? "Make a new album of these photos " : "Add these photos to album"}
                    </Dialog.Title>
                    {creatingAlbum ? (
                      <div className="mt-2  px-3 pt-3 pb-3 sm:px-3">
                        <div className='mb-3'>
                          <label htmlFor="title" className="block text-xs font-medium text-gray-700">
                            Album title:
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="title"
                              id="title"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-baseYellow focus:ring-baseYellow sm:text-xs"
                              placeholder=""
                            />
                          </div>
                        </div>

                        <div>
                          <label for="description" class="block text-xs font-medium text-gray-700">Album Description:</label>
                          <div class="mt-1">
                            <textarea rows="4" name="description" id="description" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-xs" />
                          </div>
                        </div>
                      </div>
                    ) : (<div className="mt-2  px-3 pt-3 pb-3 sm:px-3">
                      <div className="mty-1">
                        <input
                          type="text"
                          name="search"
                          id="search"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-baseYellow focus:ring-baseYellow sm:text-xs"
                          placeholder="type to search your albums"
                        />
                      </div>
                      <div className='mt-3 flex flex-col gap-y-2'>
                        <AlbumTile />
                        <AlbumTile />
                        <AlbumTile />
                        <AlbumTile />
                        <AlbumTile />
                        <AlbumTile />


                      </div>
                    </div>)}
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3 px-3 sm:px-6 pb-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-700 px-3 py-1 text-xs  text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-xs"
                    onClick={() => {
                      if (creatingAlbum) {
                        setOpen(false)
                      } else {
                        setCreatingAlbum(true)
                      }
                    }}
                  >
                    Create new album
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-3 py-1 text-xs    text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-xs"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
