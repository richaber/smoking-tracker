import Head from 'next/head'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import useLocalStorageState from 'use-local-storage-state'

export default function Home () {

  const { register, control, handleSubmit, reset, formState: { errors } } = useForm()

  // useLocalStorageState "Returns [value, setValue, { removeItem, isPersistent }]"
  const [items, setItems, {
    removeItem,
    isPersistent
  }] = useLocalStorageState('items', [])

  const onSubmit = data => {
    setItems(
      [
        ...items,
        {
          'ts': Math.round((new Date()).getTime() / 1000),
          'animal': data.animal,
          'cut': data.cut,
          'pit_temp': data.pit_temp,
          'internal_temp': data.internal_temp,
          'cook_time': data.cook_time,
          'notes': data.notes
        }
      ]
    )
    reset()
  }

  return (
    <>
      <Head>
        <title>Smoking App</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <div className="mt-5 md:mt-0 md:col-span-3">

          <h1 className="">
            Welcome to Smoking App!
          </h1>

          <div className="">

            {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
            <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
              {/* register your input into the hook by invoking the "register" function */}

              <div className="">

                <div className="">

                  <div className="">
                    <label htmlFor="animal" className="">
                      What kind of animal are you smoking?
                    </label>
                    <input type="text"
                           placeholder="Pork" {...register('animal', { required: true })} />
                  </div>

                  <div className="">
                    <label htmlFor="cut" className="">
                      What cut of meat are you smoking?
                    </label>
                    <input type="text"
                           placeholder="Butt" {...register('cut', { required: true })} />
                  </div>

                  <div className="">
                    <label htmlFor="weight" className="">
                      How much does the cut weigh?
                    </label>
                    <input type="text"
                           placeholder="10 lbs" {...register('weight', { required: true })} />
                  </div>

                  <div className="">
                    <label htmlFor="pit_temp" className="">
                      What is your target pit temp?
                    </label>
                    <input type="number"
                           placeholder="275" {...register('pit_temp', { required: true })} />°
                    F
                  </div>

                  <div className="">
                    <label htmlFor="internal_temp" className="">
                      What is your target internal meat temp?
                    </label>
                    <input type="number"
                           placeholder="200" {...register('internal_temp', { required: true })} />°
                    F
                  </div>

                  <div className="">
                    <label htmlFor="cook_time" className="">
                      What is your target cook time?
                    </label>
                    <input type="text"
                           placeholder="16 hours" {...register('cook_time', { required: true })} />
                  </div>

                  <div className="">
                    <label htmlFor="notes" className="">
                      Notes about your cook.
                    </label>
                    <textarea
                      placeholder="Using hickory logs, apple chunks, and a water pan..." {...register('notes', { required: true })} />
                  </div>

                </div>

                <div className="content-center">
                  <input type="submit" className="h-12 px-6 m-2 text-lg text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"/>
                </div>

              </div>

            </form>

            <DevTool control={control}/> {/* set up the dev tool */}

          </div>

      </div>

      <div className="mt-5 md:mt-0 md:col-span-3">
        <div id="cards" className="">
          <h2 className="text-center uppercase text-4xl xl:text-5xl">
            Entries
          </h2>
          <div className="container w-100 lg:w-4/5 mx-auto flex flex-col">
            {[...items].reverse().map((item, index) => (
              <div key={`${index}-${item.ts}`}
                   className="flex flex-col md:flex-row overflow-hidden bg-white rounded-lg shadow-xl  mt-4 w-100 mx-2">
                <div className="w-full py-4 px-6 text-gray-800 flex flex-col justify-between">
                  <h3 className="font-semibold text-lg leading-tight truncate">
                    {item.animal} {item.cut}
                  </h3>
                  <p className="mt-2">
                    Cooked to an internal temp of {item.internal_temp}° at a pit temp
                    of {item.pit_temp}° for {item.cook_time}
                  </p>
                  <p className="mt-2">
                    {item.notes}
                  </p>
                  <p className="text-sm text-gray-700 uppercase tracking-wide font-semibold mt-2">
                    {new Date(item.ts * 1000).toString()}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        Smokin'!
      </footer>

    </>
  )
}
