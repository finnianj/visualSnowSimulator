export const MobileNotSupported = () => {

    return (
        <>
            <img src="./environmentMaps/fallbackBackground.png" alt="Fallback Background" className="fixed top-0 left-0 w-screen h-screen object-cover" width={1000} height={1000} />
            <div className="bg-white flex flex-col justify-center items-center w-full h-full p-4 text-slate-500 text-base">

                {/* Header */}
                {/* <div className="fixed top-0 left-0 w-full bg-teal-500 text-white shadow-md h-16 p-2 flex justify-start items-center">
                    <p className="font-bold">Visual Snow Simulator</p>
                </div> */}

                
                <div className="absolute flex flex-col space-y-4 justify-center items-center w-fit h-fit rounded-lg p-4 m-4 bg-white">
                    <h1 className="font-bold text-lg ">Oops!</h1>
                    <img src='./images/logo.png' alt='logo' className='w-32 h-32 rounded-full shadow-md' />
                    
                    <div className="flex flex-col space-y-2 justify-center items-start">
                        <p className="text-teal-500 font-semibold">Unfortunately, mobile is not supported.</p>
                        <p>This experience doesn't really make sense on a smaller device. Please visit on a desktop or laptop computer. Thanks!</p>
                    </div>

                    {/* donate to fundraiser and discord */}
                </div>
            </div>
        </>
    )
}