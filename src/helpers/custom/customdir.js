
const customDirective = {
   mounted(el, binding){
      
      
      el.style.backgroundColor = binding.value;
   },
   
   updated(el, binding) {
      
      el.style.backgroundColor = binding.value;
   }
   
};


export default customDirective;