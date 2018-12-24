
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
	app.activeDocument.exportDocument(File('G:/words/'+fname+'.png'), ExportType.SAVEFORWEB, docExportOptions)
}

var ls = app.activeDocument.layerSets;

for (var j=0; j < ls.length; j++) {
	var cur_ls = ls[j];
	if ( ! cur_ls.visible) continue;
	var layers = ls[j].artLayers;
	fname = cur_ls.name.toLowerCase();
	layers[0].visible = true;
	var en_layer = layers[1];
	var ru_layer = layers[2];
	ru_layer.visible = true;
	do_export('ru/'+fname);
	ru_layer.visible = false;
	en_layer.visible = true;
	do_export('en/'+fname);
	cur_ls.visible = false;
}
