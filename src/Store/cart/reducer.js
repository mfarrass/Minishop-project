// file ini berisikan data cart

/* 
item yg dibuat berisikan array object ini
cart = [
    {
        id: 1,
        title: 'Product',
        price: 5000,
        count: 2
    }
]

*/

// [] = akan berisikan array of object yg berisikan datanya
const reducer = (state = [], action) => {
    switch (action.type) {
        // ADD CARD ITEM
        // berfungsi menambah 1
        case 'addCartItem':
            {
                // payload id, title, price
                const newState = [...state]
                // mengecek cek item.id didalam state (apakah id nya ada atau tidak)
                // findIndex = mirip seperti filter mereturn index sesuai kondisi
                // kalau item.id nya sesuai dengan action.payload.id, maka dia akan mereturn indexnya
                const itemIndex = newState.findIndex( item => item.id === action.payload.id )
                // kondisi belum ada
                if( itemIndex < 0){
                    newState.push({
                        id: action.payload.id,
                        title: action.payload.title,
                        price: action.payload.price,
                        count: 1
                    })
                } else {
                    // kondisi kalo ada
                    newState[itemIndex].count += 1
                }
                return newState
                
            }
        // Mengurangi Item (-1)
        // lessCartItem payloadnya: id
        case 'lessCartItem':
            {
                const newState = [...state]
                const itemIndex = newState.findIndex( item => item.id === action.payload.id )
                if ( newState[itemIndex].count <= 1 ) {
                    // itemIndex = index yg pengen dihapus
                    // 1 = jumlah item yg ingin dihapus
                    newState.splice(itemIndex,1)
                    // kondisi ketika jumlahnya lebih dari 1
                    // dikurang 1
                } else {
                    newState[itemIndex].count -= 1
                }
                return newState
                
            }
        // fungsi remove menghapus berapapun jumlah yg ada di card nya
        case 'removeCartItem':
            {
                // payloadnya: index
                const newState = [...state]
                // menghapus 1 item
                newState.splice(action.payload.index, 1)
                return newState
                
            }
        default:
            return state
    }
}

export default reducer