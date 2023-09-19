import Image from 'next/image';
import { Inter } from 'next/font/google';
import Logo from '../public/icons/logo.png';
import Phone from '../public/images/phone.svg';
import WhatsApp from '../public/images/whatsapp.svg';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
const inter = Inter({ subsets: ['latin'] });

export default function Home({ data }) {
	const router = useRouter();

	const [img1, setImg1] = useState([]);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setImg1(data.property_images);

		console.log(data);

		setTimeout(() => {
		    setLoading(false)
		}, 1500);
	}, []);

	
	const getInnerWidth = () => {
		try {
			// if client
			return window.innerWidth;
		} catch (e) {
			// if server, set any desired value
			return 1024;
		}
	};

	return (
		<>
			<Head>
				<title>{data.property_name}</title>
				<meta
					name='description'
					// content={
                    //     `state: ${data.state}   city: ${data.city}    dimension: ${data.dimension}    Facing Towards: ${
					// 	data.faced_towards
					// }${
					// 	data.plot_area
					// 		? `     Plot Area: ${data.plot_area}     plot Length: ${data.plot_length}     Plot Breadth: ${data.plot_breadth} `
					// 		: `       No. of Floors: ${data.no_of_floors}`
					// }       Price : ${data.price}${data.per_unit !== 'total' ? `${data.per_unit}` : ''} ${
					// 	data.description ? `Description: ${data.description} ` : ''
					// } `}
                    content={`Price : ${data.price}${data.per_unit !== 'total' ? `${data.per_unit}` : ''} ${
						data.description ? `Description: ${data.description} ` : ''
					} `}
				/>
				<meta property='og:title' content={data.property_name} />
				<meta
					property='og:image'
					content={data.property_images && data.property_images.length > 0 ? data.property_images[0].image_url_thumbnail_200 : ''}
				/>
				<meta property='title' content={data.property_name} />
				<meta
					property='image'
					content={data.property_images && data.property_images.length > 0 ? data.property_images[0].image_url_thumbnail_200 : ''}
				/>
			</Head>

			{loading ? (
				<div className='w-full h-screen justify-center items-center animate-pulse flex flex-1 bg-[#f5f7fb]'>
					<Image src={Logo} className='w-[40rem]' alt='Raasees Properties' />
				</div>
			) : (
				<div className=' w-full bg-[#f5f7fb] px-0 md:px-4 min-h-screen '>
					{/* <!-- navbar --> */}

					<nav className='bg-[#f5f7fb] w-full border-gray-200'>
						<div className=' flex  md:px-4  md:container  flex-wrap items-center justify-between mx-auto'>
							<a href='/' className='flex items-center'>
								<Image src={Logo} className='w-60 mr-3' alt='Flowbite Logo' />
							</a>
						</div>
					</nav>

					{/* <!-- body --> */}

					<div className='main w-full flex justify-center pb-3  md:px-4 '>
						<div className=' md:container flex md:flex-row flex-col w-full bg-white rounded-3xl px-5 py-6 pb-12 md:pb-6 drop-shadow-2xl'>
							{/* <!-- left side --> */}
							<div className='w-full md:w-2/3'>
								<div className='left flex '>
									<div className='flex xl:hidden rounded-s-xl rounded-e-xl overflow-hidden w-full'>
										<Carousel
											showArrows={false}
											showThumbs={false}
											autoplay={true}
											showStatus={false}
											swipeable={true}
                                            // centerMode={true}
											//   dynamicHeight={true}
											infiniteLoop={true}
											className='position-relative min-w-full'
											innerWidth={getInnerWidth()}>
											{img1?.map((item, index) => (
												<div key={index} className='w-full  h-64 flex items-center justify-center overflow-hidden bg-black'>
													<Image
														className='object-contain'
														src={item.image_url_thumbnail_1080}
														alt=''
														key={item.uuid}
                                                        // fill={true}
														height={500}
														width={800}
													/>
												</div>
											))}
										</Carousel>
									</div>
									<div
										className={` ${
											img1.length === 1
												? 'hidden w-full xl:grid h-[550px]  grid-cols-fluid justify-center items-center gap-1 overflow-hidden rounded-3xl '
												: img1.length === 4
												? 'hidden w-full xl:grid h-[550px]   justify-center items-center gap-1 overflow-hidden rounded-3xl  grid-rows-4 grid-cols-4'
												: img1.length === 5
												? 'hidden w-full xl:grid h-[550px]   justify-center items-center gap-1 overflow-hidden rounded-3xl  grid-rows-4 grid-cols-4'
												: 'hidden w-full xl:grid h-[550px]  grid-cols-fluid justify-center items-center gap-1 overflow-hidden rounded-3xl '
										}`}>
										{img1 &&
											img1.length > 0 &&
											img1.map((image, index) => (
												<Image
													key={image.uuid}
													className={` ${
														1 === img1.length
															? 'h-full  object-cover min-w-full '
															: 2 === img1.length
															? 'h-full  object-cover row-span-2'
															: 3 === img1.length
															? ' h-full  object-cover first-of-type:col-span-3 first-of-type:row-span-2 col-span-2 min-h-full'
															: // 4 === img1.length ? 'first-of-type:col-span-2 first-of-type:row-span-4 row-span-2 col-span-2 last-of-type:col-span-4 last-of-type:row-span-2' :
															4 === img1.length
															? 'h-full  object-cover first-of-type:col-span-2 first-of-type:row-span-6  row-span-2 last-of-type:col-span-2  last-of-type:row-span-4 '
															: 5 === img1.length
															? 'h-full  object-cover first-of-type:col-span-2 first-of-type:row-span-4 row-span-2  '
															: 'h-full  object-cover'
													}`}
													src={image.image_url_thumbnail_1080}
													alt='apartments'
													width={800}
													height={300}
												/>
											))}
										{/* <div onClick={() => setShowModal(!showModal)} className="flex flex-col items-center justify-center w-full h-full bg-gray-300 rounded animate-pulse">
                                                <span className='text-2xl text-black'>More Images</span>
                                            </div> */}
									</div>
								</div>

								{/* <!-- tags --> */}
								<div className='mt-5'>
									<button className='px-8 py-2 bg-blue-100 text-blue-700 rounded-xl'>{data.property_type || 'nil'}</button>
								</div>

								{/* <!-- Owner and property bookmark --> */}
								<div className='flex gap-4 items-center mt-4'>
									<span className='text-gray-800 text-lg font-semibold'>{data.property_name || 'nil'}</span>
								</div>

								{/* <!-- address --> */}
                                {
                                    data.address  &&
								<div className='mt-4 flex items-center gap-2'>
									<svg
										className='text-black w-6'
										fill='none'
										stroke='currentColor'
										stroke-width='1.5'
										viewBox='0 0 24 24'
										xmlns='http://www.w3.org/2000/svg'
										aria-hidden='true'>
										<path stroke-linecap='round' stroke-linejoin='round' d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z'></path>
										<path
											stroke-linecap='round'
											stroke-linejoin='round'
											d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'></path>
									</svg>
									<a href='/' className='text-gray-600 text-md'>
										{data.address || 'nil'}
									</a>
								</div>
                                }


								{/* <!-- Owner info and SQFT --> */}
								<div className='flex md:flex-row flex-col mt-4 md:items-center md:gap-12 gap-5'>
									{/* {
                                                data?.customer && (


                                                    <div className="flex gap-4">
                                                        <Image className="w-12 rounded-lg" src={data.customer.dp} width={200} height={200} alt="" />
                                                        <div className="flex flex-col justify-center">
                                                            <span className="text-gray-800 text-lg font-semibold">{data.customer.customer_name}</span>
                                                        </div>
                                                    </div>

                                                )} */}

									<div className='flex items-center'>
										<h1 className='text-2xl text-black font-bold'> {data.price_in_words || data.price_formatted || 'nil'}</h1>
										{data.per_unit !== 'total' && (
											<span className='text-md text-gray-800 font-md self-end'>/{data.per_unit || 'nil'}</span>
										)}
									</div>
								</div>

								{/* <!-- description --> */}
								<div className='flex flex-col  mt-4'>
									<span className='text-gray-800 text-lg font-semibold'>Description</span>

									{data?.description ? (
										<span className='text-gray-600 text-md mb-6'>{data.description || 'nil'}</span>
									) : (
										<span className='text-gray-600 text-md mb-6'>No description available</span>
									)}
								</div>
							</div>

							{/* api integration complete below */}
							{/* <!-- right side --> */}
							<div className='right py-5 md:px-7 w-full md:w-1/3'>
								{data.property_type !== 'plot' && (
									<div className='flex justify-between items-center mb-6 w-full'>
										{data.ready_to_move ? (
											<div className='px-3 py-1 text-white bg-green-600 text-xs rounded-br-md rounded-tr-md'>
												Ready To Move
											</div>
										) : (
											<div className='px-3 py-1 text-white bg-red-600 text-xs rounded-br-md rounded-tr-md'>
												Under Construction
											</div>
										)}
										{/* <svg className="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2.6" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                    </svg> */}
									</div>
								)}

								{/* <!-- details --> */}
								<div className='grid lg:grid-cols-2 md:grid-cols-1 grid-cols-2 gap-4'>
									<div className='flex flex-col'>
										<span className='text-gray-800 text-lg font-semibold'>Dimension</span>
										<span className='text-gray-600 text-md'>{data.dimension || 'nil'}</span>
									</div>
									<div className='flex flex-col'>
										<span className='text-gray-800 text-lg font-semibold'>Facing Towards</span>
										<span className='text-gray-600 text-md'>{data.faced_towards || 'nil'}</span>
									</div>
									{/* differ plot and others */}

									{data.property_type !== 'plot' ? (
										<>
											<div className='flex flex-col'>
												<span className='text-gray-800 text-lg font-semibold'>No Of Floors</span>
												<span className='text-gray-600 text-md'>{data.no_of_floors || 'nil'}</span>
											</div>
											<div className='flex flex-col'>
												<span className='text-gray-800 text-lg font-semibold'>No Of Bedrooms</span>
												<span className='text-gray-600 text-md'>{data.bhk_count || 'nil'} {data.bhk_count ? "BHK" :""}</span>
											</div>
											<div className='flex flex-col'>
												<span className='text-gray-800 text-lg font-semibold'>Total Sqft</span>
												<span className='text-gray-600 text-md'>{data.total_sqft || 'nil'}</span>
											</div>
										</>
									) : (
										<>
											<div className='flex flex-col'>
												<span className='text-gray-800 text-lg font-semibold'>Length</span>
												<span className='text-gray-600 text-md'>{data.plot_length || 'nil'}</span>
											</div>
											<div className='flex flex-col'>
												<span className='text-gray-800 text-lg font-semibold'>Breadth</span>
												<span className='text-gray-600 text-md'>{data.plot_breadth || 'nil'}</span>
											</div>
											<div className='flex flex-col'>
												<span className='text-gray-800 text-lg font-semibold'>Total Area</span>
												<span className='text-gray-600 text-md'>
													{data.plot_area || 'nil'} {data.plot_area_unit || ''}
												</span>
											</div>
										</>
									)}
								</div>

								{/* <!-- facilities --> */}

								{data.property_type !== 'plot' ? (
									<>
										<h1 className='text-lg font-semibold mt-6 mb-3'>Facilities</h1>
										<div className='grid xl:grid-cols-3 lg:grid-cols-2 lg:gap-0 md:grid-cols-1 md:gap-2 sm:gap-3 xxs:grid-cols-3 xxxs:grid-cols-2'>
											{data?.amenities?.map((amenity) => (
												<div className='p-3 w-24 border-2 rounded-xl flex flex-col justify-center items-center gap-[.5rem]'>
													<Image className='w-8' src={amenity.amenity_icon} width={200} height={200} alt='' />
													<span className='text-gray-800 text-sm font-md text-center'>{amenity.amenity}</span>
												</div>
											))}
										</div>
									</>
								) : (
									<></>
								)}
							</div>
						</div>
					</div>

					{/* <!-- buttons --> */}
					{/* <div className="flex gap-4 fixed bottom-5 sm:right-5 xs:right-[4.5rem] xxs:right-[3rem] xxxs:right-5 z-100"> */}
					<div className='fixed bottom-5 w-full z-100 xl:px-28 xl:bottom-8 lg:px-20 md:px-16 px-0'>
						<div className='flex justify-center md:justify-end gap-4'>
							{data?.company_contact?.phone_number && (
								<button
									onClick={() => router.push(`tel:${data.company_contact.phone_number}`)}
									className='bg-blue-400 text-white px-4 py-2 rounded-md flex items-center gap-3'>
									<Image className='w-8' src={Phone} alt='' />
									Phone
								</button>
							)}
							{data?.company_contact?.whatsapp_number && (
								<button
									onClick={() => router.push(`https://wa.me/${data.company_contact.whatsapp_number}`)}
									className='bg-green-500 text-white px-4 py-2 rounded-md flex items-center gap-3'>
									<Image className='w-8' src={WhatsApp} alt='' />
									Whatsapp
								</button>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export async function getServerSideProps(context) {
	// split the document.location.href on seeing / and store the last element of array to uuid
	// const uuid = document.location.href.split('/').pop()
	const { uuid } = context.query;
	const res = await fetch(`https://app.raasees.com/api/v1/property/share/${uuid}/`);
	const data = await res.json();

	return {
		props: { data }, // will be passed to the page component as props
	};
}
