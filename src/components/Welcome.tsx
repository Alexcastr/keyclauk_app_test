import Login from "./Login";
import Image from "next/image";
import homeImage from '@/app/public/home-page.webp';

export default function Welcome() {
  return (
    <div className="relative bg-gray-800 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
      <div className="absolute inset-0 overflow-hidden">
        <Image
         width={500}
         height={500}
          alt="home image"
          src={homeImage}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-gray-900 bg-opacity-50" />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Keycloak thinking</h2>
        <p className="mt-3 text-xl text-white">
        Accede a contenido exclusivo y descubre los mejores análisis. Inicia sesión para comenzar
        </p>
       <Login />
      </div>
    </div>
  )
}
