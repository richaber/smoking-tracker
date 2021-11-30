import Head from 'next/head'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { DevTool } from '@hookform/devtools'
import useLocalStorageState from 'use-local-storage-state'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { format, formatDistance } from 'date-fns'
import { v4 as uuidv4 } from 'uuid'

export default function Home () {

  const {
    register,
    control,
    handleSubmit,
    reset,
    setError,
    formState
  } = useForm({})

  const { errors, isSubmitting } = formState

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
          'id': uuidv4(),
          'ts': Math.round((new Date()).getTime() / 1000),
          'animal': data.animal,
          'cut': data.cut,
          'pit_temp': data.pit_temp,
          'internal_temp': data.internal_temp,
          'notes': data.notes,
          'datetime_start': data.datetime_start,
          'datetime_end': data.datetime_end
        }
      ]
    )
    reset()
  }

  function ErrorSummary ({ errors }) {
    if (Object.keys(errors).length === 0) {
      return null
    }
    return (
      <div className="alert">
        <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
          There were errors with your submission.
        </div>
        <div
          className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
          {Object.keys(errors).map((fieldName) => (
            <ErrorMessage
              errors={errors}
              name={fieldName}
              key={fieldName}
              render={({ message }) => <p>{message}</p>}
            />
          ))}
        </div>
      </div>
    )
  }

  const ErrorMessageContainer = ({ children }) => (
    <span
      className="bg-red-50 text-red-700 px-3 rounded relative">{children}</span>
  )

  return (
    <>
      <Head>
        <title>The Pitmaster's Wood Pile</title>
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
                    <label htmlFor="datetime_start" className="">
                      Cook Start Date/Time
                    </label>
                    <Controller
                      control={control}
                      name='datetime_start'
                      render={({ field }) => (
                        <DatePicker
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={15}
                          timeCaption="time"
                          dateFormat="MMMM d, yyyy h:mm aa"
                          placeholderText='Cook start'
                          onChange={(date) => field.onChange(date)}
                          selected={field.value}
                        />
                      )}
                    />
                  </div>

                  <div className="">
                    <label htmlFor="animal" className="">
                      What type of meat are you smoking?
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
                    <label htmlFor="datetime_end" className="">
                      Cook End Date/Time
                    </label>
                    <Controller
                      control={control}
                      name='datetime_end'
                      render={({ field }) => (
                        <DatePicker
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={15}
                          timeCaption="time"
                          dateFormat="MMMM d, yyyy h:mm aa"
                          placeholderText='Cook end'
                          onChange={(date) => field.onChange(date)}
                          selected={field.value}
                        />
                      )}
                    />
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
          <h2 className="text-center font-semibold text-xl tracking-tight">
            The Pitmaster’s Logs
          </h2>
          <div className="container w-100 lg:w-4/5 mx-auto flex flex-col">
            {[...items].reverse().map((item, index) => (
              <div key={`${index}-${item.ts}`}
                   className="flex flex-col md:flex-row overflow-hidden bg-white rounded-lg shadow-xl  mt-4 w-100 mx-2">
                <div className="w-full py-4 px-6 text-gray-800 flex flex-col justify-between">
                  <h3 className="font-semibold text-lg leading-tight truncate">
                    {item.animal} {item.cut} on { new Date(item.datetime_start).toString() }
                  </h3>
                  <p className="mt-2">
                    Cooked to an internal temp of {item.internal_temp}° at a pit temp
                    of {item.pit_temp}°
                    for { formatDistance( new Date( item.datetime_start ), new Date( item.datetime_end ) ) }
                  </p>
                  <p className="mt-2">
                    {item.notes}
                  </p>
                  <p className="text-sm text-gray-700 uppercase tracking-wide font-semibold mt-2">
                    Posted on {new Date(item.ts * 1000).toString()}
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
