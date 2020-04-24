const baseUrl = 'http://localhost:5000/api'
const constants = {
  backendApi: {
    login: baseUrl + '/auth/login/',
    add_category: baseUrl + '/productcategory/add/',
    get_categories: baseUrl + '/productcategory/index/',
    delete_category: baseUrl + '/productcategory/delete/',
    update_category: baseUrl + '/productcategory/update/',
    add_type: baseUrl + '/producttype/add/',
    get_types: baseUrl + '/producttype/index/',
    delete_type: baseUrl + '/producttype/delete/',
    update_type: baseUrl + '/producttype/update/',
    search_products_by_code: baseUrl + '/product/SearchByCode/',
    add_product: baseUrl + '/product/add/',
    get_products: baseUrl + '/product/index/',
    delete_product: baseUrl + '/product/delete/',
    update_product: baseUrl + '/product/update/',
    search_product_by_name_and_code: baseUrl + '/product/search/',
  },
}

export default constants
