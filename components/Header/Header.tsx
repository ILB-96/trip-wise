import { ButtonGradient } from "./ButtonGradient"
import Image from 'next/image'
import { navigation } from '../../constants/navigation'

export const Header = () => {
  return (
    <>
        <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden bg-grey-400"> 
            <div className="w-full fixed top-0 z-50 bg-n-8/90 backdrop-blur-sm border-b border-n-6 
            lg:bg-n-8/90 lg:backdrop-blur-sm">
                <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
                    <a className="block w-[12rem] xl:mr-8" href="/">
                        <Image
                            className="rounded-full overflow-hidden"
                            src="/assets/icons/logo.png"
                            width={100}
                            height={20}
                            alt="TripWise"
                        />
                    </a>
                    <nav className="hidden fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 
                    lg:static lg:flex lg:mx-auto lg:bg-transparent">
                        <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
                            {
                                navigation.map((item) => (
                                    <a key={item.id} href={item.url}>
                                        {item.title}
                                    </a>
                                ))
                            }
                        </div>
                    </nav>
                </div>
            </div>
        </div>
        <ButtonGradient />
    </>
  )
}
