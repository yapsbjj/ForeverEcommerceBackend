import userModel from "../models/userModel.js"

//  add products to user cart 
const addToCart = async (req,res) =>{
    try {
        const { userId, itemId, size } = req.body
        
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            }
            else{
                cartData[itemId][size] = 1
            }
        }
        else{
            cartData[itemId] = {}
            cartData[itemId][size] = 1
            
        }

        await userModel.findByIdAndUpdate(userId, {cartData})
        res.json({ success: true, message: 'Ajouté au panier'})

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
        
    }
}

//  update products to user cart
const updateToCart = async (req,res) =>{
    try {
        const { userId, itemId, size, quantity } = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        cartData[itemId][size] = quantity

        await userModel.findByIdAndUpdate(userId, {cartData})
        res.json({ success: true, message: 'panier mis à jour'})

    } catch (error) {
         console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// get user cart data 
const getUserCart = async (req,res) =>{
    try {
        const { userId } = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        res.json({success: true, cartData });

    } catch (error) {
          console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export { addToCart, updateToCart, getUserCart} 