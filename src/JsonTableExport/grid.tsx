import { ComponentProperties } from './types/componentProps';
import * as React from 'react';
import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';
import { Dialog, DialogFooter, DialogType, IDialogContentProps } from '@fluentui/react/lib/Dialog';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';


export const ExportComponent = React.memo((props: ComponentProperties) => {
    const {
        data
    } = props;

    const [hideDialogFlag, setHideDialogFlag] = React.useState(true);

    const dialogStyles = {main:{maxWidth: 200}};

    const modalProps = {
        isBlocking: false,
        topOffsetFixed: true,
        styles: dialogStyles,
    };

    const dialogContentProps : IDialogContentProps = {
        type: DialogType.normal,
        title: 'Download option selection form',
        subText: 'Please select proper configuration for the data download option.',
        showCloseButton: false

    };
    
    const commandbarProps: ICommandBarItemProps[] = [
        {
            key: 'export',
            name: 'Export Data',
            iconProps: {iconName: 'Export'},
            onClick(ev?, item?) {
                setHideDialogFlag(!hideDialogFlag);
            },
        }] as ICommandBarItemProps[];
        

    return (
        <>
            <CommandBar items={commandbarProps}>               
            </CommandBar>
            <Dialog
                hidden = {hideDialogFlag}
                onDismiss = {() => setHideDialogFlag(!hideDialogFlag)}
                dialogContentProps = {dialogContentProps}
                modalProps = {modalProps}
            >
                <DialogFooter>
                    <PrimaryButton onClick={() => {}} text="Confirm"/>
                    <DefaultButton onClick={() => {}} text="Cancel" />
                </DialogFooter> 
            </Dialog>            
        </>
    );

});

ExportComponent.displayName = 'ExportComponent';