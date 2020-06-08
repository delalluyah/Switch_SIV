const baseUrl = "http://localhost:5000/api";
const constants = {
  user_token_name: "inventory_sales_cred",
  backendApi: {
    login: baseUrl + "/auth/login/",
    add_category: baseUrl + "/productcategory/add/",
    get_categories: baseUrl + "/productcategory/index/",
    delete_category: baseUrl + "/productcategory/delete/",
    update_category: baseUrl + "/productcategory/update/",
    add_type: baseUrl + "/producttype/add/",
    get_types: baseUrl + "/producttype/index/",
    delete_type: baseUrl + "/producttype/delete/",
    update_type: baseUrl + "/producttype/update/",
    search_products_by_code: baseUrl + "/product/SearchByCode/",
    add_product: baseUrl + "/product/add/",
    get_products: baseUrl + "/product/index/",
    delete_product: baseUrl + "/product/delete/",
    update_product: baseUrl + "/product/update/",
    search_product_by_name_and_code: baseUrl + "/product/search/",
    search_product_by_id: baseUrl + "/product/searchbyid/",
    get_dashboard_summary: baseUrl + "/dashboard/getsummary/",
    register_user: baseUrl + "/auth/Register/",
    get_users: baseUrl + "/user/index/",
    get_user_by_id: baseUrl + "/user/GetById/",
    update_user: baseUrl + "/user/update/",
    delete_user: baseUrl + "/user/delete/",
    get_roles: baseUrl + "/role/index/",
    record_sales: baseUrl + "/Sales/RecordSales/",
    get_sales_records: baseUrl + "/Sales/SalesRecords/",
    sales_rec_by_date: baseUrl + "/Sales/SalesRecordsByDate/",
    sales_rec_by_id: baseUrl + "/Sales/SalesRecordsById/",
  },
  salesTypes: [
    { name: "Bulk Purchase", id: 1 },
    { name: "Retail Purchase", id: 2 },
  ],
  salesTypeConstants: {
    Bulk: 1,
    Retail: 2,
  },
  company: {
    name: "LULU'S BUSINESS CENTER",
    location: "Comet - Kwabenya",
    phone: "+233244825469",
    email: "duholucia@gmail.com",
  },
};

export default constants;
