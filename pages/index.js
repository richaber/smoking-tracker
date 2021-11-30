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

      <header
        className="flex items-center justify-between flex-wrap bg-gray-100 p-6 shadow-xl">
        <div className="flex items-center flex-no-shrink mr-6">
          <h1 className="font-semibold text-xl tracking-tight">
            Welcome to the Pitmaster's Wood Pile!
          </h1>
        </div>
      </header>

      <div className="flex justify-center">

        <div className="container mx-auto">

          <div className="mt-8 max-w-full">

            <div className="">

              {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
              <form className="space-y-4 text-gray-700" onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}

                <div className="flex flex-wrap -mx-2 space-y-4 md:space-y-0">
                  <div className="w-full px-2 md:w-1/3">
                    <label htmlFor="animal" className="block mb-1">
                      <span
                        className="text-gray-700">Type of meat</span>
                    </label>
                    <input type="text"
                           className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                           placeholder="Pork"
                           {
                             ...register(
                               'animal',
                               {
                                 required: 'The type of meat is a required field.'
                               }
                             )
                           } />
                    <ErrorMessage errors={errors} name="animal"
                                  as={<ErrorMessageContainer/>}/>
                  </div>
                  <div className="w-full px-2 md:w-1/3">
                    <label htmlFor="cut" className="block mb-1">
                      <span
                        className="text-gray-700">Cut of meat</span>
                    </label>
                    <input type="text"
                           className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                           placeholder="Butt"
                           {
                             ...register(
                               'cut',
                               {
                                 required: 'The cut of meat is a required field.'
                               }
                             )
                           } />
                    <ErrorMessage errors={errors} name="cut"
                                  as={<ErrorMessageContainer/>}/>
                  </div>
                  <div className="w-full px-2 md:w-1/3">
                    <label htmlFor="weight" className="block mb-1">
                      <span className="text-gray-700">Weight</span>
                    </label>
                    <input type="text"
                           className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                           placeholder="10 lbs"
                           {
                             ...register(
                               'weight',
                               {
                                 required: 'The weight of the meat is a required field.'
                               }
                             )
                           } />
                    <ErrorMessage errors={errors} name="weight"
                                  as={<ErrorMessageContainer/>}/>
                  </div>
                </div>

                <div className="flex flex-wrap -mx-2 space-y-4 md:space-y-0">
                  <div className="w-full px-2 md:w-1/2">
                    <label htmlFor="pit_temp" className="block mb-1">
                      <span
                        className="text-gray-700">Target pit temp (° F)</span>
                    </label>
                    <input type="number"
                           className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                           placeholder="275"
                           {
                             ...register(
                               'pit_temp',
                               {
                                 required: 'The target pit temp is required field.'
                               }
                             )
                           } />
                    <ErrorMessage errors={errors} name="pit_temp"
                                  as={<ErrorMessageContainer/>}/>
                  </div>
                  <div className="w-full px-2 md:w-1/2">
                    <label htmlFor="internal_temp" className="block mb-1">
                      <span className="text-gray-700">Target internal temp (° F)</span>
                    </label>
                    <input type="number"
                           className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                           placeholder="200"
                           {
                             ...register(
                               'internal_temp',
                               {
                                 required: 'The target internal temp is a required field.'
                               }
                             )
                           } />
                    <ErrorMessage errors={errors} name="internal_temp"
                                  as={<ErrorMessageContainer/>}/>
                  </div>
                </div>

                <div className="flex flex-wrap -mx-2 space-y-4 md:space-y-0">
                  <div className="w-full px-2 md:w-1/2">
                    <label htmlFor="datetime_start" className="block mb-1">
                      <span className="text-gray-700">Cook Start Date/Time</span>
                    </label>
                    <Controller
                      rules={{ required: 'The cook start date/time is a required' +
                          ' field.' }}
                      control={control}
                      name="datetime_start"
                      render={({ field }) => (
                        <DatePicker
                          className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={15}
                          timeCaption="time"
                          dateFormat="MMMM d, yyyy h:mm aa"
                          placeholderText="Cook start"
                          onChange={(date) => field.onChange(date)}
                          selected={field.value}
                        />
                      )}
                    />
                    <ErrorMessage errors={errors} name="datetime_start"
                                  as={<ErrorMessageContainer/>}/>
                  </div>

                  <div className="w-full px-2 md:w-1/2">
                    <label htmlFor="datetime_end" className="block mb-1">
                      <span className="text-gray-700">Cook End Date/Time</span>
                    </label>
                    <Controller
                      rules={{ required: 'The cook end date/time is a required' +
                          ' field.' }}
                      control={control}
                      name="datetime_end"
                      render={({ field }) => (
                        <DatePicker
                          className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={15}
                          timeCaption="time"
                          dateFormat="MMMM d, yyyy h:mm aa"
                          placeholderText="Cook end"
                          onChange={(date) => field.onChange(date)}
                          selected={field.value}
                        />
                      )}
                    />
                    <ErrorMessage errors={errors} name="datetime_end"
                                  as={<ErrorMessageContainer/>}/>
                  </div>
                </div>

                <div className="flex flex-wrap -mx-2 space-y-4 md:space-y-0">
                  <div className="w-full px-2">
                    <label htmlFor="notes" className="block mb-1">
                      <span className="text-gray-700">Log Notes</span>
                    </label>
                    <textarea
                      className="resize-y form-textarea block w-full px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                      rows="3"
                      placeholder="Using hickory logs, apple chunks, and a water pan..."
                      {
                        ...register(
                          'notes',
                          {
                            required: 'Notes about the cook is a required field.'
                          }
                        )
                      } />
                    <ErrorMessage errors={errors} name="notes"
                                  as={<ErrorMessageContainer/>}/>
                  </div>
                </div>

                <div className="flex flex-wrap -mx-2 space-y-4 md:space-y-0">
                  <div className="w-full px-2">
                    <ErrorSummary errors={errors}/>
                  </div>
                </div>

                <div className="">
                  <input type="submit"
                         className="h-12 px-6 m-2 text-lg text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"/>
                </div>

              </form>

            </div>

          </div>

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
              <div key={`${item.id}`}
                   id={item.id}
                   className="flex flex-col md:flex-row overflow-hidden bg-white rounded-lg shadow-xl  mt-4 w-100 mx-2">
                <div
                  className="w-full py-4 px-6 text-gray-800 flex flex-col justify-between">
                  <h3 className="font-semibold text-lg leading-tight truncate">
                    {item.animal} {item.cut} on {new Date(item.datetime_start).toString()}
                  </h3>
                  <p className="mt-2">
                    Cooked to an internal temp of {item.internal_temp}° at a pit temp
                    of {item.pit_temp}°
                    for {formatDistance(new Date(item.datetime_start), new Date(item.datetime_end))}
                  </p>
                  <p className="mt-2">
                    {item.notes}
                  </p>
                  <p
                    className="text-sm text-gray-700 uppercase tracking-wide font-semibold mt-2">
                    Posted on {new Date(item.ts * 1000).toString()}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>

      <footer className="flex items-center justify-center w-full h-24 bg-gray-100">
        Smokin'!
      </footer>

    </>
  )
}
