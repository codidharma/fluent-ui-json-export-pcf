import { ComponentProperties } from './types/componentProps';
import * as React from 'react';
import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';



export const ExportComponent = React.memo((props: ComponentProperties) => {
    const {
        data
    } = props;

    const commandbarProps: ICommandBarItemProps[] = [{key: 'export', name: 'Export Data', iconProps: {iconName: 'Export'}}] as ICommandBarItemProps[];

    return (
        <>
            <CommandBar items={commandbarProps}>
                
            </CommandBar>
        </>
    );

});

ExportComponent.displayName = 'ExportComponent';