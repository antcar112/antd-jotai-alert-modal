import { Modal, ModalFuncProps } from 'antd'
import { atom, useAtom } from 'jotai'

export const alertModalAtom = atom<{ destroy: () => void } | null>(null)

export const useAlert = () => {
  const [, setAlertModal] = useAtom(alertModalAtom)

  const defaultProps: ModalFuncProps = {
    content: 'My default modal content',
    icon: null,
    closable: false,
  }

  const getModalProps = ({ onCancel, onOk, ...props }: ModalFuncProps): ModalFuncProps => ({
    ...defaultProps,
    ...props,
    onCancel: async () => {
      setAlertModal(null)
      if (onCancel) {
        await onCancel()
      }
    },
    onOk: async () => {
      setAlertModal(null)
      if (onOk) {
        await onOk()
      }
    },
  })

  const getModalMethod = (props: ModalFuncProps): 'confirm' | 'info' =>
    props.onCancel ? 'confirm' : 'info'

  const triggerModal = (props: ModalFuncProps) => {
    const modalMethod = getModalMethod(props)
    const modalProps = getModalProps(props)
    return Modal[modalMethod](modalProps)
  }

  const show = (props: ModalFuncProps = {}) => {
    setAlertModal((prevModal) => prevModal || triggerModal(props))
  }

  const hide = () => {
    setAlertModal((prevModal) => {
      prevModal?.destroy()
      return null
    })
  }

  const forceShow = (props: ModalFuncProps = {}) => {
    hide()
    setAlertModal(() => triggerModal(props))
  }

  return { show, hide, forceShow }
}
