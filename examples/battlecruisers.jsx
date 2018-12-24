
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
	app.activeDocument.exportDocument(File('G:/bc/'+fname+'.png'), ExportType.SAVEFORWEB, docExportOptions)
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
var icons_ls = global_ls.getByName("Icons").layerSets;
var colors_ls = global_ls.getByName("Numbers").layerSets.getByName("Bg").layerSets.getByName("NumberColors").artLayers;
var nums = [];

for (var i=0; i < icons_ls.length; i++) {
	nums.push(icons_ls[i].name);
}

var proc_items = [
	global_ls.getByName('Icons').layerSets,
	global_ls.getByName('MainEffect').layerSets,
	global_ls.getByName('Clash').layerSets,
	global_ls.getByName('Titles').layerSets,
	global_ls.getByName('Numbers').layerSets.getByName('NumberValues').artLayers,
	global_ls.getByName('Art').artLayers
];

var color_layer;
var color_layer_name;
for (var m=0; m < 5; m++) {
	color_layer = colors_ls[m];
	color_layer_name = color_layer.name;
	hide_other_than_num(colors_ls, color_layer_name);
	for (var l in nums) {
		var num = nums[l];
		for (var k in proc_items) {
			var tg_items = proc_items[k];
			hide_other_than_num(tg_items, num);
		}
		do_export(num + '_' + color_layer_name);
	}
}
