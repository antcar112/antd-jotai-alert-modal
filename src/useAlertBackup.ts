import { Modal, ModalFuncProps } from 'antd'
import { atom, useAtom } from 'jotai'
import { useEffect } from 'react'

export const alertModalAtom = atom<null | ModalFuncProps>(null)

export const useAlert = () => {
  const [alertModal, setAlertModal] = useAtom(alertModalAtom)

  const defaultProps: ModalFuncProps = {
    content: 'My default modal content',
    icon: null,
    closable: false,
  }

  const handleAlertClose = () => {
    setAlertModal(null)
  }

  const getModalProps = (props: ModalFuncProps) => ({
    ...defaultProps,
    ...props,
    onOk: async () => {
      handleAlertClose()
      if (props.onOk) {
        await props.onOk()
      }
    },
    onCancel: async () => {
      handleAlertClose()
      if (props.onCancel) {
        await props.onCancel()
      }
    },
  })

  const show = (props: ModalFuncProps = {}) => {
    const modalProps: ModalFuncProps = getModalProps(props)
    const modalMethod = props.onCancel ? 'confirm' : 'info'

    setAlertModal((prevAlert) => {
      if (prevAlert) {
        return prevAlert
      }
      Modal[modalMethod](modalProps)
      return modalProps
    })
  }

  const forceShow = (props: ModalFuncProps = {}) => {
    const modalProps: ModalFuncProps = getModalProps(props)
    const modalMethod = props.onCancel ? 'confirm' : 'info'

    Modal.destroyAll()
    Modal[modalMethod](modalProps)
    setAlertModal(modalProps)
  }

  const hide = () => {
    setAlertModal(null)
    Modal.destroyAll()
  }

  useEffect(() => hide, [])

  return { show, hide, forceShow }
}
