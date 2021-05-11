import React, { createContext, useContext, useEffect, useState } from 'react';
import * as firebase from 'firebase';
import Jaccard from 'jaccard-index';

const FilterContext = createContext();

const categories = {
    "Adesivos": [],
    "Para vestir": ["Blusas", "Calças", "Roupas", "Calçados", "Saias", "Vestidos", "Blusões", "Tops", "Casacos", "Shorts"], 
    "Para sua casa": ["Quadros", "Vasos de plantas", "Móveis", "Luminárias", "Cadeiras", "Mesas", "Puff", "Cabeceira", "Estantes",
     "Prateleiras", "Armários", "Bancos", "Terrários", "Madeira de demolição", "Pallets", "Mesa de Cabeceira"], 
    "Papelaria": ["Cadernos", "Canetas", "Zines"],
    "Cosméticos": ["Desodorantes", "Sabonetes", "Maquiagem" ],
    "Impressões": ["Prints", "Arte digital", "Xilogravura", "Serigrafia", "Adesivos" ],
    "Esculturas": ["Argila", "Pedras", "Cristais", "Metais", "Madeira", "Vidro", "Resina"],
    "Desenhos": ["Lápis", "Digital", "Esboços" ],
    "Acessórios": ["Bolsas", "Brincos", "Piercings", "Aneis", "Pulseiras", "Colares", "Alianças"],
    "Pinturas": ["Aquarela", "Acrílica", "Óleo", "Técnicas mistas", "Colagens", "Carvão"]
  }

const FilterProvider = ({ children }) => {

    //const [displayProducts, setDisplayProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({});
    const [subCategoriesFilter, setSubCategoriesFilter] = useState([]);

    useEffect(()=>{
        if(loading === false){
            console.log("fetch products");
            console.log(filters);
            fetchProducts();
        }
    }, [filters, subCategoriesFilter]);

    const fetchProducts = async () => {
        setLoading(true);
        const auxProducts = [];
        const auxImages = [];
        let productsRef = firebase.firestore().collection('produto');
        if(subCategoriesFilter?.length > 0){
            console.log("subcategorias");
            productsRef = productsRef.where('subcategorias', 'array-contains-any', subCategoriesFilter);
        }else
        if(filters.category){
            console.log("categorias");
            productsRef = productsRef.where('categorias', 'array-contains', filters.category);
        } else
        if(filters.region){
            console.log("regioes");
            productsRef = productsRef.where('regioes', 'array-contains', filters.region);
        } else
        if(filters.prima){
            console.log("materias");
            productsRef = productsRef.where('materias', 'array-contains', filters.prima);
        } else
        if(filters.delivery){
            console.log("entrega");
            productsRef = productsRef.where('entrega', 'array-contains', filters.delivery);
        }
        const querySnapshot = await productsRef.get();
        querySnapshot.forEach( documentSnapshot => {
            const data = documentSnapshot.data();
            auxProducts.push(data);
        });
        console.log('meio');
        for(const product of auxProducts){
            try{
                const uri = await firebase.storage().ref('user_products/' + product.anunciante + '/' + product.titulo + '/0').getDownloadURL();
                auxImages.push({...product, uri});
            } catch(err){
                console.log(err);
            }
        }
        console.log(auxImages.length);
        setProducts(auxImages);
        setSubCategoriesFilter([]);
        setLoading(false);
    }
    
    const search = async (text) => {
        setLoading(true);
        let auxSubCategories = [];
        const jaccard = Jaccard();
        text.split(" ").forEach( word => {
            if(word.length > 3){
                let maxName = "";
                let max = 0;
                Object.values(categories).forEach( (subCategories) => {
                    subCategories.forEach((item) => {
                        const index = jaccard.index(word, item);
                        if(index > max){
                            max = index;
                            maxName = item;
                        }
                    })
                })
                console.log("busquei: " + word);
                console.log("entendeu: " + maxName);
                auxSubCategories.push(maxName);
            }
        });
        setSubCategoriesFilter(auxSubCategories);
        setLoading(false);
    }
    
    return (
        <FilterContext.Provider 
            value={{ 
                products,
                loading,
                filters,
                setFilters,
                search
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



