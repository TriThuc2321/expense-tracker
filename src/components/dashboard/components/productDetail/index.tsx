import React from 'react';

import { IProduct } from '~/interfaces';

export default function ProductDetail(productDetail: IProduct) {
    return (
        <div className="flex justify-between">
            <p>{productDetail.name}</p>
            <p>{productDetail.price}</p>
        </div>
    );
}
