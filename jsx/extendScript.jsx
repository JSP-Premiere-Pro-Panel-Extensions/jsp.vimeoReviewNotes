#include jspScriptSupport.jsx
#include ../js/lib/json2.js

function loadCsv () {
    // ask the user to open a file
    var file = File.openDialog()
    // did the user select a file?
    if (! file) { return false }
    // did the user select a CSV file?
    if (file.name.slice(-4) !== '.csv') {
        alert('Error\n'+file.fsName.split('/').slice(-1)+' is not a CSV file')
        return false
    }
    // read the CSV file
    file.open('r')
    var csv = file.read()
    // did the user select a valid Vimeo Review CSV file? (as of Jan. 2023)
    const header = '"Video Version","#","Timecode","Name","Note","Reply","Date Added","Resolved"'
    if (csv.slice(0,76) !== header) {
        alert('Error\n'+file.fsName.split('/').slice(-1)+' is not a Vimeo review CSV file')
        return false
    }
    return csv
}

function generateMarkers (notes, incResolved, incDate, incName) {
    // do not try to generate markers without an active sequence
    var sequence = app.project.activeSequence
    if (! sequence) { 
        JSP.dispatchEvent('message',
                          'No active sequence')
        return false 
    }
    var markers = sequence.markers
    var markersPlaced = 0
    // iterate through given notes
    for (i=0; i<notes.length; i++) {
        var note = notes[i]
        // report progress to user
        JSP.dispatchEvent('message', 
                          (i).toString() +
                          ' / ' +
                          notes.length.toString() +
                          ' notes processed')
        // skip note if note is resolved and incResolved is false
        if (note.resolved === 'Yes' && incResolved === false) { continue }
        // convert timecode to seconds
        var hours = parseInt(note.timecode.split(':')[0])
        var minutes = parseInt(note.timecode.split(':')[1]) + 60*hours
        var seconds = parseInt(note.timecode.split(':')[2]) + 60*minutes
        // add marker to active sequence
        var marker = markers.createMarker(seconds)
        markersPlaced++
        // set marker color according to resolved
        if (note.resolved === 'Yes') {
            marker.setColorByIndex(5) // white
        }
        else {
            marker.setColorByIndex(1) // red
        }
        // set comments
        if (note.reply === '--') {
            marker.comments = note.note
        }
        else {
            marker.comments = note.reply
        }
        if (incDate === false && incName === false) { continue }
        marker.comments += '\n('
        if (incDate === true) {
            marker.comments += note.date.replace('At','at')
        }
        if (incDate === true && incName === true) {
            marker.comments += ' by '
        }
        if (incName === true) {
            marker.comments += note.name
        }
        marker.comments += ')'
    }
    // completion message
    if (markersPlaced === 1) {
        JSP.dispatchEvent('message',
                          '1 marker placed')
    }
    else {
        JSP.dispatchEvent('message',
                          markersPlaced.toString() + 
                          ' markers placed')
    }
    return true
}