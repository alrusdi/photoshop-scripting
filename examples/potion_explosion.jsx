var imported_data = [
	['1','11','Черный 1','Зеленый 2','Синий 4', false],
	['4','5','Зеленый 2','Черный 3','', false],
	['4','3','Желтый 1','Синий 1','Зеленый 2', true],
	['4','7','Зеленый 1','Синий 2','Черный 3', false],
	['4','9','Синий 3','Желтый 4','', false],
	['2','5','Желтый 2','Синий 3','', false],
	['8','11','Желтый 3','Черный 4','', false],
	['2','7','Желтый 1','Черный 2','Синий 3', false],
	['2','10','Черный 3','Зеленый 4','', false],
	['1','8','Черный 2','Желтый 4','', false],
	['2','4','Зеленый 1','Черный 1','Желтый 2', true],
	['6','4','Зеленый 1','Синий 2','Желтый 2', false],
	['6','3','Черный 2','Желтый 2','', true],
	['6','6','Синий 2','Черный 4','', false],
	['6','9','Синий 1','Желтый 2','Зеленый 4', false],
	['8','5','Желтый 1','Черный 1','Синий 2', true],
	['8','7','Синий 2','Зеленый 3','', false],
	['5','6','Черный 1','Синий 2','Желтый 2', false],
	['1','5','Зеленый 2','Желтый 2','', true],
	['5','8','Желтый 2','Зеленый 4','', false],
	['1','6','Синий 1','Зеленый 2','Черный 2', false],
	['3','10','Зеленый 1','Черный 2','Желтый 4', false],
	['3','8','Зеленый 2','Синий 4','', false],
	['3','6','Желтый 1','Зеленый 2','Черный 2', false],
	['3','4','Синий 2','Черный 2','', true],
	['8','9','Синий 1','Желтый 2','Зеленый 3', false],
	['7','10','Зеленый 3','Синий 4','', false],
	['5','10','Желтый 1','Синий 2','Черный 4', false],
	['7','7','Черный 1','Зеленый 2','Желтый 3', false],
	['7','4','Зеленый 1','Синий 1','Черный 2', true],
	['7','5','Черный 2','Желтый 3','', false],
	['5','4','Зеленый 2','Синий 2','', true]
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
	app.activeDocument.exportDocument(File('G:/po/'+fname+'.png'), ExportType.SAVEFORWEB, docExportOptions)
}

function set_price(price) {
	var pls = app.activeDocument.layerSets.getByName("Цена");
	var idx = -1;
	var als = pls.artLayers;
	
	for (var i =0; i < als.length; i++) {
		var ial = als[i];
		if (ial.name == 'bg') continue;
		ial.visible = false;
		if (ial.name == price) idx = i;
	}
	//pls.visible = true;
	als[idx].visible = true;
}

function set_name(inp) {
	var pls = app.activeDocument.layerSets.getByName("Названия");
	var idx = -1;
	var als = pls.artLayers;
	var b_ls = app.activeDocument.layerSets.getByName("Флаконы");
	var help_lss = app.activeDocument.layerSets.getByName("Подсказка").layerSets.getByName("Тексты").artLayers;
	for (var i = 0; i < als.length; i++) {
		var ial = als[i];
		if (ial.name == 'bg') continue;
		b_ls.layerSets.getByName("Ф"+i).visible=false;
		help_lss[i].visible=false;
		ial.visible = false;
		if ((i+1).toString() == inp) idx = i;
	}
	als[idx].visible = true;
	b_ls.layerSets.getByName("Ф"+idx).visible=true;
	help_lss[idx].visible=true;
}

function lch(s) {
	return s[s.length-1];
}

function get_fname(d, ct) {
	var ret = d[0]+'_'+d[1]+'_'+lch(d[2])+'_'+lch(d[3]);
	if (d[4]) {
		ret = ret + '_' + lch(d[4]);
	}
	ret = ret + '_' + ct;
	return ret;
}

var move = {
	'layer_set': false,
	'dirs': [0, 0]
}

var last_moves = [false, false, false];

function move_hole(name, x, y) {
	var l = app.activeDocument.layerSets.getByName(name);
	l.visible = true;
	l.translate(x, y);
}

function parse_dt(inp) {
	var ret = inp.split(' ');
	var x = 50 * (parseInt(ret[1]) - 1);
	if (x == 150) x = 154;
	return {'name': ret[0], 'val': -x}
}

function move_holes(l1, l2, l3) {
	app.activeDocument.layerSets.getByName("Синий").visible=false;
	app.activeDocument.layerSets.getByName("Черный").visible=false;
	app.activeDocument.layerSets.getByName("Желтый").visible=false;
	app.activeDocument.layerSets.getByName("Зеленый").visible=false;
	
	var y = l3 ? -110 : -55
	var dt = parse_dt(l1);
	move_hole(dt.name, dt.val, y);
	last_moves[0] = {'layer_set': dt.name, 'dirs': [dt.val, y]};
	
	y = l3 ? -55 : 0;
	dt = parse_dt(l2);
	move_hole(dt.name, dt.val, y);
	last_moves[1] = {'layer_set': dt.name, 'dirs': [dt.val, y]};
	
	if (l3) {
		y = 0;
		dt = parse_dt(l3);
		move_hole(dt.name, dt.val, y);
		last_moves[2] = {'layer_set': dt.name, 'dirs': [dt.val, y]};
	} else {
		last_moves[2] = false;
	}
	
}

function restore_holes() {
	for (var i =0; i < last_moves.length; i++) {
		var mv = last_moves[i];
		if (mv) {
			var ils = app.activeDocument.layerSets.getByName(mv.layer_set);
			ils.translate(-mv.dirs[0], -mv.dirs[1])
		}
	}
	last_moves = [false, false, false];
}

function set_star_state(is_visible) {
	app.activeDocument.layerSets.getByName("Start").visible = is_visible;
}

/*
var l = app.activeDocument.layerSets.getByName("Синий");
l.translate(-100, -55);
var l = app.activeDocument.layerSets.getByName("Зеленый");
l.translate(-50, -110);
*/

for (var j=0; j < imported_data.length; j++) {
	var d = imported_data[j];
	set_name(d[0]);
	set_price(d[1]);
	move_holes(d[2], d[3], d[4]);
	set_star_state(d[5]);
	do_export(get_fname(d, 1));
	do_export(get_fname(d, 2));
	set_star_state(false);
	restore_holes();
}

