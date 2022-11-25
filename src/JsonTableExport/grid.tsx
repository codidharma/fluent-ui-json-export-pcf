import * as React from 'react';
import { ComponentProperties } from './types/componentProps';
import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';
import { Dialog, DialogFooter, DialogType, IDialogContentProps } from '@fluentui/react/lib/Dialog';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { Stack } from '@fluentui/react/lib/Stack';
import { IDropdownOption, Dropdown, IDropdownProps } from '@fluentui/react/lib/Dropdown';
import { ExportType } from './types/exportTypes';
import { Icon} from '@fluentui/react/lib/Icon';
import { TextField } from '@fluentui/react/lib/TextField';
import { ExportAsXlsx, ExportAsCsv } from './utils/exportAsXlsx';

export const ExportComponent = React.memo((props: ComponentProperties) => {
    const {
        data
    } = props;

    const [hideDialogFlag, setHideDialogFlag] = React.useState(true);
    const [selectedExportOption, setSelectedExportOption] = React.useState('');
    const [exportFileName, setExportFileName] = React.useState('');

    const dialogStyles = {main:{maxWidth: 200}};

    const modalProps = {
        isBlocking: false,
        topOffsetFixed: true,
        styles: dialogStyles,
    };

    const dialogContentProps : IDialogContentProps = {
        type: DialogType.normal,
        title: 'Export option selection form',
        subText: 'Please select proper configuration for the data export',
        showCloseButton: false

    };

    const exportTypesOptions: IDropdownOption[] = [
        {
            key : ExportType.XLSX,
            text: 'Export as Excel',
            data: { icon: 'ExcelDocument'}
        },
        {
            key : ExportType.CSV,
            text: 'Export as CSV',
            data: { icon: 'ExcelDocument'}
        }
    ] as IDropdownOption[];

    const iconStyles = { marginRight: '8px' };

    //const dropdownStyles = {dropdown: {width: 300}};

    const onRenderOption = (option?: IDropdownOption) : JSX.Element => {
        return(
            <div>
                {option!.data && option!.data.icon && (
                    <Icon style={iconStyles} iconName={option!.data.icon} aria-hidden = 'true' title = {option!.data.icon}/>
                )}
                <span>{option!.text}</span>
            </div>
        );
    };

    const onExportOptionDropDownChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number): void => {
        setSelectedExportOption(option!.key.toString());
        console.log(option!.key.toString());

    };

    const onFileNameChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
        setExportFileName(newValue!);
        console.log(newValue!);
    };

    const onCancelExportDialog = () => {
        setHideDialogFlag(true);
        setSelectedExportOption('');
        setExportFileName('');
    };

    const formatExportData = (): any[] => {
        const items = JSON.parse(data) as any[];
        const columns = Object.keys(items[0]);
        const exportableData : any[] = [];
        let exportableObject : any = {};
        items.forEach((item) => {
            columns.forEach((column) => {
                exportableObject[column] = item[column];
            });
            exportableData.push(exportableObject);
            exportableObject = {};
        });

        return exportableData;
    };


    const onConfirmExportDialog = () => {
        setHideDialogFlag(true);
        const exportableData = formatExportData();
        switch(selectedExportOption as ExportType)
        {
        case ExportType.XLSX:
            ExportAsXlsx(exportableData, exportFileName + '.xlsx');
            break;
        case ExportType.CSV:
            ExportAsCsv(exportableData, exportFileName + '.csv');
            break;
        }
        

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
                <Stack>
                    <Stack.Item>
                        <Dropdown
                            options={exportTypesOptions}
                            placeholder = 'Select export option'
                            label='Export Option'
                            onRenderOption={onRenderOption}
                            onChange= {onExportOptionDropDownChange}
                        />   
                    </Stack.Item>
                    <Stack.Item>
                        <TextField
                            placeholder='Enter the export file name'
                            label='Export File Name'
                            onChange={onFileNameChange}
                        />
                    </Stack.Item>
                </Stack>
                <DialogFooter>
                    <PrimaryButton onClick={onConfirmExportDialog} text = 'Confirm' />
                    <DefaultButton onClick={onCancelExportDialog} text = 'Cancel' />
                </DialogFooter> 
            </Dialog>            
        </>
    );

});

ExportComponent.displayName = 'ExportComponent';