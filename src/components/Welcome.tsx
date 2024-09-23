import Login from "./Login";
import Image from "next/image";
import homeImage from '../../public/home-page.webp';

export default function Welcome() {
  return (
    <section className="relative bg-gray-800 px-6 py-32 sm:px-12 sm:py-40 lg:px-16 h-screen">
      <div className="absolute inset-0 overflow-hidden">
        <Image
         width={500}
         height={800}
          alt="home image"
          src={homeImage}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-gray-900 bg-opacity-50" />
      <div className="relative mx-auto flex mt-10 max-w-3xl flex-col justify-center items-center text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Keycloak thinking</h2>
        <p className="mt-3 text-xl text-white">
        Accede a contenido exclusivo y sumérgete en los análisis más detallados que te ayudarán a tomar decisiones informadas. Inicia sesión ahora y desbloquea una experiencia única hecha a tu medida
        </p>
       <Login className=" mt-10 text-white text-xl w-fit font-bold hover:text-black hover:scale-110 transition-all duration-200 border border-indigo-900 rounded-full"/>
      </div>
    </section>
  )
}
