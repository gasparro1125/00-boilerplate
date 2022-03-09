import React from 'react';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';


describe("ConfirmationDialogComponent component specs",()=>{
  it('should display the confirmation dialogo when isOpen=True with his labels', ()=>{
    //Arrange
    const title = 'Borrar';
    const labels = {
      closeButton: 'Cerrar',
      acceptButton: 'Aceptar',
    }

    //Act
    render(<ConfirmationDialogComponent isOpen={true} onAccept={jest.fn} onClose={jest.fn} title={title} labels={labels}></ConfirmationDialogComponent>)
    const titleComponent = screen.getByRole('heading',{
      level:2,
      name:'Borrar'
    });
    const closeLabelButtonComponent = screen.getByText(labels.closeButton);
    const acceptLabelComponent = screen.getByText(labels.acceptButton);

    //Assert
    expect(titleComponent).toBeInTheDocument();
    expect(closeLabelButtonComponent).toBeInTheDocument();
    expect(acceptLabelComponent).toBeInTheDocument();

  })

  it('should not desplay the confirmation dialogo when isOpen=False', ()=>{
    //Arrange
    const title = 'Borrar';
    const labels = {
      closeButton: 'Cerrar',
      acceptButton: 'Aceptar',
    }

    //Act
    render(<ConfirmationDialogComponent isOpen={false} onAccept={jest.fn} onClose={jest.fn} title={title} labels={labels}></ConfirmationDialogComponent>)

    //Assert
    expect(screen.queryByRole('none presentation')).not.toBeInTheDocument()

  })

  it('if user click in onAccept should execute onAccept function and onClose function', ()=>{
    //Arrange
    const title = 'Borrar';
    const labels = {
      closeButton: 'Cerrar',
      acceptButton: 'Aceptar',
    }
    const onAccept = jest.fn()
    const onClose = jest.fn()

    //Act
    render(<ConfirmationDialogComponent isOpen={true} onAccept={onAccept} onClose={onClose} title={title} labels={labels}></ConfirmationDialogComponent>)
    const acceptLabelComponent = screen.getByText(labels.acceptButton);


    //Assert
    expect(acceptLabelComponent).toBeInTheDocument();
    userEvent.click(acceptLabelComponent)
    expect(onAccept).toBeCalled()
    expect(onClose).toBeCalled()
    expect(screen.queryByRole('none presentation')).not.toBeInTheDocument()
  })

  it('if user click in onClose should execute his function and only use onClose function', ()=>{
    //Arrange
    const title = 'Borrar';
    const labels = {
      closeButton: 'Cerrar',
      acceptButton: 'Aceptar',
    }
    const onAccept = jest.fn()
    const onClose = jest.fn()

    //Act
    render(<ConfirmationDialogComponent isOpen={true} onAccept={onAccept} onClose={onClose} title={title} labels={labels}></ConfirmationDialogComponent>)
    const closeLabelButtonComponent = screen.getByText(labels.closeButton);


    //Assert
    expect(closeLabelButtonComponent).toBeInTheDocument();
    userEvent.click(closeLabelButtonComponent)
    expect(onAccept).not.toBeCalled()
    expect(onClose).toBeCalled()
    expect(screen.queryByRole('none presentation')).not.toBeInTheDocument()
  })
})
