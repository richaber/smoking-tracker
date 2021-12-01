import { signIn } from 'next-auth/client'

export default function AccessDenied () {
  return (
    <>

      <section className="flex justify-center">
        <div className="container mx-auto">
          <div className="mt-8 max-w-full">

            <h2 className="text-center font-bold text-xl tracking-tight">
              Access Denied
            </h2>
            <p className="text-center">
              <a href="/api/auth/signin"
                 className="text-blue-600 visited:text-purple-600 underline hover:no-underline"
                 onClick={(e) => {
                   e.preventDefault()
                   signIn()
                 }}>You must be signed in to view this page</a>
            </p>
          </div>
        </div>
      </section>

    </>
  )
}
