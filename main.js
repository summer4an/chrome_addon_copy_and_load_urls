//以下はpopup.htmlへのもの。
function copy_to_clipboard(string){
    var temp = document.createElement('div');
    temp.appendChild(document.createElement('pre')).textContent = string;
    var s = temp.style;
    s.position = 'fixed';
    s.left = '-100%';
    document.body.appendChild(temp);
    document.getSelection().selectAllChildren(temp);
    var result = document.execCommand('copy');
    document.body.removeChild(temp);
    return result; // true なら実行できている falseなら失敗か対応していないか
}

var button_load_tabs = document.getElementById('button_load_tabs');
if(button_load_tabs!=null){
    button_load_tabs.onclick = function() {
        window.open('load_tabs.html');
        window.close();
    };
}

var button_copy_tabs = document.getElementById('button_copy_tabs');
if(button_copy_tabs!=null){
    button_copy_tabs.onclick = function() {
        chrome.tabs.query(queryInfo={}, callback=function(tabs){
            text="";
            for(i=0; i<tabs.length; i++){
                text += tabs[i].url+" ["+tabs[i].title+"]\n";
            }
            text += '\n'; //なぜか一番最後の改行がコピーされないので追加。
            copy_to_clipboard(text);
            window.close();
        });
    };
}



//以下はload_tabs.htmlへのもの。
var button_load_tabs_exec = document.getElementById('button_load_tabs_exec');
if(button_load_tabs_exec!=null){
    button_load_tabs_exec.onclick = function() {
        var textarea_load_tabs_urls = document.getElementById('textarea_load_tabs_urls');
        var temp = textarea_load_tabs_urls.value.split(/[ \n\r]/);
        for(i=0; i<temp.length; i++){
            if(temp[i].startsWith('http')){
                window.open(temp[i]);
            }
        }
        window.close();
    };
}
