// import React from 'react'
import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {Swiper , SwiperSlide} from 'swiper/react';
import 'swiper/css/bundle';
import {Navigation} from 'swiper/modules';
import SwiperCore from 'swiper';
import Listing from '../../../api/models/listing.model';
import ListingItem from '../components/ListingItem';

function Home() {
  const [offers, setOffers] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [saleListings , setSaleListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(saleListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res   = await fetch('/api/listing/get?offer=true&limit=4');
        const data  = await res.json();
        setOffers(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    } 


    const fetchRentListings = async () => {
      try {
        const res   = await fetch('/api/listing/get?type=rent&limit=4');
        const data  = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    }

    const fetchSaleListings = async () => {
      try {
        const res   = await fetch('/api/listing/get?type=sale&limit=4');
        const data  = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchOfferListings();
  }, []);
  return (
    <div className=''>
      {/* top  */}
        <div className="flex flex-col gap-6  p-28 px-3 max-w-6xl mx-auto">
          <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl '>
            Find your next <span className='text-slate-500'>perfect</span> <br /> place with ease
          </h1>
          <div className="text-gray-400 text-xs sm:text-sm">
            Vinod Properties offers the most premium properties with the best price in the market <br />
            We have a wide range of properties to choose from.
          </div>
          <Link className='text-xs sm:text-sm  text-blue-800 font-bold hover:underline' to={'/search'}> 
              Let's get started
          </Link>
        </div>
      {/* swiper  */}
      <Swiper navigation>
        {offers &&
          offers.length > 0 &&
          offers.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      
      {/* listing results for offer sale and rent  */}

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap- my-10">
        {
          offers && offers.length > 0 && (
            <div >
              <div className="my-3">
              <h2 className='text-2xl font-semibold text-slate-600 '>Recent Offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>
                Show more offers
              </Link>
              </div>
              <div className='flex flex-wrap gap-4'>
                {
                  offers.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))}
              </div>
            </div>
          )
        }
        {
          rentListings && rentListings.length > 0 && (
            <div >
              <div className="my-3">
              <h2 className='text-2xl font-semibold text-slate-600 '>Recent places for rent</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>
                Show more places for rent
              </Link>
              </div>
              <div className='flex flex-wrap gap-4'>
                {
                  rentListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))}
              </div>
            </div>
          )
        }
        {
          saleListings && saleListings.length > 0 && (
            <div >
              <div className="my-3">
              <h2 className='text-2xl font-semibold text-slate-600 '>Recent places for sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>
                Show more places for sale
              </Link>
              </div>
              <div className='flex flex-wrap gap-4'>
                {
                  saleListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))}
              </div>
            </div>
          )
        }
      </div>

    </div>
  )
}

export default Home