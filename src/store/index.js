import { createStore } from 'vuex'
import api from '../config/api'

export default createStore({
  state: {
    products: [],
    productsInBag: []
  },
  mutations: {
    loadProducts(state, products){
      state.products = products
    },
    loadBag(state, products){
      state.productsInBag = products
    },
    addToBag(state, product){
      state.productsInBag.push(product)
      localStorage.setItem('productsInBag',JSON.stringify(state.productsInBag))
    },
    removeFromBag(state, productId){
      let updateBag = state.productsInBag.filter(item => productId != item.id)
      state.productsInBag = updateBag
      localStorage.setItem('productsInBag',JSON.stringify(state.productsInBag))
    }
  },
  actions: {
    loadProducts ( { commit } ){
      api.get('/products')
      .then(response => {
        commit('loadProducts', response.data);
      })
    },
    loadBag ( { commit } ){

      if(localStorage.getItem('productsInBag')){
        commit('loadBag', JSON.parse(localStorage.getItem('productsInBag')))
      }

    },

    addToBag( {commit}, product ){
      commit('addToBag', product)
    },

    removeFromBag( {commit}, productId ){
      if(confirm('Tem certeza que quer remover o item?')){
        commit('removeFromBag', productId)
      }
      
    }
  },
  modules: {
  }
})
