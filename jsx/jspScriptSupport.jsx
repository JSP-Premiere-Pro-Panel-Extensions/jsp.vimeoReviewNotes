JSP = {

              info:   function (message) {

                        app.setSDKEventMessage(message.toString(), 'info');

                        return true
                      },

     dispatchEvent:   function (type, data) {

                        var x = new ExternalObject("lib:PlugPlugExternalObject")
                        var event = new CSXSEvent()
                        event.type = type
                        event.data = data
                        event.dispatch()
                        
                        return true
                      },

 registerAppEvents:   function () {

                        app.bind('onProjectChanged', onProjectChanged)
                        function onProjectChanged () {
                          JSP.dispatchEvent('onProjectChanged','')
                        }
                        app.bind('onActiveSequenceChanged', onActiveSequenceChanged)
                        function onActiveSequenceChanged () {
                          JSP.dispatchEvent('onActiveSequenceChanged','')
                        }
                        app.bind('onActiveSequenceSelectionChanged', onActiveSequenceSelectionChanged)
                        function onActiveSequenceSelectionChanged () {
                          JSP.dispatchEvent('onActiveSequenceSelectionChanged','')
                        }
                        app.bind('onSequenceActivated', onSequenceActivated)
                        function onSequenceActivated () {
                          JSP.dispatchEvent('onSequenceActivated','')
                        }
                        app.bind('onActiveSequenceTrackItemRemoved', onActiveSequenceTrackItemRemoved)
                        function onActiveSequenceTrackItemRemoved () {
                          JSP.dispatchEvent('onActiveSequenceTrackItemRemoved','')
                        }
                        app.bind('onActiveSequenceTrackItemAdded', onActiveSequenceTrackItemAdded)
                        function onActiveSequenceTrackItemAdded () {
                          JSP.dispatchEvent('onActiveSequenceTrackItemAdded','')
                        }
                        app.bind('onSourceClipSelectedInProjectPanel', onSourceClipSelectedInProjectPanel)
                        function onSourceClipSelectedInProjectPanel () {
                          JSP.dispatchEvent('onSourceClipSelectedInProjectPanel','')
                        }
                        app.bind('onItemsAddedToProjectSuccess', onItemsAddedToProjectSuccess)
                        function onItemsAddedToProjectSuccess () {
                          JSP.dispatchEvent('onItemsAddedToProjectSuccess','')
                        }

                        return true
                      },
  
   getItemByNodeId:   function (nodeId) {

                        var item = null

                        function checkForItemIn (bin) {
                          for (var i=0; i<bin.children.length; i++) {
                            var child = bin.children[i]

                            if (child.nodeId === nodeId)    { item = child }
                            if (child.type === 2)           { checkForItemIn(child) }
                          }
                        }

                        checkForItemIn(app.project.rootItem)

                        return item
                      },
  
    getItemsByName:   function (name, bin) {

                        if (!bin) { bin = app.project.rootItem }

                        var items = []

                        function checkForItemIn (bin) {
                          for (var i=0; i<bin.children.length; i++) {
                            var child = bin.children[i]

                            if (child.name === name)        { items.push(child) }
                            if (child.type === 2)           { checkForItemIn(child) }
                          }
                        }

                        checkForItemIn(bin)

                        return items
                      },
                
       numberItems:   function (items) {

                        if (items) {
                          for (var i=0; i<items.length; i++) {
                            var item = items[i]
                            var name = item.name
                            var splt = name.split(': ')
                            var pNum = splt[0]

                            if (pNum !== name) {
                              if (!isNaN(pNum)) {
                                name = splt.slice(1).join()
                              }
                            }

                            item.name = i.toString()+': '+name
                          }
                        }

                        return true
                      },

     denumberItems:   function (items) {

                        if (items) {
                          for (var i=0; i<items.length; i++) {
                            var item = items[i]
                            var name = item.name
                            var splt = name.split(': ')
                            var pNum = splt[0]

                            if (pNum !== name) {
                              if (!isNaN(pNum)) {
                                item.name = splt.slice(1).join()
                              }
                            }
                          }
                        }

                        return true
                      },

    setColorLabels:   function () {

                        app.properties.setProperty('BE.Prefs.LabelNames.0','RED')
                        app.properties.setProperty('BE.Prefs.LabelColors.0','4145096')
                        app.properties.setProperty('BE.Prefs.LabelNames.1','ORANGE')
                        app.properties.setProperty('BE.Prefs.LabelColors.1','3510763')
                        app.properties.setProperty('BE.Prefs.LabelNames.2','YELLOW')
                        app.properties.setProperty('BE.Prefs.LabelColors.2','3792104')
                        app.properties.setProperty('BE.Prefs.LabelNames.3','GREEN')
                        app.properties.setProperty('BE.Prefs.LabelColors.3','5287301')
                        app.properties.setProperty('BE.Prefs.LabelNames.4','BLUE')
                        app.properties.setProperty('BE.Prefs.LabelColors.4','14459745')
                        app.properties.setProperty('BE.Prefs.LabelNames.5','VIOLET')
                        app.properties.setProperty('BE.Prefs.LabelColors.5','14317490')
                        app.properties.setProperty('BE.Prefs.LabelNames.6','PINK')
                        app.properties.setProperty('BE.Prefs.LabelColors.6','12749298')
                        app.properties.setProperty('BE.Prefs.LabelNames.7','WHITE')
                        app.properties.setProperty('BE.Prefs.LabelColors.7','14145495')
                        app.properties.setProperty('BE.Prefs.LabelNames.8','GRAY')
                        app.properties.setProperty('BE.Prefs.LabelColors.8','6513507')
                        app.properties.setProperty('BE.Prefs.LabelNames.9','BLACK')
                        app.properties.setProperty('BE.Prefs.LabelColors.9','1579032')

                        return true
                      },

  resetColorLabels:   function () {

                        app.properties.setProperty('BE.Prefs.LabelNames.0','Violet')
                        app.properties.setProperty('BE.Prefs.LabelColors.0','14717094')
                        app.properties.setProperty('BE.Prefs.LabelNames.1','Iris')
                        app.properties.setProperty('BE.Prefs.LabelColors.1','13408882')
                        app.properties.setProperty('BE.Prefs.LabelNames.2','Caribbean')
                        app.properties.setProperty('BE.Prefs.LabelColors.2','10016297')
                        app.properties.setProperty('BE.Prefs.LabelNames.3','Lavender')
                        app.properties.setProperty('BE.Prefs.LabelColors.3','14910691')
                        app.properties.setProperty('BE.Prefs.LabelNames.4','Cerulean')
                        app.properties.setProperty('BE.Prefs.LabelColors.4','14597935')
                        app.properties.setProperty('BE.Prefs.LabelNames.5','Forest')
                        app.properties.setProperty('BE.Prefs.LabelColors.5','5814353')
                        app.properties.setProperty('BE.Prefs.LabelNames.6','Rose')
                        app.properties.setProperty('BE.Prefs.LabelColors.6','10776567')
                        app.properties.setProperty('BE.Prefs.LabelNames.7','Mango')
                        app.properties.setProperty('BE.Prefs.LabelColors.7','3909357')
                        app.properties.setProperty('BE.Prefs.LabelNames.8','Purple')
                        app.properties.setProperty('BE.Prefs.LabelColors.8','9896087')
                        app.properties.setProperty('BE.Prefs.LabelNames.9','Blue')
                        app.properties.setProperty('BE.Prefs.LabelColors.9','16727100')
                        app.properties.setProperty('BE.Prefs.LabelNames.10','Teal')
                        app.properties.setProperty('BE.Prefs.LabelColors.10','8421376')
                        app.properties.setProperty('BE.Prefs.LabelNames.11','Magenta')
                        app.properties.setProperty('BE.Prefs.LabelColors.11','15151847')
                        app.properties.setProperty('BE.Prefs.LabelNames.12','Tan')
                        app.properties.setProperty('BE.Prefs.LabelColors.12','9814478')
                        app.properties.setProperty('BE.Prefs.LabelNames.13','Green')
                        app.properties.setProperty('BE.Prefs.LabelColors.13','2191389')
                        app.properties.setProperty('BE.Prefs.LabelNames.14','Brown')
                        app.properties.setProperty('BE.Prefs.LabelColors.14','1262987')
                        app.properties.setProperty('BE.Prefs.LabelNames.15','Yellow')
                        app.properties.setProperty('BE.Prefs.LabelColors.15','6611682')

                        return true
                      },

              init:   function () {

                        JSP.registerAppEvents()

                        return true
                      }

}