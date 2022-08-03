if(!sessionStorage.getItem('havesuccess')){
    location.replace('/submitApplication');
}else{
    sessionStorage.removeItem('havesuccess');
}
if(!sessionStorage.getItem('Applicationid')){
   
}else{
    sessionStorage.removeItem('Applicationid');
}