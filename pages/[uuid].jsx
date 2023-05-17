import Image from 'next/image'
import { Inter } from 'next/font/google'
import Logo from '../public/icons/logo.png'
import Phone from '../public/images/phone.svg'
import WhatsApp from '../public/images/whatsapp.svg'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ params }) {

    const router = useRouter()
    const { asPath } = useRouter()

    const [property, setProperty] = useState([])

    const [img1, setImg1] = useState([])

    const [img2, setImg2] = useState([])

    const [showModal, setShowModal] = useState(false);

    // find the number of elements in the array property.property_images
    const [Count, setCount] = useState(0)

    const [loading, setLoading] = useState(true)

    const [dummy, setdummy] = useState([
        {
            id: 1
        },
        {
            id: 2
        },
        {
            id: 3
        },
        {
            id: 4
        },
        {
            id: 5
        },
    ])

    useEffect(() => {

        console.log(document.location.href)
        // split the document.location.href on seeing / and store the last element of array to uuid
        const uuid = document.location.href.split('/').pop()
        // fetch the data from the api "http://164.92.86.98/api/v1/property/share/d8f168b4-b860-4a75-88ec-960ed8bd9d49/" and set to the state "property"
        fetch(`https://app.raasees.com/api/v1/property/share/${uuid}/`)
            .then((res) => res.json())
            .then((data) => {
                setProperty(data)
            })
            .catch((error) => {
                console.error(error);
            });

        // setTimeout(() => {
        //     setLoading(!loading)
        // }, 3000);
    }, [])

    // useEffect(() => {
    //   console.log(property)
    //   if (property) {
    //     setCount(property?.property_images?.length)
    //   }
    // }, [property])

    useEffect(() => {
        if (property && property.property_images && property.property_images.length > 0) {
            const images = property.property_images;
            if (images.length < 6) {
                const newDummy = [];
                for (var i = 0; i < 5 - images.length; i++) {
                    newDummy.push({ id: i + 1 });
                }
                setdummy(newDummy);
                setImg1(images);
                setImg2([]);
            } else {
                setdummy([]);
                setImg1(images.slice(0, 6));
                setImg2(images.slice(6));
            }
        }
    }, [property]);

    return (
        <>

            <Head>
                <title>{property.property_name}</title>
            </Head>

            {
                loading &&
                // ? (
                //     <div class="w-full h-screen justify-center items-center animate-pulse flex flex-1 bg-[#f5f7fb]">
                //         <Image src={Logo} className="w-[40rem]" alt="Raasees Properties" />
                //     </div>
                // )
                //     :
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
                                                        <div key={image.uuid}>
                                                            <Image
                                                                className="w-[319px] h-[179px]"
                                                                src={image.image_url_thumbnail_1080}
                                                                alt="apartments"
                                                                width={800}
                                                                height={300}
                                                            />
                                                            {/* 319 × 179 px */}
                                                        </div>
                                                    ))}
                                                {/* {dummy.map((image) => (
                                                    <div class="flex items-center justify-center w-full h-[179px] bg-gray-300 rounded animate-pulse">
                                                    <svg class="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                                                    </div>
                                                ))} */}
                                                <div onClick={() => setShowModal(!showModal)} class="flex flex-col items-center justify-center w-full h-full bg-gray-300 rounded animate-pulse">
                                                    <span className='text-2xl text-black'>More Images</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <!-- tags --> */}
                                        <div class="mt-5">
                                            <button class="px-8 py-2 bg-blue-100 text-blue-700 rounded-xl">{property.property_type}</button>
                                        </div>

                                        {/* <!-- Owner and property bookmark --> */}
                                        <div class="flex gap-4 items-center mt-4">
                                            <span class="text-gray-800 text-lg font-semibold">{property.property_name}</span>
                                            {/* <div class="flex items-center gap-1">
                                                <svg class="w-8 h-8 text-transparent" fill="#fbcb50" stroke="currentColor"
                                                    stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                                    aria-hidden="true">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z">
                                                    </path>
                                                </svg>
                                                <span class="text-gray-800 text-lg font-md">{property.avg_rating}</span>
                                                <span class="text-gray-500 text-lg">({property.rating_count})</span>
                                                </div> */}
                                                                            {/* <svg class="w-10 h-10 text-gray-500 border-2 rounded-full p-1" fill="grey" stroke="currentColor"
                                                stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                                aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z">
                                                </path>
                                                </svg> 
                                            */}
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
                                            <a href="/" class="text-gray-600 text-md">{property.address}</a>
                                        </div>

                                        {/* <!-- Owner info and SQFT --> */}
                                        <div class="flex md:flex-row flex-col mt-4 md:items-center md:gap-12 gap-5">

                                            {
                                                property?.customer && (


                                                    <div class="flex gap-4">
                                                        <Image class="w-12 rounded-lg" src={property.customer.dp} width={200} height={200} alt="" />
                                                        <div class="flex flex-col justify-center">
                                                            <span class="text-gray-800 text-lg font-semibold">{property.customer.customer_name}</span>
                                                        </div>
                                                    </div>

                                                )}

                                            <div class="flex items-center">
                                                <h1 class="text-2xl text-black font-bold">₹ {property.price}</h1>
                                                {
                                                    property.per_unit !== 'total' && (
                                                        <span class="text-md text-gray-800 font-md self-end">/{property.per_unit}</span>)

                                                }
                                            </div>
                                        </div>

                                        {/* <!-- description --> */}
                                        <div class="flex flex-col  mt-4">
                                            <span class="text-gray-800 text-lg font-semibold">Description</span>

                                            {
                                                property?.description ? (
                                                    <span class="text-gray-600 text-md mb-6">
                                                        {property.description}
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
                                            property.property_type !== "plot" && (
                                                <div class="flex justify-between items-center mb-6 w-full">
                                                    {
                                                        property.ready_to_move ?
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
                                                <span class="text-gray-600 text-md">{property.dimension}</span>
                                            </div>
                                            <div class="flex flex-col">
                                                <span class="text-gray-800 text-lg font-semibold">Facing Towards</span>
                                                <span class="text-gray-600 text-md">{property.faced_towards}</span>
                                            </div>
                                            {/* differ plot and others */}

                                            {
                                                property.property_type !== "plot" ? (
                                                    <>
                                                        <div class="flex flex-col">
                                                            <span class="text-gray-800 text-lg font-semibold">No Of Floors</span>
                                                            <span class="text-gray-600 text-md">{property.no_of_floors}</span>
                                                        </div>
                                                        <div class="flex flex-col">
                                                            <span class="text-gray-800 text-lg font-semibold">No Of Bedrooms</span>
                                                            <span class="text-gray-600 text-md">{property.bhk_count} BHK</span>
                                                        </div>
                                                        <div class="flex flex-col">
                                                            <span class="text-gray-800 text-lg font-semibold">Total Sqft</span>
                                                            <span class="text-gray-600 text-md">{property.total_sqft}</span>
                                                        </div>
                                                    </>
                                                )
                                                    :
                                                    (
                                                        <>
                                                            <div class="flex flex-col">
                                                                <span class="text-gray-800 text-lg font-semibold">Length</span>
                                                                <span class="text-gray-600 text-md">{property.plot_length}</span>
                                                            </div>
                                                            <div class="flex flex-col">
                                                                <span class="text-gray-800 text-lg font-semibold">Breadth</span>
                                                                <span class="text-gray-600 text-md">{property.plot_breadth}</span>
                                                            </div>
                                                            <div class="flex flex-col">
                                                                <span class="text-gray-800 text-lg font-semibold">Total Area</span>
                                                                <span class="text-gray-600 text-md">{property.plot_area} {property.plot_area_unit}</span>
                                                            </div>
                                                        </>
                                                    )
                                            }

                                        </div>

                                        {/* <!-- facilities --> */}

                                        {
                                            property.property_type !== "plot" ? (
                                                <>
                                                    <h1 class="text-lg font-semibold mt-6 mb-3">Facilities</h1>
                                                    <div class="grid xl:grid-cols-3 lg:grid-cols-2 lg:gap-0 md:grid-cols-1 md:gap-2 sm:gap-3 xxs:grid-cols-3 xxxs:grid-cols-2">
                                                        {
                                                            property?.amenities?.map((amenity) => (
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


                            {
                                showModal && (
                                    // < !--Main modal -->
                                    <div class="fixed top-0 left-0 right-0 bottom-0 z-20 bg-gray-900 bg-opacity-50 md:inset-0 h-[calc(100%-1rem)] w-full md:h-full">
                                        <div id="defaultModal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-200 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                                            <div class="relative w-full max-h-full">
                                                {/* <!-- Modal content --> */}
                                                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                                    {/* <!-- Modal header --> */}
                                                    <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                                                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                                            More Images
                                                        </h3>
                                                        <button onClick={() => setShowModal(!showModal)} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                                                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                                            <span class="sr-only">Close modal</span>
                                                        </button>
                                                    </div>
                                                    {/* <!-- Modal body --> */}
                                                    <div class="p-6 space-y-6">

                                                        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                                                            {
                                                                property.property_images.map((image, index) => (
                                                                    <Image class="w-[319px] h-[179px] rounded-lg" src={image.image_url_thumbnail_1080} width={300} height={300} alt="" />
                                                                ))}
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                )
                            }
                            {/* 
                {
                showModal && (
                    // create an overlay
                    <div class="fixed top-0 left-0 right-0 bottom-0 z-20 bg-gray-900 bg-opacity-50 md:inset-0 h-[calc(100%-1rem)] w-full md:h-full"></div>
                    
                )
                } */}





                            {/* <!-- buttons --> */}
                            {/* <div class="flex gap-4 fixed bottom-5 sm:right-5 xs:right-[4.5rem] xxs:right-[3rem] xxxs:right-5 z-100"> */}
                            <div className='fixed bottom-5 w-full z-100 xl:px-28 xl:bottom-8 lg:px-20 md:px-16 px-0'>
                                <div class="flex justify-center md:justify-end gap-4">
                                    <button onClick={() => router.push(`tel:${property.customer.mobile_number}`)} class="bg-blue-400 text-white px-4 py-2 rounded-md flex items-center gap-3">
                                        <Image class="w-8" src={Phone} alt="" />
                                        Phone</button>
                                    <button onClick={() => router.push(`https://wa.me/${property.customer.whatsapp_number}`)} class="bg-green-500 text-white px-4 py-2 rounded-md flex items-center gap-3">
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
