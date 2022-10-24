const validate = {
  availableTags: [],
  /**
   * check if the input is not empty
   * @param {string} inputID 
   * @returns  {boolean} true if the input is not empty
   */
  verifyEmptyFieldName(inputID) {
    if ($(inputID).val() == "") {
      return false;
    } else {
      return true;
    }
  },
    /**
   * check if the input is not empty
   * @param {emailInputID} inputID 
   * @returns  {boolean} ture if it is a valid email
   */
  verifyEmptyFieldEmailAddress(emailInputID) {
    var re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var email = $(emailInputID).val();
    if (re.test(email)) {
      return true;
    } else {
      return false;
    }
  },
  /**
   * check if phone number is valid 8 digits
   * @param {string} inputtxt
   * @returns {boolean} true if it is a valid phone number
   *  
    */

  validatePhone(inputtxt) {
    var phoneno = /^\d{8}(?:\d{2})?$/;
    if (inputtxt.match(phoneno)) {
      return true;
    } else {
      return false;
    }
  },
  /**
   * check if the input is not valide and change style
   * @param {string} inputID
   * @param {boolean} verif
   *  @return {void}
    */
  validateStyling(inputID, verif, message) {  
    $(inputID).addClass(verif? 'isvalid' : 'iserror');

    $(inputID).after(verif?'' :`<span class="error">${message}</span>`);

  },
  autocoplete(  ) {
        
    $.get("https://jsonplaceholder.typicode.com/posts", function (data) {
      for (let i = 0; i < 7; i++) {
        let post = data[i];

        availableTags.push(post.title.substring(0, 4));
      }
      $("#name").autocomplete({
        source: availableTags,
      });
    });
  },

  
/**
 *init function
 * @returns {void}
 *
  */
  init: function () {
    av = this.availableTags;
    $("#contact input").on("change", function () {
      if ($("input[name=experience]:checked", "#contact").val() == "Yes") {
        $("#Yes").show();
      } else {
        $("#Yes").hide();
      }
    });
  
    this.autocoplete(av);
    let ids=["#name","#lname","#datepicker","#password"];
    ids.forEach((id)=>{
      $(id).blur(function () {
        let verif = validate.verifyEmptyFieldName(id);
        validate.validateStyling(id, verif,"This field is required");         
     
      });
      
  
    

    });

    
    $("#email").blur(function () {
      let verif = validate.verifyEmptyFieldEmailAddress("#email");
      validate.validateStyling("#email", verif, "Please enter a valid email");   
    }); 

    $("#tel").blur(function () {
       let verif = validate.validatePhone($(this).val());  
      validate. validateStyling("#tel", verif, "Please enter a valid phone number");

    });
    

    // on submit
    let verif = false;

    $("#btn_submit").click(function () {
      ids.forEach((id)=>{
         verif = validate.verifyEmptyFieldName(id);
        validate.validateStyling(id, verif);
      });
     
      if (!validate.verifyEmptyFieldEmailAddress("#email") ){
        {
          validate.validateStyling("#email", verif);
         
        }
      }

      if ( !validate.validatePhone($("#tel").val()) ){
              validate.validateStyling("#tel", verif);}  
      return verif;
    });
  },
  
};
const  slidecard = {
  /**
   * init function
   * @returns {void}
   *    
   *  
   * */
  int:function(){

   $num = $('.my-card').length;
   $even = $num / 2;
   $odd = ($num + 1) / 2;
   
   if ($num % 2 == 0) {
     $('.my-card:nth-child(' + $even + ')').addClass('active');
     $('.my-card:nth-child(' + $even + ')').prev().addClass('prev');
     $('.my-card:nth-child(' + $even + ')').next().addClass('next');
   } else {
     $('.my-card:nth-child(' + $odd + ')').addClass('active');
     $('.my-card:nth-child(' + $odd + ')').prev().addClass('prev');
     $('.my-card:nth-child(' + $odd + ')').next().addClass('next');
   }
   
   $('.my-card').click(function() {
     $slide = $('.active').width();
     console.log($('.active').position().left);
     
     if ($(this).hasClass('next')) {
       $('.card-carousel').stop(false, true).animate({left: '-=' + $slide});
     } else if ($(this).hasClass('prev')) {
       $('.card-carousel').stop(false, true).animate({left: '+=' + $slide});
     }
     
     $(this).removeClass('prev next');
     $(this).siblings().removeClass('prev active next');
     
     $(this).addClass('active');
     $(this).prev().addClass('prev');
     $(this).next().addClass('next');
   });
   
   
   // Keyboard nav
   $('html body').keydown(function(e) {
     if (e.keyCode == 37) { // left
       $('.active').prev().trigger('click');
     }
     else if (e.keyCode == 39) { // right
       $('.active').next().trigger('click');
     }
   });
  }
}

$(document).ready(function () {
  validate.init();
slidecard.int();




});
