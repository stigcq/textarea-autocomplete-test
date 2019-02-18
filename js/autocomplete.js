
//taken from https://github.com/yuku/jquery-textcomplete
$('#autocomplete_textarea').textcomplete([
    { // html
        match: /(^|\b)(\w{2,})$/,
        search: function (term, callback) {

            //not sure why term is empty here, not enough familiar with this plugin
            //so getting the word with own code

            term = getCurrentWord();
            //console.log(term);

            //do ajax call
            $.ajax("https://services.lingapps.dk/misc/getPredictions?locale=en-GB&text=" + term , { 
                headers: {"Authorization": "Bearer MjAxOS0wMi0xMw==.c3RpZ2NxQHlhaG9vLmNvbQ==.MWYyYmU0NWZlZWUyZWZjYzBkNDBlYWI4NTA0ZjEzOTE="}
            }).done(function(data) {

                //console.log(data);
                callback(data);
              });

           
        },
        index: 1,
        replace: function (element) {
            return element + " ";
        }
    }
]);

//test to get current word
function getCurrentWord() {

    var cursorPosition = $('#autocomplete_textarea').prop("selectionStart");
    var content = $('#autocomplete_textarea').val();

    var i = 0;

    for(i = cursorPosition; i > 0; i--)
        if(content.substring(i-1, i) == " ")
            break;

    if(i < cursorPosition) {

        var word = content.substring(i, cursorPosition);

        //console.log("writing: " + word);

        return word;
    
    } else return "";
}



