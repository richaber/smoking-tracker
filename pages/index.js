import Head from 'next/head';
import {useState} from "react";
import useLocalStorageState from 'use-local-storage-state';

export default function Home() {

    // useState "Returns a stateful value, and a function to update it."
    const [query, setQuery] = useState("");

    // useLocalStorageState "Returns [value, setValue, { removeItem, isPersistent }]"
    const [items, setItems, {removeItem, isPersistent}] = useLocalStorageState("items", []);

    function handleSubmit(event) {
        setQuery("");
        setItems(
            [...items, { "ts": Math.round((new Date()).getTime() / 1000), "value": query } ]
        );
        event.preventDefault();
    }

    return (
        <>
            <Head>
                <title>Smoking App</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <div>
                <div class="md:grid md:grid-cols-3 md:gap-6">

                    <h1 className="text-3xl font-bold">
                        Welcome to Smoking App!
                    </h1>

                    <div class="mt-5 md:mt-0 md:col-span-3">

                        <form onSubmit={handleSubmit}>

                            <div class="shadow sm:rounded-md sm:overflow-hidden">

                                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">

                                    <div>
                                        <label for="about" class="block text-sm font-medium text-gray-700">
                                            Tell us about your smoking desires
                                        </label>
                                        <div class="mt-1">
                                            <textarea id="smoked" name="smoked" rows="3"
                                                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                      placeholder="What is it you truly desire to smoke?"
                                                      onChange={(e) => setQuery(e.target.value)}
                                                      value={query} />
                                        </div>
                                        <p class="mt-2 text-sm text-gray-500 text-center">
                                            Enter a few sentences describing your smoking desires.
                                        </p>
                                    </div>

                                </div>

                                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <input type="submit" value="Submit"
                                           className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"/>
                                </div>

                            </div>
                        </form>

                    </div>

                    <div className="mt-5 md:mt-0 md:col-span-3">
                        <div id="cards" className="">
                            <h2 className="text-center uppercase text-4xl xl:text-5xl">
                                Entries
                            </h2>
                            <div className="container w-100 lg:w-4/5 mx-auto flex flex-col">
                                {items.map((item, index) => (
                                    <div key={`${index}-${item.value}`}
                                        className="flex flex-col md:flex-row overflow-hidden bg-white rounded-lg shadow-xl  mt-4 w-100 mx-2">
                                        <div className="w-full py-4 px-6 text-gray-800 flex flex-col justify-between">
                                            <h3 className="font-semibold text-lg leading-tight truncate">TITLE</h3>
                                            <p className="mt-2">
                                                {item.value}
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

                </div>

            </div>

            <footer className="flex items-center justify-center w-full h-24 border-t">
                <a
                    className="flex items-center justify-center"
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2"/>
                </a>
            </footer>

        </>
    )
}
