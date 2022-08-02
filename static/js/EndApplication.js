if(!sessionStorage.getItem('havesuccess')){
    location.replace('/submitApplication');
}else{
    sessionStorage.removeItem('havesuccess');
}