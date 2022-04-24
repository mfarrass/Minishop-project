// File ini untuk halaman (Cart) ketika kehalaman produk lalu klik button "add to cart" halaman ini akan menampilkan datanya

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const ShoppingCart = () => {

    const cart = useSelector( store => store.cart)
    // membuat kondisi button dibawah menggunakan dispatch
    const dispatch = useDispatch()

    const minButttonHandler = (id) => {
        dispatch({
            // fungsi mengurangkan 
            type: 'lessCartItem',
            payload: { id }
        })
    }
    const plusButtonHandler = (id, title,price) => {
        dispatch({
            // fungsi menambahkan
            type: 'addCartItem',
            payload: { id, title, price }
        })
    }

    const removeButtonHandler = (id) => {
        dispatch({
            // fungsi mengapus keseluruhan  
            type: 'removeCartItem',
            payload: { id }
        })
    }


    return (
        <section>
            <div className='container mt-5'>
                <h1 className='text-4xl font-bold text-center mb-8'>SHOPPING CART</h1>
                {/* membuat sebuah kondisi jika cartnya kosong */}
                {/* kondisi 1 jika cart nya kosong <= 0, tampil text ini */}
                { cart.length <= 0 && <h4 className='text-xl font-bold text-center'>No Item In Your Cart</h4>}
                {/* kondisi 2 jika > 0 / item tersedia*/}
                { cart.length > 0 && 
                    <>
                    <ul className='border-t border-solid border-gray-300 mb-8'>
                        {cart.map( (item, index) => {
                            return (
                            <li className='border-b border-solid border-gray-300 py-3' key={index}>
                                {/* nama itemnya */}
                                <div className='flex justify-between items-center'>
                                    <div className='mr-8'>
                                        <h5 className='font-bold'>{item.title}</h5>
                                    </div>
                                    {/* informasi jumlah harga */}
                                    <div className='flex space-x-8 items-end'>
                                        {/* harga Individu */}
                                        <div>
                                            <p className='text-xs'>Item Price</p>
                                            <p className='text-md'>${item.price}</p>
                                        </div>
                                        {/* Kuatitas */}
                                        <div>
                                            <p className='text-xs'>Item Qty</p>
                                            <div className='flex items-center space-x-3'>
                                                {/* menambahkan fitur + & - */}
                                                {/* memanggil conditional dispatch */}
                                                <div><button onClick={() => minButttonHandler(item.id)}>-</button></div>
                                                <div><p className='text-md'>{item.count}</p></div>
                                                <div><button onClick={() => plusButtonHandler(item.id, item.title, item.price)}>+</button></div>
                                            </div>
                                        </div>
                                        {/* Harga Total */}
                                        <div>
                                            <p className='text-xs'>Sub Total</p>
                                            <p className='text-md'>${item.price * item.count}</p>
                                        </div>
                                        {/* Remove Button */}
                                        <div>
                                            <button className='text-red-500' onClick={() => removeButtonHandler(item.id)}>Remove</button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            )
                        })}

                    </ul>
                    {/* membuat total harga */}
                        <div className='flex justify-end'>
                            <div className='text-3xl font-bold'>
                                {/* mengitung total menggunakan array method reduce */}
                                Total : ${cart.reduce( (total, item) => total + ( item.price * item.count ), 0) }
                            </div>
                        </div>
                    </>
                    }

            </div>
        </section>
    )
}


export default ShoppingCart