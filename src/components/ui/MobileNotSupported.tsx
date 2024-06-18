import { projectLinks } from "@/components/links/projectLinks"
import { FaDiscord, FaInfoCircle, FaBook, FaChevronDown } from "react-icons/fa"
import { BiDonateHeart } from "react-icons/bi";


export const MobileNotSupported = () => {

    return (
        <>
            <img src="./environmentMaps/fallbackBackground.png" alt="Fallback Background" className="fixed top-0 left-0 w-screen h-screen object-cover" width={1000} height={1000} />
            <div className="bg-white flex flex-col justify-center items-center w-full h-full p-4 text-slate-500 text-base">

                {/* Header */}
                <div className="fixed top-0 left-0 w-full h-16 p-4 text-xs flex justify-between items-center">
                    <div className="bg-teal-500 text-white p-2 rounded-lg shadow-md flex justify-center items-center space-x-2">
                        <p>Change Effects</p>
                        <FaChevronDown />
                    </div>
                    <div className="bg-teal-500 text-white p-2 rounded-lg shadow-md flex justify-center items-center space-x-2">
                        <p>Change Map</p>
                        <FaChevronDown />
                    </div>
                </div>

                
                <div className="z-30 absolute flex flex-col space-y-4 justify-center items-center w-fit h-fit rounded-lg p-4 m-4 bg-white">
                    <h1 className="text-lg font-bold">Oof!</h1>
                    <img src='./images/logo.png' alt='logo' className='w-32 h-32 rounded-full shadow-md' />
                    
                    <div className="flex flex-col space-y-2 justify-center items-start">
                        <p className="text-teal-500 font-semibold">Unfortunately, mobile is not supported.</p>
                        <p className="text-sm">It would be a shame to view this simulator on a mobile. Please visit on a larger device.</p>
                        <p className="text-sm">Thanks!</p>
                    </div>

                    <hr className="w-2/3 mx-auto"></hr>

                    {/* donate to fundraiser and discord */}
                    <div className="flex flex-col space-y-2 text-xs justify-center w-full items-start">
                        
                        <a href={projectLinks.vsiHomepage} target="_blank" className="flex items-center text-blue-500 hover:text-blue-600">
                            <FaBook className="w-4 h-4 mr-1" />
                            What is Visual Snow?
                        </a>
                        <a href={projectLinks.marathonDonationLink} target="_blank" className="flex items-center text-blue-500 hover:text-blue-600">
                            <BiDonateHeart className="w-4 h-4 mr-1" />
                            Finn's Fundraiser
                        </a>
                        <a href={projectLinks.discordInvite} target="_blank" className="flex items-center text-blue-500 hover:text-blue-600">
                            <FaDiscord className="w-4 h-4 mr-1" />
                            Discord
                        </a>
                        
                    </div>
                    
                </div>

                {/* Buttons */}
                <div className='fixed bottom-0 left-0 bg-teal-500 text-white rounded-tr-full p-4 shadow-md hover:cursor-pointer hover:scale-110 transition-all'>
                    <FaInfoCircle className='w-8 h-8 text-teal-100 -translate-x-2 translate-y-2  group-hover/tooltip:text-white transition-all' />
                </div>
                <div className='fixed group bottom-0 right-0 bg-teal-500 text-white rounded-tl-full p-4 shadow-md hover:cursor-pointer  hover:scale-110 transition-all'>
                    <BiDonateHeart className='w-8 h-8 text-teal-100 translate-x-2 translate-y-2  group-hover:text-white transition-all' />
                </div>

                {/* Dark Overlay */}
                <div className="fixed top-0 left-0 w-full h-full bg-black opacity-30"></div>
            </div>
        </>
    )
}