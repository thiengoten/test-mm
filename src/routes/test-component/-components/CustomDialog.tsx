import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { useCallback, useState } from 'react'

export type DialogSize = 'sm' | 'md' | 'lg'

const dialogSizeMap: Record<DialogSize, string> = {
  sm: 'max-w-[480px]',
  md: 'max-w-[680px]',
  lg: 'max-w-[800px]',
}

export type DialogOptions = {
  title?: string
  content?: React.ReactNode
  description?: string
  footerLeftContent?: React.ReactNode
  onConfirm?: () => void
  onCancel?: () => void
  widthSize?: DialogSize | number
  hasLoading?: boolean
  confirmText?: string
  cancelText?: string
}

export const useCustomDialog = () => {
  const [dialogOptions, setDialogOptions] = useState<DialogOptions | null>(null)

  // Add a method to update just the loading state
  const setDialogLoading = useCallback((isLoading: boolean) => {
    setDialogOptions((prev) =>
      prev ? { ...prev, hasLoading: isLoading } : null
    )
  }, [])

  const openDialog = useCallback((options: DialogOptions) => {
    setDialogOptions(options)
  }, [])

  const closeDialog = useCallback(() => {
    setDialogOptions(null)
  }, [])

  const DialogComponent = useCallback(() => {
    if (!dialogOptions) return null

    const getDialogWidth = () => {
      if (typeof dialogOptions.widthSize === 'number') {
        return `max-w-[${dialogOptions.widthSize}px]`
      }
      return dialogSizeMap[dialogOptions.widthSize || 'sm']
    }

    return (
      <Dialog open={!!dialogOptions} onOpenChange={() => closeDialog()}>
        <DialogContent
          className={cn('gap-6', getDialogWidth())}
          onInteractOutside={(e) => {
            // Prevent closing when clicking outside if loading
            if (dialogOptions.hasLoading) {
              e.preventDefault()
            }
          }}
        >
          <DialogHeader>
            <DialogTitle>{dialogOptions.title || 'Confirm Action'}</DialogTitle>
            {dialogOptions.description && (
              <DialogDescription>{dialogOptions.description}</DialogDescription>
            )}
          </DialogHeader>

          {/* Main Content */}
          <div className='relative'>
            {dialogOptions.hasLoading && (
              <div className='absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm'>
                <div className='h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent'></div>
              </div>
            )}
            {dialogOptions.content}
          </div>

          {/* Footer */}
          <DialogFooter className='flex items-center justify-between gap-4 sm:justify-between'>
            <div>{dialogOptions.footerLeftContent}</div>
            <div className='flex gap-2'>
              <Button
                variant='outline'
                onClick={() => {
                  dialogOptions.onCancel?.()
                  closeDialog()
                }}
              >
                {dialogOptions.cancelText || 'Cancel'}
              </Button>
              <Button
                onClick={() => {
                  dialogOptions.onConfirm?.()
                }}
              >
                {dialogOptions.confirmText || 'Confirm'}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }, [dialogOptions, closeDialog])

  return {
    openDialog,
    closeDialog,
    setDialogLoading,
    DialogComponent,
  }
}

// Example usage:
/*
const MyComponent = () => {
  const { openDialog, DialogComponent } = useCustomDialog()

  const handleOpenDialog = () => {
    openDialog({
      title: 'Confirm Delete',
      description: 'Are you sure you want to delete this item?',
      content: <div>Custom content here</div>,
      footerLeftContent: <div>Additional footer content</div>,
      onConfirm: () => {
        // Handle confirmation
      },
      widthSize: 'md',
      hasLoading: false,
    })
  }

  return (
    <>
      <Button onClick={handleOpenDialog}>Open Dialog</Button>
      <DialogComponent />
    </>
  )
}
*/
