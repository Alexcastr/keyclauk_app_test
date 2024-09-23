import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { roles } from "@/app/constants/constants";
import heroImage  from "../../public/hero-half.webp";
export default async function SummerStyles() {

  const session = await getServerSession(authOptions);

  // console.log('session', session?.roles?.includes(roles.ADMIN));
  return (
    <section className="bg-white">
      <div className="flex flex-col border-b border-gray-200 lg:border-0">
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute hidden h-full w-1/2 bg-gray-100 lg:block"
          />
          <div className="relative bg-gray-100 lg:bg-transparent">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:grid lg:grid-cols-2 lg:px-8">
              <div className="mx-auto max-w-2xl py-24 lg:max-w-none lg:py-64">
                <div className="lg:pr-16">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl xl:text-6xl">
                    Enfócate en lo que importa
                  </h1>
                  <p className="mt-4 text-xl text-gray-600">
                    Nuestra colección de verano te ayudará a mantenerte enfocado
                    en lo que importa, solo para clientes exclusivos.
                  </p>
                  <div className="mt-6">
                    {session?.roles?.includes(roles.ADMIN) ? (
                      <Link
                        href="/private"
                        className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 font-medium text-white hover:bg-indigo-700"
                      >
                        Ver exclusividad
                      </Link>
                    ): <h3 className="text-xl text-black ">No tienes acceso</h3>}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-48 w-full sm:h-64 lg:absolute lg:right-0 lg:top-0 lg:h-full lg:w-1/2">
            <Image
              priority
              width={800}
              height={800}
              alt="hero image"
              src={heroImage}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
