CS = new CSInterface

JSP = {

                   style:     getComputedStyle(document.body),

            isDrawerOpen:     function (drawer) {

                                if (typeof drawer === 'string') {
                                  drawer = document.getElementById(drawer)
                                }

                                if      (drawer.style.height === '0px') { return false }
                                else if (drawer.style.height === '')    { return false }
                                else                                    { return true }
                              },

              openDrawer:     function (drawer) {

                                if (!JSP.isDrawerOpen(drawer)) {

                                  if (typeof drawer === 'string') {
                                    drawer = document.getElementById(drawer)
                                  }
                                  
                                  drawer.style.height = drawer.scrollHeight+'px'
                                  drawer.style.marginBottom = '0'
                                  drawer.style.paddingTop = '18px'
                                  drawer.style.paddingBottom = '6px'

                                  drawer.dispatchEvent(new Event('opened'))
                                }

                                return true
                              },

             closeDrawer:     function (drawer) {

                                if (JSP.isDrawerOpen(drawer)) {

                                  if (typeof drawer === 'string') {
                                    drawer = document.getElementById(drawer)
                                  }

                                  drawer.style.height = '0'
                                  drawer.style.marginBottom = '14px'
                                  drawer.style.paddingTop = '0'
                                  drawer.style.paddingBottom = '0'
                                }
                              
                                return true
                              },

    assignDrawerToButton:     function (drawer, button) {
      
                                if (typeof drawer === 'string') {
                                  drawer = document.getElementById(drawer)
                                }
                                if (typeof button === 'string') {
                                  button = document.getElementById(button)
                                }

                                button.addEventListener('click', () => {
                                  if    (JSP.isDrawerOpen(drawer))  { JSP.closeDrawer(drawer) }
                                  else                              { JSP.openDrawer(drawer)  }
                                })

                                return true
                              },

    makeDrawersExclusive:     function (drawers) {
                                
                                for (var i=0; i<drawers.length; i++) {
                                  var drawer = drawers[i]
                                  if (typeof drawer === 'string') {
                                    drawer = document.getElementById(drawer)
                                  }

                                  drawer.addEventListener('opened', event => {
                                    
                                    for (var j=0; j<drawers.length; j++) {
                                      var toClose = drawers[j]
                                      if (typeof toClose === 'string') {
                                        toClose = document.getElementById(toClose)
                                      }

                                      if    (toClose === event.target)  { continue }
                                      else                              { JSP.closeDrawer(toClose) }
                                    }
                                  })
                                }
                                
                                return true
                              },

 makeCheckboxesExclusive:     function (checkboxes) {
                                
                                for (var i=0; i<checkboxes.length; i++) {
                                  var checkbox = checkboxes[i]
                                  if (typeof checkbox === 'string') {
                                    checkbox = document.getElementById(checkbox)
                                  }

                                  checkbox.addEventListener('change', event => {
                                    if (event.target.checked) {

                                      for (var j=0; j<checkboxes.length; j++) {
                                        var toUncheck = checkboxes[j]
                                        if (typeof toUncheck === 'string') {
                                          toUncheck = document.getElementById(toUncheck)
                                        }

                                        if (toUncheck !== event.target) {
                                          toUncheck.checked = false 
                                          var displayBox = toUncheck.parentNode.querySelector('.checkbox')
                                          displayBox.style.borderColor = JSP.style.getPropertyValue('--panel-dim-text')
                                          displayBox.style.background = 'none'
                                        }
                                      }
                                    }
                                  })
                                }

                                return true
                              },

              setHelpURL:     function (URL) {

                                document.getElementById('help').addEventListener('click', () => {
                                    CS.openURLInDefaultBrowser(URL)
                                  })

                                return true
                              },

          initCheckboxes:     function () {

                                document.querySelectorAll('label').forEach( label => {
                                  if (!label.querySelector('input[type="checkbox"]')) { return }
                                  if (!label.querySelector('.checkbox'))              { return }
                                  // hover start
                                  label.addEventListener('mouseover', () => {
                                    if (label.querySelector('input[type="checkbox"]').checked) {
                                      label.querySelector('.checkbox').style.borderColor = JSP.style.getPropertyValue('--panel-text')
                                      label.querySelector('.checkbox').style.background = JSP.style.getPropertyValue('--panel-text')
                                    }
                                    else {
                                      label.querySelector('.checkbox').style.borderColor = JSP.style.getPropertyValue('--panel-text')
                                      label.querySelector('.checkbox').style.background = 'none'
                                    }
                                  })
                                  // hover end
                                  label.addEventListener('mouseout', () => {
                                    if (label.querySelector('input[type="checkbox"]').checked) {
                                      label.querySelector('.checkbox').style.borderColor = JSP.style.getPropertyValue('--panel-dim-text')
                                      label.querySelector('.checkbox').style.background = JSP.style.getPropertyValue('--panel-dim-text')
                                    }
                                    else {
                                      label.querySelector('.checkbox').style.borderColor = JSP.style.getPropertyValue('--panel-dim-text')
                                      label.querySelector('.checkbox').style.background = 'none'
                                    }
                                  })
                                  // click start
                                  label.addEventListener('mousedown', () => {
                                    if (label.querySelector('input[type="checkbox"]').checked) {
                                      label.querySelector('.checkbox').style.borderColor = JSP.style.getPropertyValue('--panel-dim-text')
                                      label.querySelector('.checkbox').style.background = JSP.style.getPropertyValue('--panel-dim-text')
                                    }
                                    else {
                                      label.querySelector('.checkbox').style.borderColor = JSP.style.getPropertyValue('--panel-dim-text')
                                      label.querySelector('.checkbox').style.background = JSP.style.getPropertyValue('--panel-dim-text')
                                    }
                                  })
                                  // click end
                                  label.addEventListener('mouseup', () => {
                                    if (label.querySelector('input[type="checkbox"]').checked) {
                                      label.querySelector('.checkbox').style.borderColor = JSP.style.getPropertyValue('--panel-text')
                                      label.querySelector('.checkbox').style.background = JSP.style.getPropertyValue('--panel-text')
                                    }
                                    else {
                                      label.querySelector('.checkbox').style.borderColor = JSP.style.getPropertyValue('--panel-text')
                                      label.querySelector('.checkbox').style.background = 'none'
                                    }
                                  })
                                  // click
                                  label.addEventListener('click', () => {
                                    if (label.querySelector('input[type="checkbox"]').checked) {
                                      label.querySelector('.checkbox').style.borderColor = JSP.style.getPropertyValue('--panel-text')
                                      label.querySelector('.checkbox').style.background = 'none'
                                      label.querySelector('input[type="checkbox"]').checked = false
                                    }
                                    else {
                                      label.querySelector('.checkbox').style.borderColor = JSP.style.getPropertyValue('--panel-text')
                                      label.querySelector('.checkbox').style.background = JSP.style.getPropertyValue('--panel-text')
                                      label.querySelector('input[type="checkbox"]').checked = true
                                    }
                                  })
                                })

                                return true
                              },

                 refresh:     function () {
                               
                                document.querySelectorAll('label').forEach( label => {
                                  if (!label.querySelector('input[type="checkbox"]')) { return }
                                  if (!label.querySelector('.checkbox'))              { return }
                                  if (label.querySelector('input[type="checkbox"]').checked) {
                                    label.querySelector('.checkbox').style.borderColor = JSP.style.getPropertyValue('--panel-dim-text')
                                    label.querySelector('.checkbox').style.background = JSP.style.getPropertyValue('--panel-dim-text')
                                  }
                                  else {
                                    label.querySelector('.checkbox').style.borderColor = JSP.style.getPropertyValue('--panel-dim-text')
                                    label.querySelector('.checkbox').style.background = 'none'
                                  }
                                })

                                return true
                              },

                    init:     function () {

                                JSP.initCheckboxes()
                                JSP.refresh()

                                return true
                              },

}

// initializing actions, executed on panel launch
JSP.init()
CS.evalScript('JSP.init()')