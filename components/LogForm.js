import { Controller, useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { DevTool } from '@hookform/devtools'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { v4 as uuidv4 } from 'uuid'
import LogCards from '../components/LogCards'
import { doc, setDoc } from '@firebase/firestore'
import { firestore } from '../firebase/fireStore'

export default function LogForm () {

  const {
    register,
    control,
    handleSubmit,
    reset,
    setError,
    formState
  } = useForm({})

  const { errors, isSubmitting } = formState

  const onSubmit = async (data) => {
    console.log('data', data)
    // get the current timestamp
    const timestamp = new Date().getTime()
    // create a pointer to our Document
    const _item = doc(firestore, `items/${timestamp}`)
    // structure the item data
    const itemData = {
      'id': uuidv4(),
      'ts': timestamp,
      'author': 'richaber@gmail.com', // @todo Hard-code until I figure out auth
      'animal': data.animal,
      'cut': data.cut,
      'pit_temp': data.pit_temp,
      'internal_temp': data.internal_temp,
      'notes': data.notes,
      'datetime_start': new Date(data.datetime_start).getTime(),
      'datetime_end': new Date(data.datetime_end).getTime()
    }

    try {
      console.log('itemData', itemData)
      await setDoc(_item, itemData)
      reset()
    } catch (error) {
      setError('apiError', { message: error })
    }
  }

  function ErrorSummary ({ errors }) {
    if (Object.keys(errors).length === 0) {
      return null
    }
    return (
      <div className="alert">
        <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
          There are errors with your submission.
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
    <span className="bg-red-50 text-red-700 px-3 rounded relative">
      {children}
    </span>
  )

  return (
    <>

      <section className="flex justify-center">

        <div className="container mx-auto">

          <h1 className="text-center font-semibold text-xl tracking-tight">
            Throw Another Log On The Pile!
          </h1>

          <div className="mt-8 max-w-full">

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
                    rules={{
                      required: 'The cook start date/time is a required' +
                        ' field.'
                    }}
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
                    rules={{
                      required: 'The cook end date/time is a required' +
                        ' field.'
                    }}
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

              <div className="flex flex-wrap -mx-2 space-y-4 md:space-y-0 items-center">
                <div className="w-full px-2">
                  <input type="submit"
                         className="w-full h-12 px-6 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"/>
                </div>
              </div>

            </form>

          </div>

          <DevTool control={control}/> {/* set up the dev tool */}

        </div>
      </section>

      <LogCards/>

    </>
  )
}
