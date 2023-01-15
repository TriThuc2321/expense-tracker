import React from 'react';

import { IBill } from '~/interfaces';
import ProductDetail from './../productDetail/index';

export default function BillDetail(billDetail: IBill) {
    return (
        <div className="cursor-pointer relative px-4 py-2 overflow-hidden w-6/6 h-72 bg-white text-primary drop-shadow-[0_3px_3px_rgba(255,255,255,0.25)] rounded-md">
            <ProductSection productType="generals" billDetail={billDetail} />
            <ProductSection productType="specifics" billDetail={billDetail} />

            <div className="bg-slate-400 py-2 px-4 absolute bottom-0 left-0 right-0 flex items-center bg-white justify-between">
                <img src={billDetail.user.picture} className="h-6 w-6 rounded-full" />
                <p className="font-bold">{billDetail.total}</p>
            </div>
        </div>
    );
}

type ProductSectionPropsType = {
    productType: 'generals' | 'specifics';
    billDetail: IBill;
};

function ProductSection(productSectionProps: ProductSectionPropsType) {
    const { productType, billDetail } = productSectionProps;
    return (
        <div className="mb-1">
            <div className="flex justify-between">
                <p className="font-bold capitalize :first-letter">{productType}</p>
                <p>{billDetail.generalTotal}</p>
            </div>
            <div className="w-full h-0.5 bg-primary my-1" />
            {billDetail.generals.map((product) => (
                <ProductDetail key={product.id} {...product} />
            ))}
        </div>
    );
}
