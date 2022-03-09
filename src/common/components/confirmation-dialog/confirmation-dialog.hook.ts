import React from 'react';
import { createEmptyLookup, Lookup } from 'common/models';

export const useConfirmationDialog = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState(createEmptyLookup());

  return {
    isOpen,
    itemToDelete,
    onAccept: () => {
      setItemToDelete(createEmptyLookup());
    },
    onClose: () => setIsOpen(false),
    onOpenDialog: (item: Lookup) => {
      if(item!=null && item!=undefined){
        setIsOpen(true);
        setItemToDelete(item);
      }else{
        setIsOpen(true);
        setItemToDelete(createEmptyLookup());
      }
    },
  };
};
