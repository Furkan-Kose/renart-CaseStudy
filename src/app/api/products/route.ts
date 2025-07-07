import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Product } from '@/types/product';

interface ProductWithPrice extends Product {
  price: number;
  popularityOutOfFive: number;
  id: number;
}

async function getGoldPrice(): Promise<number> {
  try {
    const response = await fetch('https://api.gold-api.com/price/XAU');
    const data = await response.json();
    
    const pricePerGram = data.price / 31.1035;
    return pricePerGram;
  } catch (error) {
    console.error('Error fetching gold price:', error);
    return 70; 
  }
}

function calculatePrice(popularityScore: number, weight: number, goldPrice: number): number {
  return (popularityScore + 1) * weight * goldPrice;
}

function convertPopularityToFiveScale(popularityScore: number): number {
  return Math.round(((popularityScore * 4) + 1) * 10) / 10;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const minPopularity = searchParams.get('minPopularity');
    const maxPopularity = searchParams.get('maxPopularity');

    const productsPath = path.join(process.cwd(), 'public', 'products.json');
    const productsData = fs.readFileSync(productsPath, 'utf8');
    const products: Product[] = JSON.parse(productsData);

    const goldPrice = await getGoldPrice();

    let productsWithPrices: ProductWithPrice[] = products.map((product, index) => ({
      ...product,
      id: index + 1,
      price: calculatePrice(product.popularityScore, product.weight, goldPrice),
      popularityOutOfFive: convertPopularityToFiveScale(product.popularityScore),
    }));

    if (minPrice) {
      productsWithPrices = productsWithPrices.filter(p => p.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      productsWithPrices = productsWithPrices.filter(p => p.price <= parseFloat(maxPrice));
    }
    if (minPopularity) {
      productsWithPrices = productsWithPrices.filter(p => p.popularityScore >= parseFloat(minPopularity));
    }
    if (maxPopularity) {
      productsWithPrices = productsWithPrices.filter(p => p.popularityScore <= parseFloat(maxPopularity));
    }

    return NextResponse.json({
      products: productsWithPrices,
      goldPricePerGram: goldPrice,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error in products API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
} 