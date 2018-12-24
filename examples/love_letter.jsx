var imported_data = [
	["Убийца", 1, true],
	["Шут", 1, true],
	["Стражница", 8, false],
	["Кардинал", 2, true],
	["Священник", 2, false],
	["Барон", 2, true],
	["Баронесса", 2, false],
	["Льстец", 2, true],
	["Служанка", 2, false],
	["Граф", 2, true],
	["Принц", 2, false],
	["Констебль", 1, true],
	["Король", 1, false],
	["Графиня", 1, false],
	["Королева", 1, true],
	["Принцесса", 1, false],
	["Предсказатель", 1, true]
];

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
	app.activeDocument.exportDocument(File('G:/ll/'+fname+'.png'), ExportType.SAVEFORWEB, docExportOptions)
}

var caps_lss = app.activeDocument.layerSets.getByName("Надписи").layerSets;
var img_lss = app.activeDocument.layerSets.getByName("Арт").artLayers;

for (var i=0; i < imported_data.length; i++) {
	var d = imported_data[i];
	var title = d[0];
	var count = d[1];
	var is_addon = d[2];
	var cls = caps_lss.getByName(title);
	var ils = img_lss.getByName(title);
	cls.visible = true;
	ils.visible = true;
	do_export(title.toLowerCase()+'_'+count);
	cls.visible = false;
	ils.visible = false;
}

