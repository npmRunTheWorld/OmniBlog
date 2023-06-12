import { defineStore } from 'pinia';



const useUserStore = defineStore('user',{
   state : () => ({
   
      user : null,
      profileEmail : null,
      profileFirstName : null,
      profileLastName : null,
      profileUserName : null,
      profileId : null,
      profileInitials : null,
   
   }),
   
   getters : {
            
   }, 
   
   actions : {
      
      setInitials() {
         this.profileInitials = this.profileFirstName.at(0) + this.profileLastName.at(0);
      }
   }
   
})


export default useUserStore;