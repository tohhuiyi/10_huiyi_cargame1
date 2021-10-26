var brandlist = new Array("Porsche","Volkswagen","Audi","BMW");
var count=0;

var clients_served = 0;
var cars_sold  = 0;
var amount = 0;
var brandcost = new Array(72500,23930,31260,43990);

function newClient(){
	var preference = Math.floor((Math.random()*4));
	var time = Math.floor((Math.random()*10000)+1);
	var client = Math.floor((Math.random()*10)+1);
	if(count<5){
		$("#clients_queue").append('<div class="client client_'+client+'"><span class="preference">Client for '+brandlist[preference]+'</span></div>');
		count++;
	}
}
setTimeout(function(){newClient();},time);
$("document").ready(function() {
	newClient();
});
function makeCarBoxesDroppable(brand){
	var smallBrand = brand.toLocaleLowerCase();
	var $carBoxes = $("#"+ smallBrand +" .car");
	var option = {
					accept:'.choice_'+ brand,
					drop: function(e, ui) {
						var $dropBox = $(this);
						var $dragBox = $(ui.draggable);
					}
	}
}
function makeAllCarBrandsDroppable() {
	for(var i=0;i<brandlist.lenght;i++) {
		var brand =brandlist[i];
		makeCarBoxesDroppable(brand);
	}
}
function makeCarBoxesDroppable(brand) { 
	var smallBrand = brand.toLocaleLowerCase();
	var $carBoxes = $("#" + smallBrand +"")
	$(
		function()  {
			makeAllCarBrandsDroppable();
			newClient();
		}
		setTimeout(function() {
					removeBox($dragBox, -100);
							},
							500	
							);
	})
	);
}
function makeExitDroppable() {
	var $exit = $("#exit");
	var option = {
					accept:'.client',
					drop: function(e, ui) {
						var $dragBox = $(this);
						var $dragBox = $(ui.draggable);
						$dropBox.append($dragBox);
						$dragBox.position({of:$dropBox,my:'left top',at:'left top'});
						
						var alignCenterStyle = {
							"margin-top": '5px',
							"margin-bottom":'0px',
							"margin-left": "30px"
						};
					$dragBox.css(alignCentreStyle);
					if($dragBox.hasClass('selected') == false) {
						count--;
						newClient();
					}
						
					count--;
				}
			};
	$exit.droppable(options);
	
function makeCarBoxesDroppable(brand) {
	var smallBrand = brand.toLowerCase();
	var $carBoxes = $("#" + smallBrand + " .car");
	var options = {
					accept:' .choice_' + brand,
					drop: function(e, ui) {
						var	$dropBox = $(this);
						var $dropBox = $(ui.draggable);
						$dropBox.append($dragBox);
						$dragBox.position({of:$dropBox,my:'left top',at:});
										   
						var removeMarginStyle = {
										   "margin-top":'0px',
										   "margin-bottom": '0px',
										   "margin-left":"-3px"
										};				   
									$dragBox.css(removeMarginStyle);
									count--;
									$dragBox.addClass('selected');	
					         };  
		
		function removeBox(element,moveToTop,) {
			element.css("z-index 3000");
			var option = {top:moveToTop,};
			element.animate(option)
					.fadeOut(function() {
						element.remove();
			})
	
	}
		
	$(
		function() {
			makeAllCarBrandsDroppable();
		}
	)
	
	}
	}
}
function makeCashierDroppable()	{
	var $cashier = $("#cashier");
	var options = {
					accept:'.client.selected',
					drop: function(e, ui) {
						var $dropBox = $(this);
						var $dragBox = $(ui.draggable);
						$dropBox.append($dragBox);
						$dragBox.position({of:$dropBox,my:'left top',at:'left top'});
						
						var alignCenterStyle = {
								"margin-top": '30px',
								"margin-bottom": '0px',
								"margin-left": '40',
						};
					$dragBox.css(alignCentreStyle);
					showCashierDialog($dragBox);
				}
			};
	$cashier.droppable(option);
}

function showCashierDialog(dragClient) {
	
	var option = {
					button: {
								"Yes": function() {
									clients_served += 1;
									cars_sold += 1;
									amount += calcost(dragClient);
									update();
									removeBox(dragClient, -235);
									$( this ).dialog( "close" );
								},
								"No and Exit": function() {
									
									removeBox(dragClient, -250);
									$( this ).dialog( "close" );
								}	
							},
							close: function() {
									removeBox(dragClient,-350);
							}
				};	
	var dialog = $('#dialog');
	dialog.dialog(option);
}

function calcost(dragClient)
{	
	if (dragClient.hasClass('choice_Porsche'))
	{
		return brandcost[0];
	}
	else if (dragClient.hasClass('choice_Volkswagen'))
	{
		return brandcost[1];
	}
	else if (dragClient.hasClass('choice_Audi'))
	{
		return brandcost[2];
	}
	else if (dragClient.hasClass('choice_BWM'))
	{
		return brandcost[3];
	}
}

function update()
{
	$('#client_served').text(clients_served +'clients');
	$('#cars_sold').text(cars_sold + 'cars');
	$('#amount').text('$'+amount);
}

$( 
	function() {
		makeAllCarBrandsDroppable();
		newClient();
		makeExitDroppable();
		makeCashierDroppable();
		showPage("splash");
	}
)
function showPage(id) {
		hideAllPages();
		var page = $("#" + id);
		var tweenEnd = {
						opacity: 1.0
						};
		page.animate(tweenEnd,1000);
		page.show();	
}
function hideAllPages() {
		var pages = $(".page-panel");
		pages.each(function() {
			var currentPage = $(this);
			var hideStyle = {
				opacity: 0.0,
				visibility: "visible"
			};
			currentPage.css(hideStyle);
			currentPage.hide();
		});
}
	


