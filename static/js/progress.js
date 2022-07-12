let id = window.location.search.split('=')[1];

axios({
    method:'get',
    url:'/admin/oneApplication',
    params:{
        id:id,
    }
}).then((date)=>{
    console.log(date.data);
    if(date.data.data.approval_status == 0){

    }
}).catch((err)=>{
    console.log(err);
})