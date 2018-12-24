
function do_export(fname) {
	docExportOptions = new ExportOptionsSaveForWeb 

	docExportOptions.format = SaveDocumentType.PNG //-24 //JPEG, COMPUSERVEGIF, PNG-8, BMP 
	docExportOptions.transparency = true 
	docExportOptions.blur = 0.0 
	docExportOptions.includeProfile = false 
	docExportOptions.interlaced = false 
	docExportOptions.optimized = true 
	docExportOptions.quality = 100 
	docExportOptions.PNG8 = false 
	app.activeDocument.exportDocument(File('G:/ad/'+fname+'.png'), ExportType.SAVEFORWEB, docExportOptions)
}

function hide_other_than_num(items, inum) {
	var i_item;
	for (var j=0; j < items.length; j++) {
		i_item = items[j];
		i_item.visible = false;
		if (i_item.name == inum) {
			i_item.visible = true;
		}
	}
}

var global_ls = app.activeDocument.layerSets;
var actions_ls = global_ls.getByName("Actions").layerSets;
var colors_ls = global_ls.getByName("Colors").artLayers;
var nums = [];

for (var i=0; i < colors_ls.length; i++) {
	nums.push(colors_ls[i].name);
}


var color_layer;
var color_layer_name;
var actions_set;
for (var m=0; m < 5; m++) {
	var num = nums[m];
	hide_other_than_num(colors_ls, num);
	hide_other_than_num(actions_ls, num);
	
	actions_set = actions_ls.getByName(num).layerSets;
	for (var k=1; k < 12; k++) {
		hide_other_than_num(actions_set, ''+k);
		do_export(num + '_' + k);
	}
		
}
