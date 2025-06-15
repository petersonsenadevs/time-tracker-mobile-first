
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
}

const ConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = 'default'
}: ConfirmationDialogProps) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-gray-900 border-gray-700 text-white w-[calc(100vw-2rem)] max-w-md mx-auto sm:w-full">
        <AlertDialogHeader className="space-y-3">
          <AlertDialogTitle className="text-white text-lg font-semibold text-center sm:text-left">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-300 text-sm text-center sm:text-left">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 sm:justify-end">
          <AlertDialogCancel 
            onClick={onClose}
            className="w-full sm:w-auto bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700 hover:text-white order-2 sm:order-1"
          >
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleConfirm}
            className={`w-full sm:w-auto order-1 sm:order-2 ${
              variant === 'destructive' 
                ? "bg-red-600 hover:bg-red-700 text-white" 
                : "bg-teal-600 hover:bg-teal-700 text-white"
            }`}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationDialog;
