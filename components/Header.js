import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/client'
import styles from './Header.module.css'

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header () {
  const [ session, loading ] = useSession()
  
  return (
    <header className="p-6">
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className={styles.signedInStatus}>
        <h1 className="text-center font-bold text-2xl tracking-tight">
          Welcome to the Pitmaster’s Wood Pile!
        </h1>
        <p className={`nojs-show ${(!session && loading) ? styles.loading : styles.loaded}`}>
          {!session && <>
            <span className={styles.notSignedInText}>You are not signed in</span>
            <span className="float-right">
            <a
              href={`/api/auth/signin`}
              className="inline-flex items-center h-8 px-4 m-2 text-sm text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
              onClick={(e) => {
                e.preventDefault()
                signIn()
              }}
            >
                Sign in
              </a>
            </span>
          </>}
          {session && <>
            {session.user.image && <span style={{backgroundImage: `url(${session.user.image})` }} className={styles.avatar}/>}
            <span className={styles.signedInText}>
              <small>Signed in as</small><br/>
              <strong>{session.user.name || session.user.email}</strong>
            </span>
            <span className="float-right">
            <a
              href={`/api/auth/signout`}
              className="inline-flex items-center h-8 px-4 m-2 text-sm text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
              onClick={(e) => {
                e.preventDefault()
                signOut()
              }}
            >
                Sign out
              </a>
            </span>
          </>}
        </p>
      </div>
    </header>
  )
}
