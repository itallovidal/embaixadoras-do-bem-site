import React from 'react'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/presentation/components/shadcn-ui/dialog'
import { Button } from '@/presentation/components/global-components/button'

interface IDeleteConfirmationDialogProps {
  handleDelete: () => void
}

function DeleteConfirmationDialog({
  handleDelete,
}: IDeleteConfirmationDialogProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Tem certeza que deseja excluir?</DialogTitle>
        <DialogDescription>
          A exclusão é permanente, pense bem antes de realizá-la.
        </DialogDescription>
        <DialogFooter className={'flex flex-row gap-1 justify-center p-4'}>
          <DialogClose asChild>
            <Button variant={'outline'}>Desistir</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant={'default'} onClick={() => handleDelete()}>
              Excluir
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogHeader>
    </DialogContent>
  )
}

export default DeleteConfirmationDialog
