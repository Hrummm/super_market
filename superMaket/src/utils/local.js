export default{
    save(key,val){
        window.localStorage.setItem(key,JSON.stringify(val))
    },
    get(key){
      return JSON.parse(window.localStorage.getItem(key))  
    },
    remove(key){
        window.localStorage.removeItem(key)
    }
}