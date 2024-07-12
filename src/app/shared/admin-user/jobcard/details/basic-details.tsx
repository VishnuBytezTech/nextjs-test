import { Title } from "rizzui";
import ProductDetailsGallery from '@/app/shared/ecommerce/product/product-details-gallery';

export default function JobCardBasicDetails() {
  return (
    <>
        <div className="p-3">

            <div className="space-y-6 shadow-md border border-muted rounded-xl px-5 py-6 @5xl:space-y-7 @5xl:p-7">
              
              <div className="flex justify-between font-medium">
                Client <span> -----</span>
              </div>
              <div className="flex justify-between font-medium">
                Client Ref <span>-----</span>
              </div>
              <div className="flex justify-between font-medium">
                Commodity <span>-----</span>
              </div>
              <div className="flex justify-between font-medium">
                Location <span>-----</span>
              </div>
              <div className="flex justify-between font-medium">
                Start date <span>-----</span>
              </div>
              <div className="flex justify-between font-medium">
                End date <span>------</span>
              </div>
              <div className="flex justify-between font-medium">
                Type of job <span>------</span>
              </div>
              <ProductDetailsGallery />
            </div>
          </div>

    </>
  );
}
