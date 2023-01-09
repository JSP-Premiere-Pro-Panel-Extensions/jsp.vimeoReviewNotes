var loadedNotes = null
refresh()

// review-link <input> enter
document.getElementById('review-link').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { downloadCsv() }
})

// download <icon> click
document.getElementById('download').addEventListener('click', downloadCsv)

// load-notes-from-csv-file <button> click
document.getElementById('load-notes-from-csv-file').addEventListener('click', loadCsv)

// generate-markers <button> click
document.getElementById('generate-markers').addEventListener('click', generateMarkers)

// message <div> click
document.getElementById('message').addEventListener('click', () => {
    clearMessage()
})

JSP.setHelpURL('https://github.com/JSP-Premiere-Pro-Panel-Extensions/jsp.vimeoReviewNotes/blob/main/README.md')

function refresh () {
    refreshBlockVisibility()
    refreshVersionsWindow()
    clearMessage()
}

function refreshBlockVisibility () {
    // if notes loaded, 
    // show versions/options/generate blocks
    // otherwise, hide versions/options/generate blocks
    if (loadedNotes) {
        document.getElementById('versions-block').style.display = 'block'
        document.getElementById('options-block').style.display = 'block'
        document.getElementById('generate-block').style.display = 'block'
    }
    else {
        document.getElementById('versions-block').style.display = 'none'
        document.getElementById('options-block').style.display = 'none'
        document.getElementById('generate-block').style.display = 'none'
    }
}

function refreshVersionsWindow () {
    // remove versions from versions window
    // add versions to versions window according to loadedNotes
    var versionsWindow = document.getElementById('versions-window')
    if (loadedNotes) {
        while (versionsWindow.lastChild) {
            versionsWindow.removeChild(versionsWindow.lastChild)
        }
        for (i=0; i<loadedNotes.length; i++) {
            // create version element
            var versionName = loadedNotes[i][0].version
            if (! versionName) {
                versionName = 'Current'
            }
            var noteCount = loadedNotes[i].length
            var versionElement = document.createElement('label')
            var versionDivCheckbox = document.createElement('div')
            versionDivCheckbox.classList.add('checkbox')
            var versionCheckbox = document.createElement('input')
            versionCheckbox.setAttribute('type','checkbox')
            var versionNameNode = document.createTextNode(versionName+' ')
            var versionNoteCount = document.createElement('span')
            versionNoteCount.classList.add('note-count')
            versionNoteCount.innerText = '('+noteCount.toString()+' notes)'
            versionElement.appendChild(versionDivCheckbox)
            versionElement.appendChild(versionCheckbox)
            versionElement.appendChild(versionNameNode)
            versionElement.appendChild(versionNoteCount)
            // set checked if most recent version
            if (i === 0) {
                versionCheckbox.checked = true
            }
            // add version element to versions window
            versionsWindow.appendChild(versionElement)
        }
        JSP.initCheckboxes()
        JSP.refresh()
    }
}

function downloadCsv () {
    var url = document.getElementById('review-link').value
    // fetch the current notes and load them if valid
    fetch(url+'/download_notes_csv')
        .then((response) => response.text())
        .then((text) => {
            if (validateCsv(text)) {
                loadNotesFromCsv(text)
            }
        })
}

function validateCsv (csv) {
    // is the given CSV string a valid Vimeo review CSV file? (as of Jan. 2023)
    const header = '"Video Version","#","Timecode","Name","Note","Reply","Date Added","Resolved"'
    if (csv.slice(0,76) === header) {
       return true
    }
    else {
        return false
    }
}

function loadCsv () {
    CS.evalScript('loadCsv()', result => {
        if (result !== 'false') {
            loadNotesFromCsv(result)
        }
    })
}

function loadNotesFromCsv (csv) {
    if (! csv) { return }
    // parse CSV string as an array
    var array = parseCsv(csv)
    if (! array) { return }
    loadedNotes = [[]]
    var currVersion = 0 // current version note array
    // iterate through CSV records, skip header
    for (i=1; i<array.length; i++) {
        var record = array[i]
        // if current record is blank
        // and current version note array is not,
        // advance current version
        if (! record[1]) {
            if (loadedNotes[currVersion].length > 0) {
                loadedNotes.push([])
                currVersion++
            }
            // if current record is blank,
            // and current version note array is blank,
            // move on
        }
        // if the current record is not blank, 
        // create a note object with properties based on corresponding fields
        // then add note object to current version note array in loadedNotes
        else {
            var note = {
                version: record[0],
                number: record[1],
                timecode: record[2],
                name: record[3],
                note: record[4],
                reply: record[5],
                date: record[6],
                resolved: record[7]
            }
            loadedNotes[currVersion].push(note)
        }
    }
    // remove last array if empty
    if (loadedNotes[loadedNotes.length-1].length === 0) {
        loadedNotes.pop()
    }
    // set loadedNotes to null if empty
    if (loadedNotes.length === 0) {
        loadedNotes = null
    }
    refresh()
}

function parseCsv (csv) {
    if (! csv) { return false }
    var array = [['']] // result array, start empty
    var quote = false // is the parser reading a quoted field?
    var record = 0 // current row of the result array
    var field = 0 // current field of the current record
    for (i=0; i<csv.length; i++) {
        var currChar = csv[i]
        var nextChar = csv[i+1]
        // if the current character is a quote
        // and the next character is not,
        // toggle quote 
        if (currChar === '"' && nextChar !== '"') {
            quote = !quote
            continue
        }
        // if the current character is a quote
        // and the next character is a quote,
        // add a single quote to the current field
        // and skip the next character
        if (currChar === '"' && nextChar === '"') {
            array[record][field] += '"'
            i++
            continue
        }
        // if the current character is a comma
        // and the parser is not reading a quoted field,
        // advance the current field
        if (currChar === ',' && !quote) {
            field++
            array[record].push('')
            continue
        }
        // if the current character is a newline
        // and the parser is not reading a quoted field,
        // advance the current record
        // and reset the current field to zero
        if (currChar === '\n' && !quote) {
            record++
            array.push([])
            field = 0
            array[record].push('')
            continue
        }
        // otherwise,
        // add the current character to the current field
        array[record][field] += currChar
    }
    return array
}

function generateMarkers () {
    var notes = []
    var versions = document.getElementById('versions-window').children
    for (i=0; i<versions.length; i++) {
        if (versions[i].querySelector('input[type="checkbox"]').checked) {
            notes.push(...loadedNotes[i])
        }
    }
    if (notes.length === 0) {
        setMessage('No versions selected')
        return
    }
    var script = 'generateMarkers('
    script += JSON.stringify(notes)
    script += ','
    script += document.getElementById('include-resolved-notes').checked.toString()
    script += ','
    script += document.getElementById('include-date').checked.toString()
    script += ','
    script += document.getElementById('include-name').checked.toString()
    script += ')'
    CS.evalScript(script)
}

// message updates
CS.addEventListener('message', updateMessage)
function updateMessage (event) {
    setMessage(event.data)
}
function setMessage (message) {
    document.getElementById('message').innerText = message
}
function clearMessage () {
    setMessage('')
}