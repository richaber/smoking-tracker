import { useState, useEffect, useRef } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { formatDistance } from 'date-fns'
import { firestore } from '../firebase/fireStore'
import { signIn, signOut, useSession } from 'next-auth/client'

import {
  collection,
  enableIndexedDbPersistence,
  limit,
  onSnapshot,
  query,
  where
} from '@firebase/firestore'

export default function LogCards () {

  const [ session, loading ] = useSession()

  const [items, setItems] = useState([])

  const [loading, setLoading] = useState(true)

  // Not sure if this is "the right way" but need some reference to the "current" items
  // in the useEffect hook, in order to update with onSnapshot changes.
  const itemsRef = useRef( items )

  useEffect(() => {

    enableIndexedDbPersistence(firestore)
      .catch((err) => {
        if (err.code === 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
          console.log(err)
        } else if (err.code === 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
          console.log(err)
        }
      })

    const itemsCollection = collection(firestore, 'items')

    const handleItemsChanges = (snapshot) => {
      const changes = snapshot.docChanges()
      console.log('changes', changes)

      // Need to figure out how to deal with the reindexing of objects...
      // newIndex: 0
      // oldIndex: -1
      changes.forEach((change) => {
        if (change.type === 'added') {
          itemsRef.current.push( change.doc )
        }
        if (change.type === 'removed') {
          // Need to figure out how to handle when one is removed.
        }
      })

      console.log( 'itemsRef.current', itemsRef.current );

      // Use the setState callback
      setItems( items )
      setLoading( false )
    }

    const itemsQuery = query(
      itemsCollection,
      where('author', '==', session.user.email),
      limit(1000)
    )

    // Create the DB listener
    const unsubscribe = onSnapshot( itemsQuery, handleItemsChanges,
      err => console.log(err))
    return () => {
      unsubscribe()
    }
  }, [])


  return (
    <>
      <section className="mt-10 md:mt-10 md:col-span-3">
        <header>
          <h2 className="text-center font-semibold text-xl tracking-tight">
            The Pitmaster’s Logs
          </h2>
        </header>
        <div className="container w-100 lg:w-4/5 mx-auto flex flex-col">

          {
            loading ? (
                <div
                  className="flex flex-col md:flex-row overflow-hidden bg-white border rounded-lg shadow-xl  mt-4 w-100 mx-2">
                  <div
                    className="w-full py-4 px-6 text-gray-800 flex flex-col justify-between">
                    <h3 className="font-semibold text-lg leading-tight truncate">
                      Loading...
                    </h3>
                  </div>
                </div>
              ) :
              items.length === 0 ? (
                <div
                  className="flex flex-col md:flex-row overflow-hidden bg-white border rounded-lg shadow-xl  mt-4 w-100 mx-2">
                  <div
                    className="w-full py-4 px-6 text-gray-800 flex flex-col justify-between">
                    <h3 className="font-semibold text-lg leading-tight truncate">
                      No logs
                    </h3>
                    <p className="mt-2">
                      Consider throwing a log on the pile
                    </p>
                  </div>
                </div>
              ) : (
                items.map((item) => {
                  let data = item.data()
                  console.log('data', data)
                  return (

                    <div key={item.id} id={item.id}
                         className="flex flex-col md:flex-row overflow-hidden bg-white border rounded-lg shadow-xl  mt-4 w-100 mx-2">

                      <div
                        className="w-full py-4 px-6 text-gray-800 flex flex-col justify-between">
                        <h3 className="font-semibold text-lg leading-tight truncate">
                          {data.animal} {data.cut} on {new Date(data.datetime_start ).toString()}
                        </h3>
                        <p className="mt-2">
                          Cooked to an internal temp of {data.internal_temp}° at a pit
                          temp
                          of {data.pit_temp}°
                          for {formatDistance(new Date(data.datetime_start ), new Date(data.datetime_end ))}
                        </p>
                        <p className="mt-2">
                          {data.notes}
                        </p>
                        <p
                          className="text-sm text-gray-700 uppercase tracking-wide font-semibold mt-2">
                          Posted on {new Date(data.ts ).toString()}
                        </p>
                      </div>

                    </div>

                  )
                })
              )
          }
        </div>
      </section>

    </>
  )
}
