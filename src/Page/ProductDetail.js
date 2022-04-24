    // file ini memanggil detail dari product menggunakan 3 komponen
    // menggunakan useState untuk mengambil data menggunakan id
    // menggunakan useEffect untuk merender data diawal

import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom' // digunakan untuk membaca id
import { useDispatch } from 'react-redux'
import axios from 'axios' // digunakan untuk mengambil data API

    const ProductDetail = () => {

    // menggassing product menggunakan useState
    const [product, setProduct]  = useState({})
    // mengassign params untuk menampung object id
    const params = useParams()
    // menggunakan hook redux dispatch
    const dispatch = useDispatch()

    const addButtonHandler = (id, title, price) => {
        dispatch({
            type: 'addCartItem',
            payload: {id, title, price}
        })
    }

    
    // memanggil API ketika pertama kali render menggunakan useEffect dan axios
    useEffect(() => {
        // mengambil data dan idnya
        axios.get(`https://fakestoreapi.com/products/${params.id}`)
        // then catch = sebuah conditional
        .then( response => {
            if ( response.data !== null ) {
                // fungsi lain jika data tidak sama dengan null 
                setProduct({...response.data})
            } else {   
                // ketika konten datanya null dan melempar ke catch
                // menampilkan pesan error dalam pencarian id yg tidak tersedia di API
                return Promise.reject({ errorMessage: 'Product Not Available' })
            }
        })
        .catch( error => {
            setProduct({...error})
        })
    },[]) //menggunakan [] agar merender 1x diawal


    return (
        // render ke layar
        <section>
            <div className='container py-10'>
                {/* membuat dua kondisi product*/}
                {/* hasOwnProperty = sebuah method, untuk mengecek di dalam object product, ada properti tertentu atau tidak  */}
                {/*  && = untuk menunjukan kondisi true aja */}

                {/* ketika error */}
                { product.hasOwnProperty('errorMessage') &&  <h3 className='text-2xl text-center'>{product.errorMessage}</h3> }
                {/* ketika ada datanya */}
                { product.hasOwnProperty('title') && 
                    // membuat sebuah grid
                        <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
                            <div>
                                <img src={product.image} className="max-w-full aspect-square object-contain" alt="" />
                            </div>
                        <div>
                            <h2 className='text-2xl mb-4 font-bold'>{product.title}</h2>
                            <h1 className='text-4xl text-red-500 mb-4 font-extrabold'>${product.price}</h1>
                            <div>{product.description}</div>
                            <button onClick={() => addButtonHandler(product.id, product.title, product.price)} className='bg-green-500 border-0 px-6 py-2 text-white mt-8'>Add To Cart</button>
                        </div>
                    </div>
                    }
            </div>
            
        </section>
    )
}

export default ProductDetail