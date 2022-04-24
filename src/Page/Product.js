import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import ProductCard from '../Component/Product/ProductCard'

// memanggil data yang tadinya statik menjadi dinamis
// [...response.data] = sprate operator

const Product = () => {

  // store disini yg ada di provider (di index.js) minishopStore
  // product disini yang ada di file store.js (const reducer)

  // jadi variabel products disini sudah berisikan data dari store.js
  const products = useSelector(store => store.product )

  // membuat variabel useDispatch
  const dispatch = useDispatch()

  // menjalankan fungsi useEffect dan menjalankan dispatch
    useEffect(() => {
        // mengambil product dari API pake axios
        //  axios.get = untuk mendapatkan data
        axios.get('https://fakestoreapi.com/products/')
        // then disini untuk menjalankan promisenya
          .then( response => {  
            dispatch({
              type: 'populateProducts',
              payload: {
                products: [...response.data]
              }
            })
        })
    },[]) // karna dijalankan 1 kali render saja dikasih array kosong


  return (
    // menampilkan data kelayar
      <section>
        <div className='container'>
            <h2 className='text-2xl font-bold mb-8 text-center'>All Products</h2>
              <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4'>
                  {products.map( (product, index) => {
                      return (
                        // menampilkan judul
                        // product={product} = sebuah props
                        <div><ProductCard key={`product-${index}`} product={product} /></div>
                      )
                })}
              </div>
        </div>
    </section>
    )
  }

export default Product