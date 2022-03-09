import {useConfirmationDialog } from './confirmation-dialog.hook'
import { renderHook } from '@testing-library/react-hooks';
import {createEmptyLookup,Lookup} from '../../models'
import { act } from 'react-test-renderer';

describe("confirmation-dialog.hook hook specs ",()=>{
  it('should start her isOpen property equal to false and her deafult values', ()=>{
    //Arrange
    const mockDefaultData={
      id: '',
      name: '',
    }

    //Act
    const obj = renderHook(()=> useConfirmationDialog())

    //Assert
    expect(obj.result.current.isOpen).toEqual(false)
    expect(obj.result.current.itemToDelete).toEqual(mockDefaultData)
    expect(obj.result.current.onOpenDialog).toEqual(expect.any(Function))
    expect(obj.result.current.onAccept).toEqual(expect.any(Function))
    expect(obj.result.current.onClose).toEqual(expect.any(Function))
  })

  it('should update isOpen to true and the select item when when we use onOpenenDialog', ()=>{
    //Arrange
    const newCredential:Lookup={
      id: 'uno',
      name: 'Alberto',
    }

    //Act
    const obj = renderHook(()=> useConfirmationDialog())
    act(()=>{
      obj.result.current.onOpenDialog(newCredential)
    })

    //Assert
    expect(obj.result.current.isOpen).toEqual(true)
    expect(obj.result.current.itemToDelete).toEqual(newCredential)
    expect(obj.result.current.onOpenDialog).toEqual(expect.any(Function))
    expect(obj.result.current.onAccept).toEqual(expect.any(Function))
    expect(obj.result.current.onClose).toEqual(expect.any(Function))
  })

  it('should update isOpen to true and use the default item when we pass a null', ()=>{
    //Arrange
    const newCredential =null

    const defaultCredential = createEmptyLookup()

    //Act
    const obj = renderHook(()=> useConfirmationDialog())
    act(()=>{
      obj.result.current.onOpenDialog(newCredential)
    })

    //Assert
    expect(obj.result.current.isOpen).toEqual(true)
    expect(obj.result.current.itemToDelete).toEqual(defaultCredential)
    expect(obj.result.current.onOpenDialog).toEqual(expect.any(Function))
    expect(obj.result.current.onAccept).toEqual(expect.any(Function))
    expect(obj.result.current.onClose).toEqual(expect.any(Function))
  })

  it('should update isOpen to true and use the default item when we pass a undefined', ()=>{
    //Arrange
    const newCredential =undefined

    const defaultCredential = createEmptyLookup()

    //Act
    const obj = renderHook(()=> useConfirmationDialog())
    act(()=>{
      obj.result.current.onOpenDialog(newCredential)
    })

    //Assert
    expect(obj.result.current.isOpen).toEqual(true)
    expect(obj.result.current.itemToDelete).toEqual(defaultCredential)
    expect(obj.result.current.onOpenDialog).toEqual(expect.any(Function))
    expect(obj.result.current.onAccept).toEqual(expect.any(Function))
    expect(obj.result.current.onClose).toEqual(expect.any(Function))
  })

  it('should update isOpen of true to false after open the hook and use the close fuinction', ()=>{
    //Arrange
    const newCredential:Lookup={
      id: 'uno',
      name: 'Alberto',
    }

    //Act
    const obj = renderHook(()=> useConfirmationDialog())
    const acceptStub = jest.spyOn(obj.result.current, 'onAccept')
    const closeStub = jest.spyOn(obj.result.current, 'onClose')
    const opentStub = jest.spyOn(obj.result.current, 'onOpenDialog')
    act(()=>{
      obj.result.current.onOpenDialog(newCredential)
      obj.result.current.onClose()
    })

    //Assert
    expect(obj.result.current.isOpen).toEqual(false)
    expect(obj.result.current.itemToDelete).toEqual(newCredential)
    expect(opentStub).toHaveBeenCalled()
    expect(closeStub).toHaveBeenCalled()
    expect(acceptStub).not.toHaveBeenCalled()
  })

  it('should still isOpen value as true after open the hook and use only the Accept function but \
  the item must be delete', ()=>{
    const newCredential:Lookup={
      id: 'uno',
      name: 'Alberto',
    }

    const deletedCredential:Lookup={
      id: '',
      name: '',
    }

    //Act
    const obj = renderHook(()=> useConfirmationDialog())
    const acceptStub = jest.spyOn(obj.result.current, 'onAccept')
    const closeStub = jest.spyOn(obj.result.current, 'onClose')
    const opentStub = jest.spyOn(obj.result.current, 'onOpenDialog')
    act(()=>{
      obj.result.current.onOpenDialog(newCredential)
      obj.result.current.onAccept()
    })

    //Assert
    expect(obj.result.current.isOpen).toEqual(true)
    expect(obj.result.current.itemToDelete).toEqual(deletedCredential)
    expect(opentStub).toHaveBeenCalled()
    expect(closeStub).not.toHaveBeenCalled()
    expect(acceptStub).toHaveBeenCalled()
  })

  it('should update isOpen value to false after open the hook and use the Accept function to delete \
  the item and then close with de onClose', ()=>{
    const newCredential:Lookup={
      id: 'uno',
      name: 'Alberto',
    }

    const deletedCredential:Lookup={
      id: '',
      name: '',
    }

    //Act
    const obj = renderHook(()=> useConfirmationDialog())
    const acceptStub = jest.spyOn(obj.result.current, 'onAccept')
    const closeStub = jest.spyOn(obj.result.current, 'onClose')
    const opentStub = jest.spyOn(obj.result.current, 'onOpenDialog')
    act(()=>{
      obj.result.current.onOpenDialog(newCredential)
      obj.result.current.onAccept()
      obj.result.current.onClose()
    })

    //Assert
    expect(obj.result.current.isOpen).toEqual(false)
    expect(obj.result.current.itemToDelete).toEqual(deletedCredential)
    expect(opentStub).toHaveBeenCalled()
    expect(closeStub).toHaveBeenCalled()
    expect(acceptStub).toHaveBeenCalled()
  })
})

