# Photoshop scripting

Adobe Photoshop обладает довольно богатой и хорошо задокументированной системой автоматизации.

Писать код можно для MacOS на Apple Script, для Windows на Visual Basic Script и кроссплатформенно на JavaScript


Документацию можно найти здесь: https://www.adobe.com/devnet/photoshop/scripting.html

# А как что вкратце?

Идея такая. Пишем код на JS в файлы с расширением .jsx, складываем их в директорию Presets/Scripts, которую можно найти рядом с Photoshop.exe. Там же, кстати, можно найти приличное количество готовых примеров использования API. Выполнение скриптов становится доступным из меню Файл->Автоматизация


Вариант проще: выполнять файлы с расширением .jsx выбирая их из диалога в Файл->Сценарии->Обзор...

# Как отлаживать?

По старинке можно вызывать блокирующее окошко alert() и там писать отладочную информацию. 
А если у вас легальная версия Photoshop, то можно выполнять скрипты из Extendscript Toolkit - там уже вменяемые инструменты отладки.
