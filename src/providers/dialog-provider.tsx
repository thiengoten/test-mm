import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { createContext, useCallback, useContext, useState } from 'react'

export enum DialogTypes {
  CONTENT_DIALOG = 'CONTENT_DIALOG',
  ALERT_DIALOG = 'ALERT_DIALOG',
}

type BaseDialogOptions = {
  type: DialogTypes
  title?: React.ReactNode
  description?: React.ReactNode
}

type ContentDialogOptions = BaseDialogOptions & {
  type: DialogTypes.CONTENT_DIALOG
  content?: React.ReactNode
}

type AlertDialogOptions = BaseDialogOptions & {
  type: DialogTypes.ALERT_DIALOG
  content?: React.ReactNode
  okText?: string
  cancelText?: string
  onOk?: () => void
  onCancel?: () => void
}

type DialogOptions = ContentDialogOptions | AlertDialogOptions

type DialogContextType = {
  openDialog: (options: DialogOptions) => void
  closeDialog: () => void
  hideAllDialog: () => void
}

const DialogContext = createContext<DialogContextType | undefined>(undefined)

export const DialogProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [dialogStack, setDialogStack] = useState<DialogOptions[]>([])

  const openDialog = useCallback((options: DialogOptions) => {
    setDialogStack((prev) => [...prev, options])
  }, [])

  const closeDialog = useCallback(() => {
    setDialogStack((prev) => {
      // If there are no dialogs, don't do anything
      if (prev.length === 0) return prev
      // If there are dialogs, remove the last one
      return prev.slice(0, -1)
    })
  }, [])

  const hideAllDialog = useCallback(() => {
    setDialogStack([])
  }, [])

  const currentDialog = dialogStack[dialogStack.length - 1]

  // Find the most recent content dialog to keep visible
  const contentDialogs = dialogStack.filter(
    (dialog) => dialog.type === DialogTypes.CONTENT_DIALOG
  )
  // If there are content dialogs, keep the latest one visible
  const latestContentDialog =
    contentDialogs.length > 0 ? contentDialogs[contentDialogs.length - 1] : null

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog, hideAllDialog }}>
      {children}

      {/* Content Dialog - Only show if it's the current dialog or if there's an alert on top */}
      {latestContentDialog && (
        <Dialog
          open={!!latestContentDialog}
          // Only allow closing via onOpenChange if it's the top-most dialog
          onOpenChange={
            currentDialog === latestContentDialog ? closeDialog : undefined
          }
        >
          <DialogContent>
            {latestContentDialog.title && (
              <DialogHeader>
                <DialogTitle>{latestContentDialog.title}</DialogTitle>
                {latestContentDialog.description && (
                  <DialogDescription>
                    {latestContentDialog.description}
                  </DialogDescription>
                )}
              </DialogHeader>
            )}
            {latestContentDialog.content}
          </DialogContent>
        </Dialog>
      )}

      {/* Alert Dialog - Only show if it's the current dialog */}
      {currentDialog && currentDialog.type === DialogTypes.ALERT_DIALOG && (
        <AlertDialog
          open={!!currentDialog}
          // Don't automatically close the dialog on outside click
          // We'll handle closing manually in the button handlers
          onOpenChange={(open) => {
            if (!open) {
              // Only handle the ESC key or clicking outside
              if (currentDialog.onCancel) {
                currentDialog.onCancel()
              } else {
                closeDialog()
              }
            }
          }}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{currentDialog.title}</AlertDialogTitle>
              {currentDialog.description && (
                <AlertDialogDescription>
                  {currentDialog.description}
                </AlertDialogDescription>
              )}
              {currentDialog.content && (
                <div className='mt-4'>{currentDialog.content}</div>
              )}
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={(e) => {
                  e.preventDefault()
                  // If the dialog has an onCancel function, call it
                  if (currentDialog.onCancel) {
                    currentDialog.onCancel()
                  } else {
                    closeDialog()
                  }
                }}
              >
                {currentDialog.cancelText || 'Cancel'}
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={(e) => {
                  e.preventDefault()
                  if (currentDialog.onOk) {
                    currentDialog.onOk()
                  } else {
                    hideAllDialog()
                  }
                }}
              >
                {currentDialog.okText || 'Continue'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </DialogContext.Provider>
  )
}

export const useDialog = () => {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider')
  }
  return context
}
