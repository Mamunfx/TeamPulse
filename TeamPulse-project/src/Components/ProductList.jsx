import React from 'react';

const products = [
    {
        id: 1,
        name: 'Olay',
        image: 'https://i.ibb.co.com/DWGrp2K/3web-1.jpg',
        description: 'This is our best selling product , has earned best selling award of 2019.',
    },
    {
        id: 2,
        name: 'La Roche',
        image: 'https://i.ibb.co.com/ZWWJtFh/er-1.png',
        description: 'This is our best selling product , has earned best selling award of 2021.',
    },
    {
        id: 3,
        name: 'The Ordinary',
        image: 'https://i.ibb.co.com/kgSjXGV/eu-1.jpg',
        description: 'This is our best selling product , has earned best selling award of 2020.',
    },
    {
        id: 4,
        name: 'Aveego',
        image: 'https://i.ibb.co.com/WGkTk5Z/et-1.jpg',
        description: 'This is our best selling product , has earned best selling award of 2018.',
    },
    {
        id: 5,
        name: 'Bloderma',
        image: 'https://i.ibb.co.com/TPPtqKW/g-1.png',
        description:  'This is our best selling product , has earned best selling award of 2017.',
    },
    {
        id: 6,
        name: 'Eucerine',
        image: 'https://i.ibb.co.com/JjfycrP/f-1.png',
        description:  'This is our best selling product , has earned best selling award of 2023.',
    }
];

const ProductList = () => {
    return (
        <div className="container mx-auto py-8">
            <h1 className='text-3xl text-center mb-8 p-4 rounded-lg shadow-2xl lg:w-1/3 lg:mx-auto bg-base-200'>Some Product of our brand </h1>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {products.map(product => (
                    <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
                        <img className="w-full h-48 object-contain rounded-t-lg" src={product.image} alt={product.name} />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                            <p className="text-gray-600">{product.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;