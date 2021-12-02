import { useState, useEffect } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { formatDistance } from 'date-fns'
import { firestore } from '../firebase/clientApp'

import {
  collection,
  query,
  where,
  limit,
  getDocs
} from '@firebase/firestore'

export default function LogCards () {

  const itemsCollection = collection(firestore, 'items')

  const [items, setItems] = useState([])

  const [loading, setLoading] = useState(true)

  const getItems = async () => {
    const itemsQuery = query(
      itemsCollection,
      where('author', '==', 'richaber@gmail.com'),
      limit(1000)
    )

    const querySnapshot = await getDocs(itemsQuery)

    const result = []

    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data())
      result.push(doc)
    })

    setItems(result)
  }

  useEffect(() => {
    getItems()
    setTimeout(() => {
      setLoading(false)
    }, 2000)
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
