/**
 * Librería global javascript para manejo de cadenas
 * @returns {unresolved}
 */

function sprintf() {
    var args = arguments,
            string = args[0],
            i = 1;
    return string.replace(/%((%)|s|d)/g, function (m) {
        var val = null;
        if (m[2]) {
            val = m[2];
        } else {
            val = args[i];
            switch (m) {
                case '%d':
                    val = parseFloat(val);
                    if (isNaN(val)) {
                        val = 0;
                    }
                    break;
            }
            i++;
        }
        return val;
    });
}

function getLabelComboSelected(id) {
    var element = document.getElementById(id);
    return element.options[element.selectedIndex].text;
}
