import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
declare global {
    interface Navigator {
        msSaveBlob?: (blob: any, defaultName?: string) => boolean
    }
}

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const ExportAsXlsx = (data: any[], fileName: string): void =>{
    
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const workSheet = XLSX.utils.json_to_sheet(data);
    const workBook = {Sheets: {'data': workSheet}, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(workBook, { bookType: 'xlsx', type: 'array' });
    const excelData = new Blob([excelBuffer], {type: fileType});
    FileSaver.saveAs(excelData, fileName);
};

export const ExportAsCsv = (data: any[], fileName: string): void => {
    if(!data || !data.length){
        return;
    }

    const dataSeperator = ',';
    const columnKeys = Object.keys(data[0]);
    const csvContent = columnKeys.join(dataSeperator) + '\n'
        + data.map(row =>{
            return columnKeys.map(key => {
                let cell = row[key] === null || row[key] === undefined ? '': row[key];
                cell = cell instanceof Date ? cell.toLocaleDateString : cell.toString().replace(/"/g, '""');
                if (cell.search(/("|,|\n)/g) >= 0){
                    cell = `"${cell}"`;
                }
                return cell;
            }).join(dataSeperator);
        }).join('\n');

    const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'});
    if(navigator.msSaveBlob){
        navigator.msSaveBlob(blob, fileName);
    }
    else {
        const link = document.createElement('a');
        if(link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', fileName);
            link.style.visibility = 'hidden';
            link.dataset.interception = 'off';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        }
    }
};

export const ExportAsPdf = (data: any[], fileName: string): void => {
    
    const doc = new jsPDF();
    const tableRows: any[] = [];
    const columnKeys = Object.keys(data[0]);

    data.forEach((item) => {
        
        const tableRow: any[] = [];
        columnKeys.forEach((colKey) => {
            tableRow.push(item[colKey]);
        });
        tableRows.push(tableRow);
    });

    autoTable(doc, {
        head: [columnKeys],
        body: tableRows,
        startY: 10
    });

    doc.save(fileName);
};