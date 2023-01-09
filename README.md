# Vimeo Review Notes

Vimeo Review Notes is an extension for Adobe Premiere Pro that automatically converts comments from a Vimeo review page into markers on a sequence in Premiere.

This extension is tested and optimized for macOS and Adobe Premiere Pro version 2022 or later. Functionality on other operating systems or older versions of Premiere is not guaranteed.

1. [Installation](#installation)
2. [Loading review notes](#loading)
3. [Generating markers](#generating)
4. [Limitations](#limitations)

## Installation <a name="installation"></a>

First, [download the zip folder from this link](https://github.com/JSP-Premiere-Pro-Panel-Extensions/jsp.vimeoReviewNotes/files/10369807/jsp.vimeoReviewNotes.zip). Then, unzip the file on your computer. 

You should now have a folder named `jsp.vimeoReviewNotes`. 
Move or copy this folder into the appropriate location depending on your operating system.

If you're using macOS: `Macintosh HD/Library/Application Support/Adobe/CEP/extensions`

If you're using Windows: `C:\Program Files\Common Files\Adobe\CEP\extensions`

NOTE: functionality in Windows is not guaranteed.
    
Once you've placed the folder in the appropriate location, launch Adobe Premiere Pro 2022 or later. 
If the application is already running, close and relaunch it.

Access the panel extension by navigating through the Premiere menu at the top of the screen:
   
    Window -> Extensions -> Vimeo Review Notes
    
## Loading review notes <a name="loading"></a>

There are two methods of loading Vimeo review notes into the extension.

### 1. Download current notes

This method requires a valid link to a Vimeo review page. 
If you need help creating or accessing a Vimeo review page, [see this guide](https://vimeo.zendesk.com/hc/en-us/articles/224818367-Video-review-page-).

To download the current notes associated with a video, first type or paste your Vimeo review link for that video into the input field. 
Then click the download icon to the right.

![load notes](https://github.com/JSP-Premiere-Pro-Panel-Extensions/jsp.vimeoReviewNotes/blob/main/images/load_notes.png)

NOTE: if you've uploaded multiple versions of the video, this method will only access notes made on the most recent version. 
If you'd like to access all notes made on all versions of the video, use the following method.

### 2. Load notes from CSV file

This method requires a Vimeo review CSV file to be downloaded on your computer. 
To get the Vimeo review CSV file associated with a video, click the `...` and `Download CSV` buttons on the Vimeo review page for that video. 
If you need help creating or accessing a Vimeo review page, [see this guide](https://vimeo.zendesk.com/hc/en-us/articles/224818367-Video-review-page-).

![download CSV](https://github.com/JSP-Premiere-Pro-Panel-Extensions/jsp.vimeoReviewNotes/blob/main/images/download_csv.png)

To load notes from a Vimeo review CSV file, first click the `Load notes from CSV file` button. 
Then, using the system dialog, navigate to the location of the Vimeo review CSV file and click the `Open` button.

## Generating markers <a name="generating"></a>

To add markers to the active sequence based on the currently loaded notes, click the `Generate markers` button.

NOTE: marker generation requires an active sequence. 
If no sequence has been opened in Premiere, no markers will be generated.

![generate markers](https://github.com/JSP-Premiere-Pro-Panel-Extensions/jsp.vimeoReviewNotes/blob/main/images/generate_markers.png)

Marker information can be seen in the Premiere Pro `Markers` panel.
Markers representing resolved notes will be white, and markers representing unresolved notes will be red.

![markers panel](https://github.com/JSP-Premiere-Pro-Panel-Extensions/jsp.vimeoReviewNotes/blob/main/images/markers_panel.png)

There are a few ways to customize the marker generation process.

### Selecting versions 

If you've loaded notes from a CSV file, you may have notes from multiple versions of your video available. 
In the `Versions` section of the panel, select the version or versions of the video from which you'd like to retrieve notes.

If you've downloaded the current notes from a review link, there is only one set of notes available: those made on the current version of the video.

NOTE: if no versions are selected, no markers will be generated.

### Options

The `Options` section of the panel provides a few choices to customize what information is included in the marker generation process.

`Include resolved notes` - unchecking this box will ignore any notes that have been marked as resolved on the Vimeo review page.

`Include date` - checking this box will include the date and time that the note was made.

`Include name` - checking this box will include the name of the Vimeo account/user who made the note.

## Limitations <a name="limitations"></a>

### No undo functionality

Markers generated using the panel extension cannot be removed using the traditional undo function.

### No focal point information

When selecting a note on the Vimeo review page, you may notice a dot over the video indicating a focal point for the note.
This information is only available on the Vimeo review page; it is not accessible by the extension in Premiere.
