Element.prototype.appendAfter = function(element) {
    element.parentNode.insertBefore(this, element.nextSibling)
}

function noop() {}

function _createModalFooter (buttons = []) {
    if (buttons.length === 0) {
        return document.createElement('div')
    }

    const wrap = document.createElement('div')   //добавится в DOM после modal-body
    wrap.classList.add('modal-footer')

    buttons.forEach(btn => {
        const $btn = document.createElement('button')
        $btn.textContent = btn.text
        $btn.classList.add('btn')
        $btn.classList.add(`btn-${btn.type || 'secondary'}`)
        $btn.onclick = btn.handler || noop

        wrap.appendChild($btn)                   //добавляем в DOM
    })

    return wrap
}

function _createModal(options) {
    const DEFAULT_WIDTH = '600px'
    const modal = document.createElement('div')
    modal.classList.add('vmodal')
    modal.insertAdjacentHTML('afterbegin', `    
    <div class="modal-overlay" data-close = 'true'>
        <div class="modal-window" style="width: ${options.width || DEFAULT_WIDTH}">
            <div class="modal-header">
                <span class="modal-title">${options.title || 'Window'}</span>
                ${options.closable ? `<span class="modal-close" data-close ='true'>&times;</span>` : ''}
            </div>
            <div class="modal-body" data-content>
                ${options.content || ''}
            </div>
         </div>
    </div>
`)

const footer = _createModalFooter(options.footerButtons)
footer.appendAfter(modal.querySelector('[data-content]'))  //для создания modal-footer в DOM после modal-body
document.body.appendChild(modal)
return modal
}



$.modal = function(options) {
    const ANIMATION_SPEED = 200
    const $modal = _createModal(options)

    const modal = {
        open() {
             $modal.classList.add('open')
         },
         close() { 
             $modal.classList.remove('open')
             $modal.classList.add('hide')
             setTimeout (() => {
                 $modal.classList.remove('hide')
                 if (typeof options.onClose === 'function') {
                    options.onClose()
                 }
             }, ANIMATION_SPEED)
         },
    }

    const listener = event => {
        if(event.target.dataset.close) {
            modal.close()
        }     
    }

    $modal.addEventListener('click', listener)

    return Object.assign(modal, {
        destroy() {
            $modal.parentNode.removeChild($modal)
            $modal.removeEventListener('click', listener) 
        },
        setContent(html) {
            $modal.querySelector('[data-content]').innerHTML = html
        }
    })
}