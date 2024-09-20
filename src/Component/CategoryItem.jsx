import React, { useEffect, useState } from 'react';
import { ItemList } from './ItemList';
import axios from 'axios';

export const CategoryItem = ({ category, size ,searchQuery}) => { 
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3001/products");
            const res = response.data;

            // Filter by category if it exists
            const filterByCategory = category 
                ? res.filter(item => item.category.toLowerCase() === category.toLowerCase())
                : res;
            
            // Filter by size if it exists
            const filterBySize = size
                ? filterByCategory.filter(item => item.sizes.includes(size)) // Fixed `includes`
                : filterByCategory;

         const filterBySearch = searchQuery
                ? res.filter(item => item.name.toLowerCase().includes(searchQuery))
                : filterBySize;

            setData(filterBySearch);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [category, size,searchQuery]); // Correctly updating when category or size changes

    return <ItemList data={data} />; 
};
