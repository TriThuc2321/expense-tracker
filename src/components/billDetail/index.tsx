import { useState, useEffect } from 'react';

import { formatVND } from '~/utils';
import { IBill, IProduct } from '~/interfaces';
import { ProductDetail } from '~/components';
import { useNavigate } from 'react-router-dom';

interface IPrice {
    total: number;
    totalGeneral: number;
    totalSpecific: number;
}

export default function BillDetail(billDetail: IBill) {
    const navigate = useNavigate();

    const [prices, setPrices] = useState<IPrice>({
        total: 0,
        totalGeneral: 0,
        totalSpecific: 0,
    });

    useEffect(() => {
        const totalGeneral = billDetail.generals.reduce((total, currentValue) => total + currentValue.price, 0);
        const totalSpecific = billDetail.specifics.reduce((total, currentValue) => total + currentValue.price, 0);

        setPrices({ totalGeneral, totalSpecific, total: totalGeneral + totalSpecific });
    }, [billDetail]);

    return (
        <div
            className="cursor-pointer relative px-4 py-2 overflow-hidden h-72 bg-gray-200 text-primary drop-shadow-[0_3px_3px_rgba(255,255,255,0.25)] rounded-md"
            onClick={() => navigate(`bill/${billDetail._id}`)}
        >
            {billDetail.generals.length > 0 && (
                <ProductSection productType="generals" products={billDetail.generals} total={prices.totalGeneral} />
            )}
            {billDetail.specifics.length > 0 && (
                <ProductSection productType="specifics" products={billDetail.specifics} total={prices.totalSpecific} />
            )}

            <div className="py-2 px-4 absolute bottom-0 left-0 right-0 flex items-center bg-white justify-between">
                <img src={billDetail.buyer.picture || ''} className="h-6 w-6 rounded-full" />
                <p className="font-bold">{formatVND(prices.total)}</p>
            </div>
        </div>
    );
}

type ProductSectionPropsType = {
    productType: 'generals' | 'specifics';
    products: Array<IProduct>;
    total: number;
};

function ProductSection(productSectionProps: ProductSectionPropsType) {
    const { productType, products, total } = productSectionProps;
    return (
        <div className="mb-1">
            <div className="flex justify-between">
                <p className="font-bold capitalize :first-letter">{productType}</p>
                <p>{formatVND(total)}</p>
            </div>
            <div className="w-full h-0.5 bg-primary my-1" />
            {products.map((product) => (
                <ProductDetail key={product._id} {...product} />
            ))}
        </div>
    );
}
