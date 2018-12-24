var dlgMain = new Window( 'dialog' );

dlgMain.text = 'Hello!';
dlgMain.orientation = 'row';
dlgMain.alignChildren = 'top';

var mainPanel = dlgMain.add( 'group' );
mainPanel.orientation = 'column';
mainPanel.alignChildren = 'fill';

var text = mainPanel.add( 'edittext', undefined, undefined, {multiline:true, readonly:true} );
text.preferredSize.height = 265;
text.preferredSize.width = 620;
text.text = 'Here can be your text'

var buttonsPanel = mainPanel.add('group');
buttonsPanel.orientation = 'column';
buttonsPanel.alignChildren = 'center';
buttonsPanel.alignment = 'fill';

var btnAddText = buttonsPanel.add('button');
btnAddText.text = 'Moar text';

var count = 0;
btnAddText.onClick = function() {
	count ++;
	var prev_text = text.text;
	var new_text = prev_text + "\n" + "New text block #" + count;
	text.text = new_text
}

var btnDone = buttonsPanel.add('button');
btnDone.text = 'Close it!';

btnDone.onClick = function() {
	dlgMain.close(true); 
}

app.bringToFront();

dlgMain.center();

dlgMain.show();