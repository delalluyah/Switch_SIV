const baseUrl = 'http://localhost:5000/api'
const constants = {
  backendApi: {
    login: baseUrl + '/auth/login',
    add_category: baseUrl + '/productcategory/add',
    get_categories: baseUrl + '/productcategory/index',
    delete_category: baseUrl + '/productcategory/delete/',
  },
}

export default constants
