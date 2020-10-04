var list_item = document.querySelectorAll("li");

for(var i = 0; i < list_item.length; i++){

 	list_item[i].addEventListener("mouseover", function(){
		this.style.color = "blue";
	})

	list_item[i].addEventListener("mouseout", function(){
		this.style.color = "black";
	})
	list_item[i].addEventListener("click", function(){
		this.classList.toggle("done");
	})

}