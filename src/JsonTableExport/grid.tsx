import { ComponentProperties } from './types/componentProps';
import * as React from 'react';
import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';



export const ExportComponent = React.memo((props: ComponentProperties) => {
    const {
        data
    } = props;

    const [hideDialogFlag, setHideDialogFlag] = React.useState(true);
    
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
            
        </>
    );

});

ExportComponent.displayName = 'ExportComponent';