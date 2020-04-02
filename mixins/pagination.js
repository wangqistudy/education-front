/*
 * @Author: David
 * @Date: 2019-10-24 11:49:34
 * @LastEditTime: 2019-11-26 10:48:25
 * @LastEditors: Do not edit
 * @Description: 分页混合器
 */
export default {
    data () {
      return {
        totalCount:0,
        pageSize:6,
        currPage:1,
        tableData:[],
        pageLoading:true,
        dataFilters:{
          
        }
      }
    },
    methods: {
        getList (param = this.dataFilters) {
          return new Promise((resolve,reject)=>{
                param = Object.assign({},param)
                if (param.page === undefined){
                  param.page = this.currPage;
                }
                if (param.page_num === undefined) {
                  param.page_num = this.pageSize
                }
                this.listApi(param)
                .then(data=>{
                    this.tableData = data.data.data
                    this.setPagination(data.data.pagination)
                    this.pageLoading = false;
                    resolve(data.data)
                })
                .catch(err=>{
                  reject(err)
                })
          })
        },
        setPagination (pagination) {
            let {total,per_page,current_page,total_pages} = pagination
            this.totalCount =total-0;
            this.pageSize = per_page-0;
            this.currPage = current_page-0;
        },
        handleCurrentChange (page) {
            this.currPage = page;
            this.getList()
        },
        setDataFilters (value) {
          this.$set(this,'dataFilters',value)
        }
    },
}