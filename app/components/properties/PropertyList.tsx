'use client';

import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PropertyListItem from "./PropertyListItem";
import useSearchModal from '@/app/hooks/useSearchModal';
import apiService from '@/app/services/apiService';

export type PropertyType = {
    id: string;
    title: string;
    image_url: string;
    price_per_night: number;
    is_favorite: boolean;
}

interface PropertyListProps {
    landlord_id?: string | null;
    favorites?: boolean | null;
}

const PropertyList: React.FC<PropertyListProps> = ({
    landlord_id,
    favorites
}
) => {

    const params = useSearchParams();
    const searchModal = useSearchModal();
    const country = searchModal.query.country;
    const numGuests = searchModal.query.guests;
    const numBathrooms = searchModal.query.bathrooms;
    const numBedrooms = searchModal.query.bedrooms;
    const checkinDate = searchModal.query.checkIn;
    const checkoutDate = searchModal.query.checkOut;
    const category = searchModal.query.category;
    const [properties, setProperties] = useState<PropertyType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    console.log('searchQUery:', searchModal.query);
    console.log('numBedrooms', numBedrooms)

    const markFavorite = (id: string, is_favorite: boolean) => {
    const tmpProperties = properties.map((property) =>
        property.id === id ? { ...property, is_favorite } : property
    );
    setProperties(tmpProperties);
    };
    
    const getProperties = async () => {
        setLoading(true);
        try { 
                let url = '/api/properties/';

                if (landlord_id) {
                    url += `?landlord_id=${landlord_id}`
                } else if (favorites) {
                    url += '?is_favorites=true'
                } else {
                    const query = new URLSearchParams();

                    if (country) query.set("country", country);
                    if (numGuests) query.set("numGuests", String(numGuests));
                    if (numBedrooms) query.set("numBedrooms", String(numBedrooms));
                    if (numBathrooms) query.set("numBathrooms", String(numBathrooms));
                    if (category) query.set("category", category);
                    if (checkinDate) query.set("checkin", format(checkinDate, "yyyy-MM-dd"));
                    if (checkoutDate) query.set("checkout", format(checkoutDate, "yyyy-MM-dd"));

                    if (query.toString()) url += `?${query.toString()}`;
                }
            
                const tmpProperties = await apiService.get(url);
                if (!tmpProperties?.data) {
                setProperties([]);
                return;
                }

                setProperties(
                tmpProperties.data.map((property: PropertyType) => ({
                    ...property,
                    is_favorite: tmpProperties.favorites.includes(property.id),
                }))
                );
            } catch (err) {
                console.error("Failed to load properties", err);
                setProperties([]);
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {        
        getProperties();
    }, [category, searchModal.query, params]);

    if (loading) {
    return <p className="text-center py-10 text-gray-500">Loading properties...</p>;
    }

    if (!loading && properties.length === 0) {
        return <p className="text-center py-10 text-gray-500">No properties found.</p>;
    }

    return (
        <>
            {properties.map((property) => {
                return (
                    <PropertyListItem 
                        key={property.id}
                        property={property}
                        markFavorite={(is_favorite: any) => markFavorite(property.id, is_favorite)}
                    />
                )
            })}
        </>
    )
}

export default PropertyList;