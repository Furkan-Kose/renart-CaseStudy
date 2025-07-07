'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Star } from 'lucide-react';
import { Product } from '@/types/product';

const colorOptions = [
  { value: 'yellow', label: 'Yellow Gold', bgColor: 'bg-[#EAC697]' },
  { value: 'white', label: 'White Gold', bgColor: 'bg-[#D9D9D9]' },
  { value: 'rose', label: 'Rose Gold', bgColor: 'bg-[#E1A4A9]' },
];

export default function ProductCard({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState<'yellow' | 'white' | 'rose'>('yellow');

  const onColorChange = (color: 'yellow' | 'white' | 'rose') => {
    setSelectedColor(color);
  };

  const rating = product.popularityOutOfFive;

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="bg-white rounded-lg p-4 pb-8 max-w-xs mx-auto">
      <Image
        src={product.images[selectedColor]}
        alt={product.name}
        width={300}
        height={300}
        className="w-full h-48 bg-gray-100 object-cover rounded-lg"
      />

      <h3 className="text-base font-montserrat font-medium mt-4">{product.name}</h3>
      <p className="text-base font-montserrat font-normal">${product.price.toFixed(2)} USD</p>

      <div className="flex items-center mt-4 gap-2">
        {colorOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onColorChange(option.value as 'yellow' | 'white' | 'rose')}
            className={`
              w-6 h-6 rounded-full transition-all duration-200
              ${option.bgColor}
              ${
                selectedColor === option.value
                  ? 'ring-2 ring-gray-400 ring-offset-2 ring-offset-gray-50'
                  : ''
              }
            `}
            title={option.label}
          />
        ))}
      </div>

      <p className="text-xs font-avenir mt-2">
        {colorOptions.find((opt) => opt.value === selectedColor)?.label}
      </p>

      <div className="flex items-center gap-1 mt-2">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star
            key={`full-${i}`}
            className="w-4 h-4 text-yellow-400 fill-yellow-400"
          />
        ))}

        {hasHalfStar && (
          <div className="relative">
            <Star className="w-4 h-4 text-gray-300" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            </div>
          </div>
        )}

        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
        ))}

        <span className="ml-1 text-sm text-gray-600">{rating}/5</span>
      </div>
    </div>
  );
}
