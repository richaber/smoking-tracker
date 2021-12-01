import { Controller, useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { DevTool } from '@hookform/devtools'
import { useLocalStorageState } from 'use-local-storage-state'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { formatDistance } from 'date-fns'
import { v4 as uuidv4 } from 'uuid'

export default function LogCards (props) {

  const items = props.items;

  return (
    <>

      <section className="mt-10 md:mt-10 md:col-span-3">
        <header>
          <h2 className="text-center font-semibold text-xl tracking-tight">
            The Pitmaster’s Logs
          </h2>
        </header>
        <div className="container w-100 lg:w-4/5 mx-auto flex flex-col">
          {[...items].reverse().map((item, index) => (
            <div key={`${item.id}`}
                 id={item.id}
                 className="flex flex-col md:flex-row overflow-hidden bg-white border rounded-lg shadow-xl  mt-4 w-100 mx-2">
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
      </section>

    </>
  )
}
