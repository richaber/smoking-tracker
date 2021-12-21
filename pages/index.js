import Head from 'next/head'
import { useState, useEffect } from 'react'

import { useSession } from 'next-auth/react'
import Layout from '../components/Layout'
import AccessDenied from '../components/AccessDenied'
import LogForm from '../components/LogForm'

export default function Page () {

  const { data: session, status } = useSession()

  const [ content , setContent ] = useState()
  const loading = status === "loading"

  // Fetch content from protected route
  useEffect(()=>{
    const fetchData = async () => {
      const res = await fetch('/api/examples/protected')
      const json = await res.json()
      if (json.content) { setContent(json.content) }
    }
    fetchData()
  },[session])

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  // If no session exists, display access denied message
  if (!session) {
    return  <Layout><AccessDenied/></Layout>
  }

  // If session exists, display content
  return (
    <>
      <Head>
        <title>The Pitmaster’s Wood Pile</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <Layout>
        <LogForm/>
      </Layout>
    </>
  )
}
