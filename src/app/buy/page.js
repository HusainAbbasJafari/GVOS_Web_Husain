import Image from "next/image";
import menuImg from "@/public/images/menu1.png";
import demoProperty from "@/public/images/demoProperty.png";
import NewsLetter from "@/components/NewsLetter";

const BuyDetails = () => {
    return (
        <div className="bg-white">
            <section className="banner_secton">
                <div className="w-full h-80 overflow-hidden relative">
                    <Image src={menuImg} alt="property" className="w-full object-cover" />

                    <div className="absolute w-full h-full top-0 left-0 bg-black/50 flex items-center justify-center">
                        <h4 className="text-white text-7xl font-bold">
                            Aftersales: We’ve Got Your Back!
                        </h4>
                    </div>
                </div>
            </section>

            <section className='container py-10'>
                <div className='my-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
                    <div className='aspect_ratio_user_guide'>
                        <Image src={demoProperty} alt='slider' className='w-full rounded-4xl aspect-3/2' />
                    </div>

                    <div className='text-right px-5'>
                        <div className='font-extrabold text-2xl md:text-3xl lg:text-4xl mb-5 text-dark'>
                            Accounting & VAT Made Simple
                        </div>
                        <p className='mb-3'>
                            At Greenstone, we’ll take the reins on account management, bridging the gap between you and your chosen accounting firm with finesse. We’ll tackle the nitty-gritty—unlocking VAT recovery from your acquisition, sorting your annual accounts, and navigating the maze of local taxes. Sit back and let us make it seamless!
                        </p>

                        <h5 className="text-xl text-primary">
                            Cost: 350.00 € + VAT (20%)
                        </h5>
                    </div>
                </div>
            </section>

            <NewsLetter />
        </div>
    )
}

export default BuyDetails;