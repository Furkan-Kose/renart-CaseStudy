'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ProductCard from './ProductCard';
import { Product } from '@/types/product';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className="relative swiper-container px-4">
      <button className="swiper-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 ...">
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button className="swiper-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 ...">
        <ChevronRight className="w-8 h-8" />
      </button>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={16}
        navigation={{
          nextEl: '.swiper-next-custom',
          prevEl: '.swiper-prev-custom',
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
