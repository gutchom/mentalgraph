import React, { MouseEvent, ReactNode, useEffect, useRef } from 'react'

export interface ModalProps {
  className?: string
  header?: ReactNode
  footer?: ReactNode
  visible: boolean
  onClose(e: MouseEvent<HTMLButtonElement>): void
}

function isModal(target: EventTarget | null, ref: HTMLDivElement): boolean {
  if (target instanceof HTMLElement) {
    if (target === ref) {
      return true
    } else if (target.parentElement) {
      return isModal(target.parentElement, ref)
    }
  }
  return false
}

export const Modal: React.FC<ModalProps> = props => {
  const $root = useRef(document.createElement("div"))
  const $content = useRef(document.createElement("div"))
  let rootScrollPosition: number

  useEffect(() => {
    window.addEventListener('touchmove', preventBehindScroll)
    $content.current.addEventListener('scroll', adjustScroll)

    return () => {
      window.removeEventListener('touchmove', preventBehindScroll)
      $content.current.removeEventListener('scroll', adjustScroll)
    }
  })

  useEffect(() => {
    if (props.visible) {
      $content.current.scrollTo(0, 1)
      rootScrollPosition = document.body.scrollTop || document.documentElement.scrollTop
    }
  }, [props.visible])

  function adjustScroll() {
    const bottom = $content.current.scrollHeight - $content.current.clientHeight

    if ($content.current.scrollTop === 0) {
      $content.current.scrollTo(0, 1)
    }
    if ($content.current.scrollTop === bottom) {
      $content.current.scrollTo(0, bottom - 1)
    }
  }

  function preventBehindScroll(e: TouchEvent) {
    const bottom = $content.current.scrollHeight - $content.current.clientHeight

    if (props.visible) {
      if (isModal(e.target, $root.current)) {
        e.stopPropagation()
      } else if ($content.current.scrollTop === 0 || $content.current.scrollTop === bottom) {
        e.preventDefault()
      }
    }
  }

  function handleCloseClick(e: MouseEvent<HTMLButtonElement>) {
    window.scrollTo(0, rootScrollPosition)
    props.onClose(e)
  }

  return (
    <div className={`modal ${props.className} ${props.visible ? 'modal--visible' : ''}`} ref={$root}>
      <div className="modal--window">
        {props.header && <header>{props.header}</header>}
        {props.footer && <footer>{props.footer}</footer>}
        <button className="modal--close" onClick={handleCloseClick} tabIndex={-1}>
          <i className="fa fa-times" aria-hidden="true" />
        </button>
        <div className="modal--content" ref={$content}>
          {props.children}
        </div>
      </div>
    </div>
  )
}

Modal.defaultProps = {
  className: ''
}
