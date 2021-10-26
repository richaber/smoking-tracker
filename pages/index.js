import Head from 'next/head'
import {useState} from "react";
import useLocalStorageState from 'use-local-storage-state'

export default function Home() {

    const [query, setQuery] = useState("");

    const [items, setItems] = useLocalStorageState("items", []);

    function onClick() {
        setQuery("");
        setItems([...items, query]);
    }

    function handleSubmit(event) {
        setQuery("");
        setItems([...items, query]);
        event.preventDefault();
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Head>
                <title>Smoking App</title>
                // https://nextjs.org/docs/basic-features/static-file-serving
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                <h1 className="text-3xl font-bold">
                    Welcome to{' '}
                    <a className="text-blue-600" href="https://nextjs.org">
                        Smoking App!
                    </a>
                </h1>

                <p className="mt-3 text-base">
                    Enter some text below and hit submit.
                </p>

                <div>
                    <form onSubmit={handleSubmit}>
                        <label className="block text-left">
                            <span className="text-gray-700">This is a textarea</span>
                            <textarea className="form-textarea mt-1 block w-full border-solid border-4 border-light-blue-500" placeholder="Type something here." value={query} onChange={(e) => setQuery(e.target.value)}/>
                        </label>
                        <input type="submit" value="Submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"/>
                    </form>
                </div>

                <div>
                    {items.map((item) => (
                        <div>{item}</div>//<div dangerouslySetInnerHTML={{__html: item}}></div>
                    ))}
                </div>

            </main>

            <footer className="flex items-center justify-center w-full h-24 border-t">
                <a
                    className="flex items-center justify-center"
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2"/>
                    // https://nextjs.org/docs/basic-features/static-file-serving
                </a>
            </footer>
        </div>
    )
}
