function bootstrapify(){$("table").addClass("table"),$("img").addClass("img-responsive")}function pagify(_context,_marker){var pageObj={pages:[],length:0};$(_context+" "+_marker).each(function(i,o){for(var $this=$(o),$next=$this.next(),content="";$next.length>0&&$next[0].localName!=_marker;)content+=$next[0].outerHTML,$next=$next.next();var page={number:i+1,title:$this.html(),content:content,class:0==i?"active":""};pageObj.pages.push(page),pageObj.length++}),console.log(pageObj),$.get("/templates/pagify.tpl.html",function(data){var tpl=Handlebars.compile(data),pageHTML=$(tpl(pageObj));$(_context).replaceWith(pageHTML),$(_context).on("click",function(e){var $target=$(e.target);if($target.hasClass("subnav-link")||$target.hasClass("page-nav-link")){e.preventDefault();var targetPageNum=Number($target.attr("href").replace("#page-",""));$(_context+" .active").removeClass("active"),$($target.attr("href")).addClass("active"),$(".subnav-link[href='"+$target.attr("href")+"']").closest("li").addClass("active");var nextPageNum=targetPageNum+1,prevPageNum=targetPageNum-1;nextPageNum>pageObj.length?$(".pager .next").addClass("disabled"):($(".pager .next a").attr("href","#page-"+nextPageNum),$(".pager .next").removeClass("disabled")),0==prevPageNum?$(".pager .previous").addClass("disabled"):($(".pager .previous a").attr("href","#page-"+prevPageNum),$(".pager .previous").removeClass("disabled"))}})})}$(function(){bootstrapify(),pagify(".content","h3")});