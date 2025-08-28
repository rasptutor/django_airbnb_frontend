import ReservationSidebar from "@/app/components/properties/ReservationSidebar";
import Link from "next/link";
import Image from "next/image";

import apiService from "@/app/services/apiService";
import { getUserId } from "@/app/lib/actions";

const PropertyDetailPage = async ({params}: { params: {id: string }}) => {
    const property = await apiService.get(`/api/properties/${params.id}`);
    const userId = await getUserId();

    console.log('userId', userId);
    console.log('landlord:', property.landlord);
    return (
        <main className="max-w-6xl mx-auto px-6">
            <div className="w-full mb-4 overflow-hidden rounded-xl relative" style={{ height: '64vh' }}>
                <Image
                    fill
                    src={property.image_url}
                    className="object-cover w-full h-full"
                    alt="Beach house"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-4">
                <div className="py-6 pr-6 col-span-3">
                    <h1 className="mb-4 text-4xl">{property.title}</h1>

                    <span className="mb-6 block text-lg text-gray-600">
                        {property.guests} guests - {property.bedrooms} bedrooms - {property.bathrooms} bathrooms
                    </span>                    

                    <Link 
                        href={`/landlords/${property.landlord.id}`}
                        className="py-6 flex items-center space-x-4"
                    >
                        {property.landlord.avatar_url && (
                            <Image
                                src={property.landlord.avatar_url}
                                width={50}
                                height={50}
                                className="rounded-full"
                                alt="The user name"
                            />
                        )}

                        <p><strong>{property.landlord.name}</strong> is your host</p>
                        
                    </Link>                    

                    <p className="mt-6 text-lg">
                        {property.description}
                    </p>
                </div>

                <div className="col-span-2 md:sticky md:top-20">
                    <div className="mt-6">
                        <ReservationSidebar 
                            property={property}
                            userId={userId}
                        />
                    </div>
                </div>

            </div>
        </main>
    )
}
export default PropertyDetailPage;