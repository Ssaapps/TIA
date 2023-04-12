import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import AlbumTile from './AlbumTile'
import Axios from '../../../Shared/utils/axios_instance'
import AlbumTitleShimmer from './AlbumTileShimmer'

export default function EnterGroupsActionPane({ open, setOpen, selected, setSelected, filesEditable, setFilesEditable, }) {
  const [creatingAlbum, setCreatingAlbum] = useState(false)
  const [albums, setAlbums] = useState([])
  const cancelButtonRef = useRef(null)
  const [fetchingAlbums, setFetchingAlbums] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  //!groups => albums
  const fetchAlbums = async () => {
    setFetchingAlbums(true)
    try {
      const res = await Axios.get("/people")
      console.log(res.data)
      setAlbums(res.data)
    }
    catch (e) {
      console.log(e)
    }
    finally {
      setFetchingAlbums(false)

    }
  }
  useEffect(() => {
    if (open) {
      setCreatingAlbum(false)
      fetchAlbums()

    }

  }, [open])

  const submitAlbumForm = async (e) => {
    e.preventDefault()
    if (!creatingAlbum) return
    const albumName = e.target.title.value
    const albumDescription = e.target.description.value
    const data = {
      name: albumName,
      description: albumDescription,
    }
    try {
      const res = await Axios.post("/people", data)

      const filesEditablesToBeEdited = filesEditable.filter((file, index) => selected.includes(index))
      const filesEditableCopy = [...filesEditable];
      selected.forEach((index) => {
        filesEditableCopy[index].people = res.data
      })
      setFilesEditable([...filesEditableCopy])
      setOpen(false)
      setOpen(false)

      // fetchAlbums()
    }
    catch (e) {
      alert("An error occured while creating album")
    }
  }
  //TOOD: Remame symbols

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

        <form onSubmit={submitAlbumForm} className="fixed inset-0 z-10 overflow-y-auto">
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
                      {creatingAlbum ? "Create a new person " : "Assign to a person"}
                    </Dialog.Title>
                    {creatingAlbum ? (
                      <div onSubmit={submitAlbumForm} className="mt-2  px-3 pt-3 pb-3 sm:px-3">
                        <div className='mb-3'>
                          <label htmlFor="title" className="block text-xs font-medium text-gray-700">
                            Person Name:
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
                          <label for="description" class="block text-xs font-medium text-gray-700">Person Description:</label>
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
                          placeholder="type to search groups"
                        />
                      </div>
                      <div className='mt-3 flex flex-col gap-y-2'>
                        {fetchingAlbums ? (
                          <>
                            <AlbumTitleShimmer />
                            <AlbumTitleShimmer />
                            <AlbumTitleShimmer />
                            <AlbumTitleShimmer />
                            <AlbumTitleShimmer />
                          </>
                        ) :
                          albums.length != 0 ?
                            <>
                              {albums.filter((album) => {
                                if (!searchTerm) return true
                                if (album.name.toLowerCase().includes(searchTerm.toLowerCase()) || album.description.toLowerCase().includes(searchTerm.toLowerCase())) return true
                                else return false
                              }).map((album,) =>
                              (<AlbumTile title={album.name} description={album.description} onClick={() => {
                                const filesEditablesToBeEdited = filesEditable.filter((file, index) => selected.includes(index))
                                const filesEditableCopy = [...filesEditable];
                                selected.forEach((index) => {
                                  filesEditableCopy[index].people = album
                                })
                                setFilesEditable([...filesEditableCopy])
                                setOpen(false)
                              }} />)
                              )}
                            </>

                            : <div>
                              No people created
                            </div>
                        }
                      </div>
                    </div>)}
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3 px-3 sm:px-6 pb-3">
                  <button
                    type={creatingAlbum ? "submit" : "button"}
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-700 px-3 py-1 text-xs  text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-xs"
                    onClick={(e) => {
                      if (creatingAlbum) {
                        // submitAlbumForm()
                      }
                      else {
                        e.preventDefault();
                        setCreatingAlbum(true)

                      }

                    }}
                  >
                    {creatingAlbum ? "Create Person" : "Create New Person"}
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
        </form>
      </Dialog>
    </Transition.Root>
  )
}
