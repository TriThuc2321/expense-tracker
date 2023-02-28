import { formatVND } from '~/utils';
import { IProduct } from '~/interfaces';

export default function ProductDetail(productDetail: IProduct) {
    return (
        <div className="flex justify-between">
            <p>{productDetail.name}</p>
            <p>{formatVND(productDetail.price)}</p>
        </div>
    );
}
