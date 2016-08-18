(function() {
  var defaultOptions={
    year:new Date().getFullYear(),
    month:new Date().getMonth()+1,
    pattern:'yyyy年mm月'
  }
  var MonthPicker=function(target,options){
    if(!target.nodeType=='input'){
      return;
    }
    this.target=target;
    this.readOnly=true;
    this.options=$.extend(defaultOptions,options);
    this.currentYear=this.options.year;
    this.currentMonth=this.options.month;
    this.init();
  }
  MonthPicker.prototype.prevYear=function(){
    if(!this.currentYear){
     this.currentYear = this.options.year
    }
    this.currentYear+=1;
    this.$header.find('.year').text(this.currentYear);
  }
  MonthPicker.prototype.nextYear=function(){
    if(!this.currentYear){
     this.currentYear = this.options.year
    }
    this.currentYear-=1;
    this.$header.find('.year').text(this.currentYear);
  }
  MonthPicker.prototype.init=function(){
    var _this=this;
    this.$header=$('<div class="pickerHead"><div class="year"></div><div class="prevYear">></div><div class="nextYear"><</div></div>');
    this.$header.find('.year').text(this.options.year);
    this.$header.find('.prevYear').bind('click',function(){
      _this.prevYear();
    });
    this.$header.find('.nextYear').bind('click',function(){
      _this.nextYear();
    });
    this.$months=$('<div class="months"></div>');
    for (var i = 1; i < 13; i++) {
      $('<div class="month">'+i+'月</div>').attr('m',i).appendTo(this.$months);
    }
    this.$picker=$('<div class="monthpicker" style="display:none;"></div>')
                   .append(this.$header)
                   .append(this.$months);
    this.$picker.bind("monthpicker.hide",function(){
      _this.onHideMonthPicker();
    });
    this.$months.find('.month').bind('click',function(){
      _this.currentMonth=$(this).attr("m");
      _this.$picker.trigger("monthpicker.hide")
    });
    $(this.target).on('focus',function(){_this.update()});
    $("body").on('click',function(e){
      var target=e.target||e.srcElement;
      if($(target).parents('.monthpicker').length==0&&$(target).not(_this.target).length!=0){
        _this.$picker.hide();
      }
    })
    this.$picker.insertAfter(this.target)
  };
  MonthPicker.prototype.update=function(){
     var val=this.target.value;
     var matches=val.match(/(\d{4})-(\d{2})/)
     if(val&&matches&&matches.length==3){
       this.currentYear=parseInt(matches[1]);
       this.currentMonth=parseInt(matches[2]);
       this.$header.find('.year').text(this.currentYear);
     }
     this.$picker.show();

  };
  MonthPicker.prototype.onHideMonthPicker=function(){
    this.target.value=this.currentYear+"-"+(this.currentMonth>9?this.currentMonth:"0"+this.currentMonth);
    this.$picker.hide();
  }
 $.fn.monthPicker=function(options){
   $.each(this,function(idx,target){
     new MonthPicker(target,options);
   });
   return this;
 }
})(jQuery)
