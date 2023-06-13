import Image from 'next/image'
import { Inter } from 'next/font/google'
import Logo from '../public/icons/logo.png'
import Phone from '../public/images/phone.svg'
import WhatsApp from '../public/images/whatsapp.svg'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ data }) {

    const router = useRouter()

    const [img1, setImg1] = useState([])

    const [loading, setLoading] = useState(true)


    useEffect(() => {

        setImg1(data.property_images)

        console.log(data)

        setTimeout(() => {
            setLoading(!loading)
        }, 3000);
    }, [])

    return (
        <>

            <Head>
                <title>{data.property_name}</title>
                <meta
                    name="description"
                    content={
                        data.description
                            ? `Description: ${data.description} state: ${data.state} city: ${data.city} dimension: ${data.dimension} Facing Towards: ${data.faced_towards} Ploat Area: ${data.plot_area} plot Length: ${data.plot_length} Plot Breadth : ${data.plot_breadth} Price : ${data.price}/${data.per_unit}`
                            : `state: ${data.state} city: ${data.city} dimension: ${data.dimension} Facing Towards: ${data.faced_towards} Ploat Area: ${data.plot_area} plot Length: ${data.plot_length} Plot Breadth : ${data.plot_breadth} Price : ${data.price}/${data.per_unit} `
                    }
                />
                <meta property="og:title" content={data.property_name} />
                <meta property="og:image" content={data.property_images && data.property_images.length > 0 ? data.property_images[0].image_url_thumbnail_1080 : ''} />
                <meta property="title" content={data.property_name} />
                <meta property="image" content={data.property_images && data.property_images.length > 0 ? data.property_images[0].image_url_thumbnail_1080 : ''} />
            </Head>

            {
                loading
                    ? (
                        <div class="w-full h-screen justify-center items-center animate-pulse flex flex-1 bg-[#f5f7fb]">
                            <Image src={Logo} className="w-[40rem]" alt="Raasees Properties" />
                        </div>
                    )
                    :
                    (
                        <div class=" w-full bg-[#f5f7fb] px-0 md:px-4">

                            {/* <!-- navbar --> */}

                            <nav class="bg-[#f5f7fb] w-full border-gray-200">
                                <div class=" flex xl:max-w-7xl flex-wrap items-center justify-between mx-auto">
                                    <a href="/" class="flex items-center">
                                        <Image src={Logo} class="w-60 mr-3" alt="Flowbite Logo" />
                                    </a>
                                </div>
                            </nav>

                            {/* <!-- body --> */}

                            <div class="main w-full flex justify-center pb-6 px-4">
                                <div class="container flex md:flex-row flex-col bg-white rounded-3xl px-5 py-12 drop-shadow-2xl">

                                    {/* <!-- left side --> */}
                                    <div class="w-full md:w-2/3">
                                        <div class="left flex ">
                                            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 justify-center items-center">
                                                {img1 &&
                                                    img1.length > 0 &&
                                                    img1.map((image, index) => (
                                                        <Image
                                                            key={image.uuid}
                                                            className="w-[319px] h-[179px] first-of-type:row-span-2 first-of-type:h-full"
                                                            src={image.image_url_thumbnail_1080}
                                                            alt="apartments"
                                                            width={800}
                                                            height={300}
                                                        />
                                                    ))}
                                                {/* <div onClick={() => setShowModal(!showModal)} class="flex flex-col items-center justify-center w-full h-full bg-gray-300 rounded animate-pulse">
                                                <span className='text-2xl text-black'>More Images</span>
                                            </div> */}
                                            </div>
                                        </div>

                                        {/* <!-- tags --> */}
                                        <div class="mt-5">
                                            <button class="px-8 py-2 bg-blue-100 text-blue-700 rounded-xl">{data.property_type}</button>
                                        </div>

                                        {/* <!-- Owner and property bookmark --> */}
                                        <div class="flex gap-4 items-center mt-4">
                                            <span class="text-gray-800 text-lg font-semibold">{data.property_name}</span>
                                        </div>

                                        {/* <!-- address --> */}
                                        <div class="mt-4 flex items-center gap-2">
                                            <svg className='text-black w-6' fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z">
                                                </path>
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"></path>
                                            </svg>
                                            <a href="/" class="text-gray-600 text-md">{data.address}</a>
                                        </div>

                                        {/* <!-- Owner info and SQFT --> */}
                                        <div class="flex md:flex-row flex-col mt-4 md:items-center md:gap-12 gap-5">

                                            {
                                                data?.customer && (


                                                    <div class="flex gap-4">
                                                        <Image class="w-12 rounded-lg" src={data.customer.dp} width={200} height={200} alt="" />
                                                        <div class="flex flex-col justify-center">
                                                            <span class="text-gray-800 text-lg font-semibold">{data.customer.customer_name}</span>
                                                        </div>
                                                    </div>

                                                )}

                                            <div class="flex items-center">
                                                <h1 class="text-2xl text-black font-bold">₹ {data.price}</h1>
                                                {
                                                    data.per_unit !== 'total' && (
                                                        <span class="text-md text-gray-800 font-md self-end">/{data.per_unit}</span>)

                                                }
                                            </div>
                                        </div>

                                        {/* <!-- description --> */}
                                        <div class="flex flex-col  mt-4">
                                            <span class="text-gray-800 text-lg font-semibold">Description</span>

                                            {
                                                data?.description ? (
                                                    <span class="text-gray-600 text-md mb-6">
                                                        {data.description}
                                                    </span>
                                                ) : (
                                                    <span class="text-gray-600 text-md mb-6">
                                                        No description available
                                                    </span>
                                                )
                                            }
                                        </div>

                                    </div>

                                    {/* api integration complete below */}
                                    {/* <!-- right side --> */}
                                    <div class="right py-5 md:px-7 w-full md:w-1/3">
                                        {
                                            data.property_type !== "plot" && (
                                                <div class="flex justify-between items-center mb-6 w-full">
                                                    {
                                                        data.ready_to_move ?
                                                            (<div class="px-3 py-1 text-white bg-green-600 text-xs rounded-br-md rounded-tr-md">Ready To Move</div>)
                                                            :
                                                            (<div class="px-3 py-1 text-white bg-red-600 text-xs rounded-br-md rounded-tr-md">Under Construction</div>)
                                                    }
                                                    {/* <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2.6" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                    </svg> */}
                                                </div>
                                            )
                                        }

                                        {/* <!-- details --> */}
                                        <div class="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-2 gap-4">
                                            <div class="flex flex-col">
                                                <span class="text-gray-800 text-lg font-semibold">Dimension</span>
                                                <span class="text-gray-600 text-md">{data.dimension}</span>
                                            </div>
                                            <div class="flex flex-col">
                                                <span class="text-gray-800 text-lg font-semibold">Facing Towards</span>
                                                <span class="text-gray-600 text-md">{data.faced_towards}</span>
                                            </div>
                                            {/* differ plot and others */}

                                            {
                                                data.property_type !== "plot" ? (
                                                    <>
                                                        <div class="flex flex-col">
                                                            <span class="text-gray-800 text-lg font-semibold">No Of Floors</span>
                                                            <span class="text-gray-600 text-md">{data.no_of_floors}</span>
                                                        </div>
                                                        <div class="flex flex-col">
                                                            <span class="text-gray-800 text-lg font-semibold">No Of Bedrooms</span>
                                                            <span class="text-gray-600 text-md">{data.bhk_count} BHK</span>
                                                        </div>
                                                        <div class="flex flex-col">
                                                            <span class="text-gray-800 text-lg font-semibold">Total Sqft</span>
                                                            <span class="text-gray-600 text-md">{data.total_sqft}</span>
                                                        </div>
                                                    </>
                                                )
                                                    :
                                                    (
                                                        <>
                                                            <div class="flex flex-col">
                                                                <span class="text-gray-800 text-lg font-semibold">Length</span>
                                                                <span class="text-gray-600 text-md">{data.plot_length}</span>
                                                            </div>
                                                            <div class="flex flex-col">
                                                                <span class="text-gray-800 text-lg font-semibold">Breadth</span>
                                                                <span class="text-gray-600 text-md">{data.plot_breadth}</span>
                                                            </div>
                                                            <div class="flex flex-col">
                                                                <span class="text-gray-800 text-lg font-semibold">Total Area</span>
                                                                <span class="text-gray-600 text-md">{data.plot_area} {data.plot_area_unit}</span>
                                                            </div>
                                                        </>
                                                    )
                                            }

                                        </div>

                                        {/* <!-- facilities --> */}

                                        {
                                            data.property_type !== "plot" ? (
                                                <>
                                                    <h1 class="text-lg font-semibold mt-6 mb-3">Facilities</h1>
                                                    <div class="grid xl:grid-cols-3 lg:grid-cols-2 lg:gap-0 md:grid-cols-1 md:gap-2 sm:gap-3 xxs:grid-cols-3 xxxs:grid-cols-2">
                                                        {
                                                            data?.amenities?.map((amenity) => (
                                                                <div
                                                                    class="p-3 w-24 border-2 rounded-xl flex flex-col justify-center items-center gap-[.5rem]">
                                                                    <Image class="w-8" src={amenity.amenity_icon} width={200} height={200} alt="" />
                                                                    <span class="text-gray-800 text-sm font-md text-center">{amenity.amenity}</span>
                                                                </div>
                                                            ))
                                                        }

                                                    </div>
                                                </>
                                            ) : (
                                                <></>
                                            )
                                        }

                                    </div>

                                </div>
                            </div>

                            {/* <!-- buttons --> */}
                            {/* <div class="flex gap-4 fixed bottom-5 sm:right-5 xs:right-[4.5rem] xxs:right-[3rem] xxxs:right-5 z-100"> */}
                            <div className='fixed bottom-5 w-full z-100 xl:px-28 xl:bottom-8 lg:px-20 md:px-16 px-0'>
                                <div class="flex justify-center md:justify-end gap-4">
                                    <button onClick={() => router.push(`tel:${data.customer.mobile_number}`)} class="bg-blue-400 text-white px-4 py-2 rounded-md flex items-center gap-3">
                                        <Image class="w-8" src={Phone} alt="" />
                                        Phone</button>
                                    <button onClick={() => router.push(`https://wa.me/${data.customer.whatsapp_number}`)} class="bg-green-500 text-white px-4 py-2 rounded-md flex items-center gap-3">
                                        <Image class="w-8" src={WhatsApp} alt="" />
                                        Whatsapp</button>
                                </div>
                            </div>


                        </div>
                    )
            }




        </>
    )
}

export async function getServerSideProps(context) {

    // split the document.location.href on seeing / and store the last element of array to uuid
    // const uuid = document.location.href.split('/').pop()
    const { uuid } = context.query;
    const res = await fetch(`https://app.raasees.com/api/v1/property/share/${uuid}/`)
    const data = await res.json()

    return {
        props: { data } // will be passed to the page component as props
    };
}
