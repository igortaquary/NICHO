import React, { createContext, useContext, useEffect, useState } from 'react';
import * as firebase from 'firebase';

const FilterContext = createContext();

const FilterProvider = ({ children }) => {

    //const [displayProducts, setDisplayProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({});

    useEffect(()=>{
        if(loading === false){
            console.log("fetch products")
            fetchProducts();
        }
    }, [filters]);

    const fetchProducts = async () => {
        setLoading(true);
        const auxProducts = [];
        const auxImages = [];
        let productsRef = firebase.firestore().collection('produto');
        //console.log(productsRef);
        if(filters.categories?.length > 0){
            productsRef = productsRef.where('categorias', 'array-contains-any', filters.categories);
        }
        if(filters.regions?.length > 0){
            productsRef = productsRef.where('regioes', 'array-contains-any', filters.regions);
        }
        if(filters.primas?.length > 0){
            productsRef = productsRef.where('materias', 'array-contains-any', filters.primas);
        }
        if(filters.delivery?.length > 0){
            productsRef = productsRef.where('entrega', 'array-contains-any', filters.primas);
        }
        const querySnapshot = await productsRef.get();
        querySnapshot.forEach( documentSnapshot => {
            const data = documentSnapshot.data();
            auxProducts.push(data);
        });
        console.log('meio');
        for(const product of auxProducts){
            const uri = await firebase.storage().ref('user_products/' + product.anunciante + '/' + product.titulo + '/0').getDownloadURL();
            auxImages.push({...product, uri});
        }
        console.log(auxImages.length);
        setProducts(auxImages);
        setLoading(false);
    }
    
    
    return (
        <FilterContext.Provider 
            value={{ 
                products,
                loading,
                filters,
                setFilters,
             }}>
            {children}
        </FilterContext.Provider>
    )
}

const useFilterContext = () => {
    const context = useContext(FilterContext);
    return context;
}

export { FilterProvider, useFilterContext }



